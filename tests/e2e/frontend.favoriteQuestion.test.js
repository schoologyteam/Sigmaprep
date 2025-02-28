import { test, expect } from "playwright/test";

test("verify if user not logged in and trys to fav a question it pops up that they need to login", async ({
  page,
}) => {
  await page.goto("http://localhost:3001/");
  await page.getByRole("link", { name: "Classes" }).click();
  await page.getByRole("button", { name: "General" }).click();
  const studyByExamButton = page
    .locator('[id^="class_"][id$="_study_by_exam"]')
    .first();
  const box = await studyByExamButton.boundingBox();
  if (box) {
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
  }
  await studyByExamButton.click();
  await page
    .locator('[id^="group"][id$="_card"]')
    .getByRole("button", { name: "Study Group" })
    .click();
  await page
    .getByRole("listitem")
    .filter({ hasText: "Question 1" })
    .locator("i")
    .click();
  await page.locator("div > .user").click();
  await page.getByText("Please sign in to access this").click();
});
