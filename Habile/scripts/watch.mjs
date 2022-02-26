// //@ts-check

// import { execSync, spawn } from "child_process";
// import { watch } from "chokidar";
// import { build as esbuild } from "esbuild";

// const build = async (/** @type {string} */ path) => {
//   if (path) {
//     console.log(`Updated ${path}`);
//   }

//   // await esbuild({
//   //   // build all files in path to index.js
//   //   entryPoints: [path],
//   //   // outfile: "dist/index.js",
//   //   outdir: "dist",
//   //   bundle: true,
//   //   minify: true,
//   //   format: "cjs",
//   //   platform: "node",
//   // }).then((result) => {
//   //   console.log(result);
//   // });
//   const build = spawn("yarn", ["swc", path, "-d", `dist`], {
//     shell: true,
//   }).on("close", () => {
//     console.log("Build complete");
//     spawn("node", ["dist"], { shell: true }).stdout.on("data", (data) => {
//       console.log(data.toString());
//     });
//   });
// };

// build("src");

// const watcher = watch("src/**/*.ts");

// watcher.on("change", async (path) => {
//   build(path);
// });
