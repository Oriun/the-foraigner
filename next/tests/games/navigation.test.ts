import { test, expect } from "@playwright/test";

test("app routing", async ({ page }) => {
  const gameTypes = ["flash-cards", "cross-words", "fill-in-the-gaps"];

  for (const gameType of gameTypes) {
    await test.step(gameType, async () => {
      await page.goto("http://localhost:3000/app/games");
      const gamePageUrl = await page.$(`a[href^='/app/games/${gameType}']`);

      await Promise.all([
        gamePageUrl?.click(),
        page.waitForURL(`http://localhost:3000/app/games/${gameType}`),
      ]);

      await expect(page).toHaveURL(
        `http://localhost:3000/app/games/${gameType}`
      );

      const game = await page.waitForSelector(
        `a[href^='/app/games/${gameType}']`,
        { state: "visible", timeout: 2_000 }
      );

      const href = await game.getAttribute("href");
      await Promise.all([
        game.click(),
        page.waitForURL(`http://localhost:3000${href}`),
      ]);
      await expect(page).toHaveURL(`http://localhost:3000${href}`);
      await page.waitForTimeout(1_000);
      await page.goBack();
      await page.goBack();
    });
  }
});
