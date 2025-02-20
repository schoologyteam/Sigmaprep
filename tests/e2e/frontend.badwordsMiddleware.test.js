import { sleep } from "@backend/utils/utils.js";
import { test, expect } from "playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3001/");
  await page.getByRole("link", { name: "Classes" }).click();
  await page.getByRole("button", { name: "General" }).click();
  await page.locator("#class_61_study_by_exam").click({ force: true }); // TODO THIS WILL ONLY WORK WITH DESKTOP VIEW NOT MOBILE
  await sleep(1000);
  await page.locator("#class_61_study_by_exam").click({ force: true });

  await page
    .locator("#group_128_card")
    .getByRole("button", { name: "Study Group" })
    .click();
  await page.getByRole("heading", { name: "Question 4" }).click();
  await page.getByRole("textbox", { name: "Type your answer here..." }).click();
  await page
    .getByRole("textbox", { name: "Type your answer here..." })
    .fill("fuck");
  await page
    .locator("#question_377_segment")
    .getByRole("button", { name: "Submit" })
    .click();
  await page.getByText("Inappropriate").click();
});
