/**
 * The script to generate TypeScript types and `database design document` for ORM models.
 * Command: npm run orm-types
 * Generated files will be placed in `./declarations`.
 * Generated type declarations will not be replaced if they already exist, please remove
 * Database design document will override each time you run this script.
 */

import fs from 'fs-extra';
import {toMarkdownTable, toTypeScriptInterface} from 'orm-modeling';
import path from 'path';

const dir = 'declarations';

(async () => {
  console.log('generating types for ORM model...');
  const files = await fs.readdir(__dirname);
  const doc = [
    '# Database Design',
    '> This is a generated file,',
    '> please do not modify.',
    '',
  ];
  const dirpath = path.join(__dirname, dir);
  await fs.ensureDir(dirpath);
  for (const file of files) {
    if (file.indexOf('model.ts') > 0) {
      const declarationFilename = file.replace('model.ts', 'd.ts');
      await fs.ensureDir(dirpath);
      const declarationPath = path.join(__dirname, dir, declarationFilename);
      const exists = await fs.pathExists(declarationPath);
      const filepath = path.join(__dirname, file);
      const module = require(filepath);
      const model = module.default;
      console.log('generating type for', filepath);
      const type = toTypeScriptInterface(model);
      console.log(type);
      if (!exists) {
        await fs.writeFile(declarationPath, type);
        console.log('type file created', declarationPath);
      } else {
        console.log('existed', declarationPath);
      }
      const md = toMarkdownTable(model);
      doc.push('');
      doc.push(`## ${model.tableName} ${model.comment}`);
      doc.push('');
      doc.push(md);
    }
  }
  await fs.outputFile(path.join(dirpath, 'database_design.md'), doc.join('\n'));
})().then(() => process.exit(0)).catch(err => {
  console.error(err);
  process.exit(1);
});
