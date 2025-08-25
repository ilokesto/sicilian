import fs from 'fs';
import path from 'path';
import { destructuredSnippet, objectSnippet } from '../templates/codeSnippets.js';
import { showHelp } from './help.js';

export const handleGenerate = (filePathArg: string, args: string[]) => {
  if (!filePathArg) {
    console.error('Error: File path is required after the -g flag.');
    showHelp();
    return;
  }

  let snippetToUse = destructuredSnippet; // 기본값
  if (args.includes('-o') || args.includes('--object')) {
    snippetToUse = objectSnippet;
  }

  const targetPath = path.resolve(process.cwd(), filePathArg);
  const targetDir = path.dirname(targetPath);

  try {
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    if (fs.existsSync(targetPath)) {
      fs.appendFileSync(targetPath, `${snippetToUse.trim()}`);
      console.log(`Success: Code snippet appended to ${targetPath}`);
    } else {
      fs.writeFileSync(targetPath, `${snippetToUse.trim()}`);
      console.log(`Success: Created file and generated code at ${targetPath}`);
    }
  } catch (error) {
    console.error(`An error occurred:`, error);
  }
};
