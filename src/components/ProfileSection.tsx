import profileData from "@/data/profile-data.json";

export function ProfileSection() {
  const { experience, projects, education, coreSkills, courses } = profileData;

  return (
    <div className="space-y-10">
      {/* Skills */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-4">
          Core Skills
        </h2>
        <div className="space-y-3">
          <SkillGroup label="Frontend" skills={coreSkills.frontend} />
          <SkillGroup label="Backend & DB" skills={coreSkills.backend} />
          <SkillGroup label="Delivery" skills={coreSkills.delivery} />
        </div>
      </section>

      {/* Featured Projects */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-4">
          Featured Projects
        </h2>
        <div className="space-y-4">
          {projects.map((project, i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl bg-neutral-900/50 border border-neutral-800/60 hover:border-neutral-700/60 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="text-sm font-medium text-neutral-100">
                  {project.name}
                </h3>
                <div className="flex gap-2 shrink-0">
                  {Object.entries(project.links).map(([label, url]) => (
                    <a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-blue-400 hover:text-blue-300 transition-colors font-medium"
                    >
                      {label === "live" ? "Live ↗" : "API Docs ↗"}
                    </a>
                  ))}
                </div>
              </div>
              {project.summary && (
                <p className="text-xs text-blue-400/90 font-medium mb-1.5">
                  {project.summary}
                </p>
              )}
              <p className="text-xs text-neutral-400 leading-relaxed mb-2">
                {project.description}
              </p>
              {project.contribution && (
                <p className="text-[11px] text-neutral-500 leading-relaxed mb-2.5 border-l-2 border-neutral-800 pl-2.5">
                  <span className="text-neutral-400 font-medium">Role & Contribution: </span>
                  {project.contribution}
                </p>
              )}
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800/80 text-neutral-400 border border-neutral-700/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-4">
          Experience
        </h2>
        <div className="space-y-6">
          {experience.map((exp, i) => (
            <div key={i} className="group">
              <div className="flex items-start justify-between gap-4 mb-1">
                <div>
                  <h3 className="text-sm font-medium text-neutral-200">
                    {exp.role}
                  </h3>
                  <p className="text-sm text-neutral-400">{exp.company}</p>
                </div>
                <span className="text-xs text-neutral-600 whitespace-nowrap mt-0.5">
                  {exp.period}
                </span>
              </div>
              <ul className="mt-2 space-y-1">
                {exp.highlights.map((h, j) => (
                  <li
                    key={j}
                    className="text-xs text-neutral-500 leading-relaxed pl-3 relative before:content-[''] before:absolute before:left-0 before:top-[7px] before:w-1 before:h-1 before:bg-neutral-700 before:rounded-full"
                  >
                    {h}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {exp.technologies.slice(0, 6).map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-900 text-neutral-500 border border-neutral-800/50"
                  >
                    {tech}
                  </span>
                ))}
                {exp.technologies.length > 6 && (
                  <span className="text-[10px] px-1.5 py-0.5 text-neutral-600">
                    +{exp.technologies.length - 6} more
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-4">
          Education
        </h2>
        <div className="space-y-2">
          {education.map((edu, i) => (
            <div key={i}>
              <p className="text-sm text-neutral-300">{edu.degree}</p>
              <p className="text-xs text-neutral-500">
                {edu.institution} · {edu.period}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Courses */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-4">
          Courses & Credentials
        </h2>
        <div className="flex flex-wrap gap-2">
          {courses.map((course) => (
            <span
              key={course}
              className="text-xs px-2 py-1 rounded-md bg-neutral-900 text-neutral-400 border border-neutral-800/50"
            >
              {course}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

function SkillGroup({ label, skills }: { label: string; skills: string[] }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-neutral-600 mb-1.5">
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill) => (
          <span
            key={skill}
            className="text-xs px-2 py-0.5 rounded-md bg-neutral-900 text-neutral-400 border border-neutral-800/50"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
