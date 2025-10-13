const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  const commitHash = execSync('git log -1 --format="%H"', { encoding: 'utf-8' }).trim();
  const commitDate = execSync('git log -1 --format="%cd" --date=format:"%B %d, %Y at %I:%M %p"', { encoding: 'utf-8' }).trim();
  const commitUrl = `https://github.com/akshayaparida/portfolio/commit/${commitHash}`;
  
  const metadata = {
    commitHash: commitHash.substring(0, 7),
    commitDate,
    commitUrl
  };
  
  const outputPath = path.join(__dirname, '../src/data/git-metadata.json');
  fs.writeFileSync(outputPath, JSON.stringify(metadata, null, 2));
  
  console.log('Git metadata updated:', metadata);
} catch (error) {
  console.error('Failed to update git metadata:', error.message);
  process.exit(1);
}
