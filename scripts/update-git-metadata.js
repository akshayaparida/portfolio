const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  let commitHash = 'unknown';
  let commitDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  });

  try {
    commitHash = execSync('git rev-parse HEAD', { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
    const rawDate = execSync('git log -1 --format="%cd" --date=iso', { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
    if (rawDate) {
      const d = new Date(rawDate);
      if (!isNaN(d.getTime())) {
        const tzOptions = { timeZone: 'Asia/Kolkata' };
        commitDate = d.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric', ...tzOptions }) +
          ' at ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', ...tzOptions });
      }
    }
  } catch (gitErr) {
    console.warn('Warning: Could not fetch git details:', gitErr.message);
  }

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
}

