import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { TEST_DATA } from '../data/testData';

test.describe('Contact Form Validation', () => {
  let home: HomePage;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    await home.goto();
    
    // Scrollování dolů k formuláři, aby byl v záběru kamery/prohlížeče
    await home.submitButton.scrollIntoViewIfNeeded();
  });

  test('should show validation error for empty form', async () => {
    // Kliknutí na odeslat bez vyplnění polí vyvolá chyby
    await home.submitButton.click();

    // Ověření, že se zobrazily texty povinných polí
    await expect(home.emailError).toBeVisible();
    await expect(home.emailError).toHaveText('Email is required');

    await expect(home.messageError).toBeVisible();
    await expect(home.messageError).toHaveText('Message is required');
  });

  test('should show error for invalid email format', async () => {
    // OPRAVA: Používáme contactEmailInput místo contactNameInput pro email
    // Používáme nevalidní email ze souboru TEST_DATA
    await home.contactEmailInput.fill(TEST_DATA.contact.invalidEmail);
    
    // Vyplnění zprávy, aby test nekolidoval s chybou prázdné zprávy
    await home.contactMessageInput.fill(TEST_DATA.contact.shortMessage);

    await home.submitButton.click();

    // Kontrola, že pole emailu stále hlásí chybu (např. chybějící @)
    await expect(home.emailError).toBeVisible();
  });

  test('should enforce character limit in message', async () => {
    const message = 'Test message';
    await home.contactMessageInput.fill(message);

    // Kontrola počítadla znaků (např. 12/2000)
    await expect(home.charCounter).toHaveText(`${message.length}/2000`);
  });

test('should show error for message shorter than 10 characters', async () => {
    await home.contactEmailInput.fill(TEST_DATA.contact.validEmail);

    // Ppoužijeme data ze souboru testData
    await home.contactMessageInput.fill(TEST_DATA.contact.shortMessage);

    await home.submitButton.click();

    await expect(home.messageError).toBeVisible();
    await expect(home.messageError).toHaveText('Message must be at least 10 characters');
});

test('should NOT submit form with short message (Network Check)', async ({ page }) => {
    let requestSent = false;
    
    // Nastavení sledování síťové aktivity
    page.on('request', request => {
      if (request.url().includes('/api/contact') && request.method() === 'POST') {
        requestSent = true;
      }
    });

    // 1. Vyplnění dat - místo 'abc' dáváme TEST_DATA.contact.shortMessage
    await home.contactEmailInput.fill(TEST_DATA.contact.validEmail);
    await home.contactMessageInput.fill(TEST_DATA.contact.shortMessage);

    await home.submitButton.click();

    // 2. UI kontrola: Vidíme chybu na webu
    await expect(home.messageError).toBeVisible();

    // 3. Network kontrola: Žádný požadavek neodešel na server
    expect(requestSent, 'API request was sent but should have been blocked!').toBe(false);

    // 4. Stav formuláře: Data v polích zůstala zachována
    // Kontrolujeme hodnotu proti našim testovacím datům
    await expect(home.contactMessageInput).toHaveValue(TEST_DATA.contact.shortMessage); 
});

  test('should successfully submit the form with valid data', async ({ page }) => {
    // Vyplnění korektních údajů ze souboru testDATA
    await home.contactEmailInput.fill(TEST_DATA.contact.validEmail);
    
    // Místo dlouhého textu v uvozovkách použijeme longMessage
    await home.contactMessageInput.fill(TEST_DATA.contact.longMessage);

    const requestPromise = page.waitForRequest(request => 
      request.url().includes('/api/contact') && request.method() === 'POST'
    );

    await home.submitButton.click();

    // Čekání, až požadavek fyzicky odejde
    const request = await requestPromise;
    expect(request, 'API request should have been sent').toBeTruthy();

    // Ověření, že se formulář po úspěchu vyčistil (příprava pro další zprávu)
    await expect(home.contactEmailInput).toHaveValue('');
    await expect(home.contactMessageInput).toHaveValue('');

    // Žádné chyby nesmí být vidět
    await expect(home.emailError).not.toBeVisible();
    await expect(home.messageError).not.toBeVisible();
  });
});