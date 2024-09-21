import express from "express";
const router = express.Router();

import { getDirectoryFolderNames } from "#utils/fileFunctions.js";

async function setUpRoutes(router, routes) {
  try {
    for (let i in routes) {
      const { default: subRouter } = await import(`./${routes[i]}/index.js`);
      router.use(`/${routes[i]}`, subRouter);
    }
  } catch (error) {
    console.log(error.stack);
  }
}

const routes = getDirectoryFolderNames("./routes");
await setUpRoutes(router, routes);
export default router;
