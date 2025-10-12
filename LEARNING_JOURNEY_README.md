# Learning Journey Documentation

## Overview
The Learning Journey page (`/learning-journey`) displays your AI engineering education progress with a clean, professional timeline design.

## Features
- **Clean Timeline**: Minimal vertical line design with essential data
- **Progress Tracking**: Automatically calculates progress based on module status
- **localStorage Persistence**: Progress is saved in browser and persists across sessions
- **Mobile Responsive**: Works on all devices with touch-friendly navigation
- **Date Tracking**: Automatically records start and completion dates

## How to Add New Modules

### 1. Edit the Data File
Open `src/data/learningJourney.ts` and add a new module to the `learningModules` array:

```typescript
{
  id: 'module-4-mlops',  // Unique identifier
  title: 'Module 4: MLOps Fundamentals',
  description: 'Short one-line description of what this module covers',
  status: 'not-started',  // Options: 'not-started', 'in-progress', 'completed'
  startDate: undefined,   // Will be set automatically when you click "Start Learning"
  completedDate: undefined,  // Will be set automatically when you click "Mark Complete"
  estimatedHours: 8,      // How long this module takes
  skills: ['Docker', 'Kubernetes', 'CI/CD', 'MLflow'],  // Key skills learned
  keyLearnings: [
    'Deploy ML models to production',
    'Set up automated testing pipelines',
    'Monitor model performance in production'
  ],
  detailedContent: `
    Optional detailed description that appears when user clicks "Show details".
    You can use markdown formatting here.
  `
}
```

### 2. Module Status Flow
- **not-started**: Module hasn't been started yet (gray dot)
- **in-progress**: Currently learning (blue dot, records startDate)
- **completed**: Finished learning (green dot, records completedDate)

### 3. Skills Guidelines
- Keep skills concise (1-2 words each)
- First 5 skills show by default, rest hidden behind "Show details"
- List most important skills first

### 4. Key Learnings
- 3-5 bullet points maximum
- Focus on concrete outcomes
- Write in active voice

## Updating Dates

Dates are **automatically managed**:
- Click "Start Learning" → sets `startDate` to today
- Click "Mark Complete" → sets `completedDate` to today
- Click "Reset" → clears both dates

If you want to manually set dates (for past learning), edit the module directly:

```typescript
startDate: '2025-01-15',  // Format: YYYY-MM-DD
completedDate: '2025-02-20'
```

## Design Philosophy

This page is built with **professional credibility** in mind:

✅ **Minimal**: Only essential data visible by default  
✅ **Scannable**: Employers can quickly see skills and progress  
✅ **Data-driven**: Shows concrete hours, dates, completion rates  
✅ **Clean**: Professional typography and spacing  
✅ **Expandable**: Details available on-demand without clutter  

## Progress Calculation

Overall progress is calculated automatically:
- **Completed modules**: 100% credit
- **In-progress modules**: 50% credit
- **Not started modules**: 0% credit

Formula: `((completed * 100) + (inProgress * 50)) / total modules`

## File Structure

```
src/
├── types/learning.ts           # TypeScript type definitions
├── data/learningJourney.ts     # YOUR DATA - edit this to add modules
├── components/
│   ├── LearningTimeline.tsx    # Timeline component
│   └── LearningSidebar.tsx     # Sidebar navigation
└── app/
    └── learning-journey/
        └── page.tsx             # Main page
```

## Quick Update Checklist

When adding a new learning module:

1. ☐ Open `src/data/learningJourney.ts`
2. ☐ Copy an existing module object
3. ☐ Update all fields (id, title, description, etc.)
4. ☐ Save the file
5. ☐ Refresh browser - new module appears!
6. ☐ Click "Start Learning" when you begin
7. ☐ Click "Mark Complete" when finished

## Examples

### Short Module (3-4 hours)
```typescript
{
  id: 'module-pandas-basics',
  title: 'Pandas for Data Analysis',
  description: 'Master data manipulation with pandas DataFrames',
  status: 'completed',
  startDate: '2025-01-10',
  completedDate: '2025-01-12',
  estimatedHours: 3,
  skills: ['Pandas', 'Data Analysis', 'Python'],
  keyLearnings: [
    'Filter and transform DataFrames efficiently',
    'Handle missing data and outliers',
    'Perform group-by operations'
  ]
}
```

### Long Module (20+ hours)
```typescript
{
  id: 'module-deep-learning',
  title: 'Deep Learning Fundamentals',
  description: 'Build and train neural networks from scratch',
  status: 'in-progress',
  startDate: '2025-02-01',
  estimatedHours: 25,
  skills: ['PyTorch', 'Neural Networks', 'Deep Learning', 'CNNs', 'RNNs', 'Transformers'],
  keyLearnings: [
    'Implement neural networks with PyTorch',
    'Train CNNs for image classification',
    'Build RNNs for sequence processing',
    'Fine-tune transformer models'
  ],
  detailedContent: `
    Comprehensive deep learning bootcamp covering:
    - Neural network architectures
    - Backpropagation and optimization
    - Convolutional networks for vision
    - Recurrent networks for sequences
    - Transformer architecture
  `
}
```

## Tips for Employers

This page demonstrates:
- **Systematic learning approach**: Structured, organized education
- **Commitment to growth**: Ongoing skill development
- **Technical breadth**: Range of AI/ML tools and concepts
- **Transparency**: Honest progress tracking with dates
- **Professionalism**: Clean, data-driven presentation

Keep it updated as you learn to show continuous growth!
