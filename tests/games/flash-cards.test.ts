import { test, expect, ElementHandle } from "@playwright/test";

test("flashcard", async ({ page }) => {
  await page.goto("http://localhost:3000/app/games/flash-cards");
  const link = await page.waitForSelector("a[href^='/app/games/flash-cards']", {
    state: "visible",
    timeout: 2_000,
  });

  await link.click();
  await expect(page).toHaveURL(/app\/games\/flash-cards\/[^\/]+\/[^\/]+/);

  const topic = page.url().split("/").pop()?.toLowerCase();

  await test.step("correct answer", async () => {
    const image = await page.waitForSelector(`img[src^="/pictures/${topic}"]`, {
      state: "visible",
      timeout: 2_000,
    });
    const src = (await image.getAttribute("src")) as string;
    expect(src).toContain(topic);

    const response = src.split("/").pop()?.split("-")[0] as string;

    expect(response).not.toBeUndefined();

    const answer = await page.getByText(response, { exact: true });

    await answer.click();

    const validate = await page.getByText("Validate answer");

    page.once("dialog", (dialog) => dialog.accept());
    await validate.click();

    await page.waitForTimeout(1_000);
  });

  await test.step("wrong answer", async () => {
    const image = await page.waitForSelector(`img[src^="/pictures/${topic}"]`, {
      state: "visible",
      timeout: 2_000,
    });
    const src = (await image.getAttribute("src")) as string;
    expect(src).toContain(topic);

    const response = src.split("/").pop()?.split("-")[0] as string;

    expect(response).not.toBeUndefined();

    const buttons = await page.$$("button");

    let answer: ElementHandle<HTMLButtonElement>;
    for (const button of buttons) {
      const text = await button.textContent();
      if (text !== response) {
        answer = button;
        break;
      }
    }

    await answer!.click();

    const validate = await page.getByText("Validate answer");

    page.once("dialog", (dialog) => {
      dialog.accept();
    });
    await validate.click();
  });
});
