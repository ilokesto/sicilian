export const showHelp = () => {
  console.log(`
  Usage: npx sicilian <flag> [options]

  Flags:
    -g <path>                 Generates destructured form code snippet.
    -g <path> [-o, --object]  Generates form code as a single object instance.
                              Example: npx sicilian -g src/forms/myForm.ts -o

    -help                     Shows this help message.
  `);
};
