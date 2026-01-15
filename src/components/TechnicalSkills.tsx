import { SkillCategory } from "@/types/portfolio";

interface TechnicalSkillsProps {
  categories: SkillCategory[];
}

export default function TechnicalSkills({ categories }: TechnicalSkillsProps) {
  return (
    <section className="skills-section-compact">
      {categories.map((category) => (
        <div key={category.title} className="skill-row">
          <span className="skill-category-label">{category.title}:</span>
          <div className="skills-inline">
            {category.skills.map((skill) => (
              <span key={skill.name} className="skill-tag-compact">
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
