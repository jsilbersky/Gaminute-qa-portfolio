import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Mobile Navigation Menu', () => {
  let home: HomePage;

  // Simulace rozměrů iPhone 13 pro tento testovací blok
  test.use({ viewport: { width: 390, height: 844 } });

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    await home.goto();
  });

  test('should open and close mobile menu via hamburger and backdrop', async () => {
    // 1. Kontrola, že menu je na začátku skryté
    await expect(home.mobilePanel).not.toBeVisible();

    // 2. Otevření menu
    await home.hamburgerBtn.click();

    // 3. Kontrola, že se panel zviditelnil
    await expect(home.mobilePanel).toBeVisible();

    // 4. Zavření kliknutím mimo panel (na pozadí)
    // Používáme force: true, protože overlay může technicky překrývat klikací plochu
    await home.mobileBackdrop.click({ force: true });

    // 5. Potvrzení, že se menu opět skrylo
    await expect(home.mobilePanel).not.toBeVisible();
  });

  test('should navigate to section and update URL with hash', async ({ page }) => {
    // 1. Otevření menu
    await home.hamburgerBtn.click();

    // 2. Výběr a kliknutí na odkaz "About"
    // Zkoušíme standardní click(), který je autentičtější než dispatchEvent
    const aboutLink = home.mobileLinks.filter({ hasText: 'About' });
    await aboutLink.click();

    // 3. Kontrola, že po kliknutí na odkaz menu automaticky zmizelo
    await expect(home.mobilePanel).not.toBeVisible();

    // 4. Kontrola změny URL na kotvu #about
    await expect(page).toHaveURL(/.*#about/);
    
    // 5. Scroll k sekci (smooth scrolling může chvíli trvat)
    // Hledáme h2 uvnitř sekce s id="about"
    const aboutHeader = page.locator('section#about h2');
    await aboutHeader.scrollIntoViewIfNeeded();

    // 6. Finální ověření, že nadpis je viditelný pro uživatele
    await expect(aboutHeader).toBeInViewport();
  });
});