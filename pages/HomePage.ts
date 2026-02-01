// pages/HomePage.ts
import { type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  
  // 1. Definice elementů (Locators)
  readonly searchInput: Locator;
  readonly searchCounter: Locator;
  readonly filterChips: Locator;
  readonly gamesGrid: Locator;
  readonly gameCards: Locator;
  readonly emptyState: Locator;
  
  readonly contactEmailInput: Locator;
  readonly contactMessageInput: Locator;
  readonly submitButton: Locator;
  readonly charCounter: Locator;
  readonly emailError: Locator;
  readonly messageError: Locator;
  readonly hamburgerBtn: Locator;
  readonly mobilePanel: Locator;
  readonly mobileBackdrop: Locator;
  readonly mobileLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.messageError = page.locator('#message-error');
    this.hamburgerBtn = page.locator('#hamburger');
    this.mobilePanel = page.locator('#mobile-panel');
    this.mobileBackdrop = page.locator('#mobile-backdrop');
    // Lokátor pro odkazy v mobilním menu (využijeme data-section, které máš v HTML)
    this.mobileLinks = page.locator('.mobile-link');

    // 2. Mapování na konkrétní CSS selektory z tvého HTML
    this.searchInput = page.locator('#search-input');
    this.searchCounter = page.locator('#search-counter');
    this.filterChips = page.locator('.chip');
    this.gamesGrid = page.locator('#games-grid');
    this.gameCards = page.locator('.game-card:visible');
    this.emptyState = page.locator('#empty-state');

    this.contactEmailInput = page.locator('#email');
    this.contactMessageInput = page.locator('#message');
    this.submitButton = page.locator('#submit-btn');
    this.charCounter = page.locator('#char-counter');
    this.emailError = page.locator('#email-error');
  }

  // 3. Akce (Methods) - co s tím webem děláme
  async goto() {
    await this.page.goto('/'); // Použije baseURL z configu
  }

 async searchForGame(gameName: string) {
    // 1. Nejdřív sjeď k vyhledávacímu poli, aby bylo v záběru
    await this.searchInput.scrollIntoViewIfNeeded();
    
    // 2. Klikni do něj (simulace uživatele) a vymaž případný starý text
    await this.searchInput.click();
    await this.searchInput.fill(gameName);

    // 3. Volitelné: Počkej malinkou chvilku (občas JS potřebuje 100ms)
    // nebo simuluj stisk klávesy, pokud fill() nestačí
    await this.searchInput.press('Enter'); 
  }

  async filterByGenre(genre: string) {
    // Najde chip, který obsahuje text (např. "Arcade") a klikne na něj
    await this.filterChips.filter({ hasText: genre }).click();
  }
}