import { mlopsModules } from "./index";

console.log("Modules found:", mlopsModules.length);
mlopsModules.forEach((m, i) => {
  console.log(`Module ${i}: ${m.id} - ${m.title}`);
});
