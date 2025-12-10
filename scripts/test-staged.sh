#!/bin/bash
# Script to run tests only for staged files

# Get staged files
STAGED_FILES=$(git diff --name-only --cached --diff-filter=ACMR | grep -E '\.(tsx|ts|jsx|js)$')

if [ -z "$STAGED_FILES" ]; then
  echo "No staged files to test"
  exit 0
fi

echo "Testing changes in: $STAGED_FILES"

# Run related tests for staged files
echo "$STAGED_FILES" | xargs -I {} npx jest --findRelatedTests {} --passWithNoTests

if [ $? -ne 0 ]; then
  echo "Tests failed for staged files"
  exit 1
fi

echo "All tests passed for staged files"
exit 0