import { SkillCategory } from "@/types/portfolio";

interface TechnicalSkillsProps {
  categories: SkillCategory[];
}

export default function TechnicalSkills({ categories }: TechnicalSkillsProps) {
  return (
    <section className="technical-skills">
      <h3 className="skills-title">Skills</h3>
      <div className="skills-grid">
        {categories.map((category) => (
          <div key={category.title} className="skill-category">
            <div className="skill-category-header">
              <i className={`${category.icon} skill-icon`}></i>
              <span className="skill-category-title">{category.title}</span>
            </div>
            <div className="skill-tags">
              {category.skills.map((skill) => (
                <span key={skill.name} className="skill-tag">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
