import { test, expect } from '@playwright/test';

test('homepage loads and shows dashboard', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('text=Your Progress')).toBeVisible();
});
