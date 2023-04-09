import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:3000");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/The Foraigner/);
});

test("get started link", async ({ page }) => {
  await page.goto("http://localhost:3000");

  // Click the get started link.
  await Promise.all([
    page.waitForURL("http://localhost:3000/auth/login"),
    page.getByRole("button", { name: "Essayer maintenant" }).click(),
  ]);

  await expect(page).toHaveURL("http://localhost:3000/auth/login");
});

test("app routing", async ({ page }) => {
  const paths = ["lessons", "exercises", "games"];
  const base = "http://localhost:3000/app";
  await page.goto(base);

  for (const path of paths) {
    await test.step(path, async () => {
      const lessons = await page.$(`a[href^='/app/${path}']`);

      await Promise.all([lessons?.click(), page.waitForURL(`${base}/${path}`)]);

      await expect(page).toHaveURL(`${base}/${path}`);

      await page.goBack();
    });
  }

  await test.step("chat", async () => {
    await page.goto(base);

    const chat = await page.$(`a[href^='/app/chat']`);

    await Promise.all([
      chat?.click(),
      page.waitForURL(`http://chat.foraigner.com`),
    ]);

    await expect(page).toHaveURL(`http://chat.foraigner.com`);
  });
});
