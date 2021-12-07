import { Command } from "https://deno.land/x/cliffy@v0.19.6/command/mod.ts";

////////////////////
// utils
const itemPath = (dirPath: string, fileName: string) =>
  `${dirPath}/${fileName}`;

/**
 * dirnames to be ignored when iterating items
 * TODO: add interface to customizing
 */
const IGNORE_DIRNAMES = [
  "node_modules",
  ".next",
  "bundle",
  "build",
  "dist",
  "public",
  "test",
  "__test__",
];
const isIgnorable = (dir: Deno.DirEntry) => IGNORE_DIRNAMES.includes(dir.name);

////////////////////
// command
const { args } = await new Command()
  .name("bulkrename")
  .version("bulkrename 0.1.0")
  .description("for bulk-updating files name")
  .arguments("[target-filename] [filename-to-be] [directory]")
  .parse(Deno.args);

const [targetFileName, renamedFileName, entryPath] = args;

const listItems = async (dirPath: string) => {
  for await (const item of Deno.readDir(dirPath)) {
    if (item.isFile) {
      if (item.name === targetFileName) {
        Deno.rename(
          itemPath(dirPath, item.name),
          itemPath(dirPath, renamedFileName),
        );
      }
      return;
    }

    // item.isDirectory should be true
    if (!isIgnorable(item)) {
      listItems(itemPath(dirPath, item.name));
    }
  }
};

////////////////////
// execution
async function execute() {
  await listItems(entryPath);
}

execute();
