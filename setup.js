const fs = require('fs');
const path = require('path');

// 1. Define the directory structure
const dirs = [
  '.github/workflows',
  'config',
  'src/components',
  'src/fixtures',
  'src/pages',
  'src/utils',
  'src/data',
  'tests/auth',
  'tests/e2e'
];

// 2. Define placeholder files to generate
const files = [
  'config/.env.dev',
  'config/.env.staging',
  'src/pages/BasePage.ts',
  'src/pages/LoginPage.ts',
  'src/fixtures/page.fixtures.ts',
  'src/data/users.json',
  'tests/auth/login.spec.ts',
  'playwright.config.ts',
  'tsconfig.json',
  '.eslintrc.json',
  '.prettierrc'
];

// 3. Execution Logic
console.log('🏗️  Scaffolding project structure...');

dirs.forEach(dir => {
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
    console.log(`   Created dir:  ${dir}`);
  }
});

files.forEach(file => {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, '// Placeholder content');
    console.log(`   Created file: ${file}`);
  }
});

console.log('✅ Project structure ready!');