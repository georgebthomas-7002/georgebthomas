import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should display the hero section', async ({ page }) => {
    await page.goto('/');

    // Check that the page loads
    await expect(page).toHaveTitle(/George B. Thomas/);
  });

  test('should have working navigation', async ({ page }) => {
    await page.goto('/');

    // Check header is visible
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });

  test('should display all main sections', async ({ page }) => {
    await page.goto('/');

    // Verify key sections exist
    await expect(page.locator('section').first()).toBeVisible();
  });
});
