import { SkillCategory } from "@/types/portfolio";

interface TechnicalSkillsProps {
  categories: SkillCategory[];
}

const iconColors = ["green", "blue", "purple", "orange"];

export default function TechnicalSkills({ categories }: TechnicalSkillsProps) {
  return (
    <section className="skills-section">
      <h3 className="section-title">Technical Skills</h3>
      <div className="skills-grid">
        {categories.map((category, index) => (
          <div key={category.title} className="skill-card">
            <div className="skill-card-header">
              <div className={`skill-icon ${iconColors[index % 4]}`}>
                <i className={category.icon}></i>
              </div>
              <h4 className="skill-card-title">{category.title}</h4>
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
