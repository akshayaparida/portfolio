import { execSync } from 'child_process';

export interface GitInfo {
  commitHash: string;
  commitDate: string;
  commitUrl: string;
}

export function getGitInfo(): GitInfo {
  try {
    const commitHash = execSync('git log -1 --format="%H"', { encoding: 'utf-8' }).trim();
    const commitDate = execSync('git log -1 --format="%cd" --date=format:"%B %d, %Y at %I:%M %p"', { encoding: 'utf-8' }).trim();
    const commitUrl = `https://github.com/akshayaparida/portfolio/commit/${commitHash}`;
    
    return {
      commitHash,
      commitDate,
      commitUrl
    };
  } catch {
    // Fallback for build environments without git
    return {
      commitHash: 'unknown',
      commitDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      commitUrl: 'https://github.com/akshayaparida/portfolio/commits/main'
    };
  }
}
