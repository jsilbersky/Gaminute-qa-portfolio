import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { TEST_DATA } from '../data/testData';

test.describe('Search Functionality', () => {
  let home: HomePage;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    await home.goto();
  });

  test('should find existing game', async () => {
    // 1. Akce: Vyhledáme hru z našich testovacích dat
    await home.searchForGame(TEST_DATA.search.validGame);

    // 2. Ověření: Grid nesmí být prázdný (toHaveCount > 0)
    await expect(home.gameCards).not.toHaveCount(0);
    
    // 3. Kontrola zmizení hlášky "Nic nenalezeno"
    // OPRAVA: Spojeno do jednoho funkčního volání
    await expect(home.emptyState).not.toBeVisible();
  });

  test('should show empty state for non-existent game', async () => {
    // 1. Akce: Vyhledáme neexistující řetězec
    await home.searchForGame(TEST_DATA.search.invalidGame);

    // 2. Ověření: Musí být vidět "Empty state" (např. "No games found")
    await expect(home.emptyState).toBeVisible();
    
    // 3. Kontrola, že v gridu fyzicky nejsou žádné karty her
    await expect(home.gameCards).toHaveCount(0);
  });

  test('should update search counter correctly', async () => {
    // Použijeme slovo, které není v TEST_DATA, abychom zkusili jiný scénář
    const searchTerm = 'Puzzle';
    
    await home.searchForGame(searchTerm);

    // Ověření počítadla znaků (např. "6/50")
    // Tip: Pokud se změní limit 50, stačí ho pak v tomto stringu upravit
    await expect(home.searchCounter).toHaveText(`${searchTerm.length}/50`);
  });
});