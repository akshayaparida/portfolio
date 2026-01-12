import { SkillCategory } from "@/types/portfolio";

interface TechnicalSkillsProps {
  categories: SkillCategory[];
}

export default function TechnicalSkills({ categories }: TechnicalSkillsProps) {
  return (
    <section className="mt-8">
      <h3 className="text-lg font-semibold mb-4 text-black">
        Technical Skills
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <div key={category.title} className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <i className={`${category.icon} text-gray-600`}></i>
              <span className="font-medium text-black">{category.title}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill.name}
                  className="px-3 py-1 bg-gray-100 border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-200 transition-colors"
                >
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
