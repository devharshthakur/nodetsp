import { Command } from "commander";

const program = new Command();

program
  .name("nodetsp")
  .description("A cli for creating a new typecript project")
  .version("2.0.0-beta.1");

program
  .command("init")
  .description("Initialize a new TypeScript project")
  .action(() => {
    console.log("Initializing a new TypeScript project...");
  });
