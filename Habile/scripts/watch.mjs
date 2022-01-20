//@ts-check

import { execSync } from "child_process";
import { watch } from "chokidar";

const build = (/** @type {string} */ path) => {
  console.clear();

  if (path) {
    console.log(`Updated ${path}`);
  }

  console.log(execSync("yarn start").toString().split("$ node dist")[1]);
};

build();

watch("src/**/*.ts").on("change", async (path) => {
  build(path);
});
