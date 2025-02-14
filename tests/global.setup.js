import { initTestAccount } from "@backend/models/auth";

export default async function globalSetup() {
  try {
    await initTestAccount();
  } catch (error) {
    console.log("test account may already exists. going forward.");
    console.error(error);
  }
}
