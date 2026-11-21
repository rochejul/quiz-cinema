#!/usr/bin/env node

/**
 * Helper script to append a new question to `quizData` in `index.html`.
 *
 * Usage:
 *   node .agents/skills/new-tagline/scripts/add_tagline.js \
 *     --tagline "Tagline text" \
 *     --answer "Movie Title" \
 *     --poster "https://.../poster.jpg" \
 *     --choices "Choice 1,Choice 2,Choice 3,Choice 4"
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function parseArgs() {
  const args = process.argv.slice(2);
  const params = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const val = args[i + 1];
      if (val && !val.startsWith('--')) {
        params[key] = val;
        i++;
      }
    }
  }

  return params;
}

function main() {
  const params = parseArgs();
  const { tagline, answer, poster, choices } = params;

  if (!tagline || !answer || !poster || !choices) {
    console.error('Error: Missing required arguments.');
    console.error(
      'Required: --tagline, --answer, --poster, --choices (comma-separated)'
    );
    process.exit(1);
  }

  const choicesList = choices
    .split(',')
    .map((c) => c.trim())
    .filter(Boolean);

  if (!choicesList.includes(answer)) {
    choicesList.push(answer);
  }

  if (choicesList.length !== 4) {
    console.error(
      `Error: Exactly 4 choices are required (found ${choicesList.length}).`
    );
    process.exit(1);
  }

  const indexPath = path.resolve(__dirname, '../../../../index.html');
  if (!fs.existsSync(indexPath)) {
    console.error(`Error: index.html not found at ${indexPath}`);
    process.exit(1);
  }

  const html = fs.readFileSync(indexPath, 'utf-8');

  // Match closing bracket of quizData = [ ... ];
  const quizDataMatch = html.match(/const\s+quizData\s*=\s*\[([\s\S]*?)\];/);
  if (!quizDataMatch) {
    console.error('Error: Could not locate quizData array in index.html');
    process.exit(1);
  }

  const newEntry = `        {
          tagline: ${JSON.stringify(tagline)},
          answer: ${JSON.stringify(answer)},
          poster: ${JSON.stringify(poster)},
          choices: ${JSON.stringify(choicesList, null, 12).replace(/\n\s*/g, ' ')},
        },\n      ];`;

  const updatedHtml = html.replace(/\n\s*\];/, `\n${newEntry}`);

  fs.writeFileSync(indexPath, updatedHtml, 'utf-8');
  console.log(`Successfully added "${answer}" to quizData in index.html.`);

  // Auto-format using project prettier script
  try {
    execSync('npm run format', { stdio: 'inherit' });
  } catch (err) {
    console.warn('Warning: Could not run npm run format automatically.');
  }
}

main();
