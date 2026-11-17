// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Luqman CV responsive and functional tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4173'); // Vite preview default port
  });

  test('Hero section loads and title is visible', async ({ page }) => {
    const title = page.locator('.hero__title');
    await expect(title).toBeVisible();
    await expect(title).toContainText('Luqman');
  });

  test('Navigation links work without errors', async ({ page }) => {
    const links = page.locator('#capsule-nav nav a');
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      const href = await link.getAttribute('href');
      await link.click();
      await expect(page).toHaveURL(/#.+/);
      // go back to top for next link
      await page.evaluate(() => window.scrollTo(0, 0));
    }
  });

  test('No console errors on load', async ({ page }) => {
    const errors = [];
    page.on('pageerror', (err) => errors.push(err.message));
    await page.reload();
    expect(errors).toEqual([]);
  });

  test('Responsive layout at mobile width', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    const hero = page.locator('.hero');
    await expect(hero).toBeVisible();
    const navToggle = page.locator('#mobile-menu-btn');
    await expect(navToggle).toBeVisible();
  });
});
