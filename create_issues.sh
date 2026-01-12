#!/bin/bash

# Issue 1: Theme & Typography
gh issue create --title "[Task] Setup Tailwind v4 Theme and Typography" --body "# Task Issue: Setup Tailwind v4 Theme and Typography

## Summary
Establish the foundational styling for the new design by configuring Tailwind CSS v4 variables and integrating the required fonts.

## Recommendation
- Update globals.css to use Tailwind v4 @theme.
- Define CSS variables for the color palette.
- Replace current fonts with Inter and Space Grotesk.

## Implementation Steps
1. Import Inter and Space_Grotesk in layout.tsx.
2. Define font variables.
3. Rewrite globals.css with new color map.

## Priority
High" --label "enhancement,priority:high"

# Issue 2: Header
gh issue create --title "[Task] Implement Modern Header with Theme Toggle" --body "# Task Issue: Implement Modern Header with Theme Toggle

## Summary
Refactor the Header component to align with the new design, featuring a left-aligned logo and right-aligned social icons with a theme toggle.

## Recommendation
- Use the new flexbox layout.
- Add the dark/light mode toggle button.
- Integrate social icons (GitHub, LinkedIn, X, HuggingFace).

## Priority
Medium" --label "enhancement,priority:medium"

# Issue 3: Hero Section
gh issue create --title "[Task] Redesign Hero Section with Status Widgets" --body "# Task Issue: Redesign Hero Section with Status Widgets

## Summary
Refactor the Hero section to include the new status pills (Location, Time, Availability) and the updated introduction text.

## Recommendation
- Implement the 'Hi, I am...' typography.
- Create the status widget row.
- Add the 'Email me' and social link row.

## Priority
Medium" --label "enhancement,priority:medium"

# Issue 4: Skills Component
gh issue create --title "[Task] Create Technical Skills Component" --body "# Task Issue: Create Technical Skills Component

## Summary
Create a new Skills component to display technical proficiencies in a grid of cards as shown in the design.

## Recommendation
- Create a data structure for skills (ML, GenAI, Languages, Tools).
- Implement the card layout with icons and pill tags.
- Make it responsive (grid-cols-1 to grid-cols-2).

## Priority
Medium" --label "enhancement,priority:medium"

# Issue 5: Projects Component
gh issue create --title "[Task] Refactor Projects Section" --body "# Task Issue: Refactor Projects Section

## Summary
Update the Projects section to use the new card design with distinct styling for the content and image areas.

## Recommendation
- Refactor the ProjectCard component.
- Implement the hover effects and image overlays.
- Update the grid layout.

## Priority
Medium" --label "enhancement,priority:medium"

# Issue 6: Sidebar & Footer
gh issue create --title "[Task] Implement Sidebar Navigation and Footer" --body "# Task Issue: Implement Sidebar Navigation and Footer

## Summary
Add the sticky sidebar navigation for desktop and the updated footer.

## Recommendation
- Create the 'Explore' sidebar component.
- Update the Footer with the visitor count style and copyright.
- Ensure the sidebar hides on mobile.

## Priority
Low" --label "enhancement,priority:low"
