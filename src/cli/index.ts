#!/usr/bin/env node

import { handleGenerate } from './commands/generate.js';
import { showHelp } from './commands/help.js';

const main = () => {
  const args = process.argv.slice(2);

  if (args.includes('-help') || args.length === 0) {
    showHelp();
    return;
  }

  const generateFlagIndex = args.indexOf('-g');
  if (generateFlagIndex !== -1) {
    const filePathArg = args[generateFlagIndex + 1];
    handleGenerate(filePathArg, args);
    return;
  }

  console.error(`Error: Unknown command or flag.`);
  showHelp();
};

main();
