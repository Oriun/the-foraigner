import { test, expect } from "@playwright/test";

test("login", async ({ page }) => {
  await page.goto("http://localhost:3000/auth/login");

  // Fill the form.
  await page.fill(`#mail-Connexion`, "admin");
  await page.fill(`#password-Connexion`, "admin");

  await page.waitForTimeout(2_000);
  // Click the login button.
  await Promise.all([
    page.waitForURL("http://localhost:3000/app"),
    page.getByRole("button", { name: "Se connecter" }).click(),
  ]);

  // Expects the URL to contain intro.
  await expect(page).toHaveURL("http://localhost:3000/app");
});
