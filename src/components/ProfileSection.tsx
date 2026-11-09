import profileData from "@/data/profile-data.json";

export function ProfileSection() {
  const { experience, projects, education, coreSkills, courses } = profileData;

  return (
    <div className="space-y-10">
      {/* Skills */}
      <section>
        <h2
          className="text-xs font-semibold uppercase tracking-wider mb-4"
          style={{ color: "var(--text-muted)" }}
        >
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
        <h2
          className="text-xs font-semibold uppercase tracking-wider mb-4"
          style={{ color: "var(--text-muted)" }}
        >
          Featured Projects
        </h2>
        <div className="space-y-4">
          {projects.map((project, i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl border transition-colors shadow-2xs"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-card)",
              }}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3
                  className="text-sm font-medium"
                  style={{ color: "var(--text-primary)" }}
                >
                  {project.name}
                </h3>
                <div className="flex gap-2 shrink-0">
                  {Object.entries(project.links).map(([label, url]) => (
                    <a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-medium transition-opacity hover:opacity-80"
                      style={{ color: "var(--accent)" }}
                    >
                      {label === "live" ? "Live ↗" : "API Docs ↗"}
                    </a>
                  ))}
                </div>
              </div>

              {project.summary && (
                <p
                  className="text-xs font-medium mb-1.5"
                  style={{ color: "var(--accent)" }}
                >
                  {project.summary}
                </p>
              )}

              <p
                className="text-xs leading-relaxed mb-2"
                style={{ color: "var(--text-secondary)" }}
              >
                {project.description}
              </p>

              {project.contribution && (
                <p
                  className="text-[11px] leading-relaxed mb-2.5 pl-2.5 border-l-2"
                  style={{
                    borderColor: "var(--accent-border)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <span
                    className="font-medium"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Role & Contribution:{" "}
                  </span>
                  {project.contribution}
                </p>
              )}

              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] px-1.5 py-0.5 rounded border font-mono"
                    style={{
                      backgroundColor: "var(--bg-chip)",
                      borderColor: "var(--border-subtle)",
                      color: "var(--text-secondary)",
                    }}
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
        <h2
          className="text-xs font-semibold uppercase tracking-wider mb-4"
          style={{ color: "var(--text-muted)" }}
        >
          Experience
        </h2>
        <div className="space-y-6">
          {experience.map((exp, i) => (
            <div key={i} className="group">
              <div className="flex items-start justify-between gap-4 mb-1">
                <div>
                  <h3
                    className="text-sm font-medium"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {exp.role}
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {exp.company}
                  </p>
                </div>
                <span
                  className="text-xs whitespace-nowrap mt-0.5 font-mono"
                  style={{ color: "var(--text-muted)" }}
                >
                  {exp.period}
                </span>
              </div>
              <ul className="mt-2 space-y-1">
                {exp.highlights.map((h, j) => (
                  <li
                    key={j}
                    className="text-xs leading-relaxed pl-3 relative"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <span
                      className="absolute left-0 top-[7px] w-1 h-1 rounded-full"
                      style={{ backgroundColor: "var(--text-muted)" }}
                    />
                    {h}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {exp.technologies.slice(0, 6).map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] px-1.5 py-0.5 rounded border font-mono"
                    style={{
                      backgroundColor: "var(--bg-chip)",
                      borderColor: "var(--border-subtle)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
                {exp.technologies.length > 6 && (
                  <span
                    className="text-[10px] px-1.5 py-0.5 font-mono"
                    style={{ color: "var(--text-muted)" }}
                  >
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
        <h2
          className="text-xs font-semibold uppercase tracking-wider mb-4"
          style={{ color: "var(--text-muted)" }}
        >
          Education
        </h2>
        <div className="space-y-2">
          {education.map((edu, i) => (
            <div key={i}>
              <p
                className="text-sm font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                {edu.degree}
              </p>
              <p
                className="text-xs"
                style={{ color: "var(--text-secondary)" }}
              >
                {edu.institution} · {edu.period}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Courses */}
      <section>
        <h2
          className="text-xs font-semibold uppercase tracking-wider mb-4"
          style={{ color: "var(--text-muted)" }}
        >
          Courses & Credentials
        </h2>
        <div className="flex flex-wrap gap-2">
          {courses.map((course) => (
            <span
              key={course}
              className="text-xs px-2 py-1 rounded-md border"
              style={{
                backgroundColor: "var(--bg-chip)",
                borderColor: "var(--border-subtle)",
                color: "var(--text-secondary)",
              }}
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
      <p
        className="text-[10px] uppercase tracking-wider mb-1.5"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill) => (
          <span
            key={skill}
            className="text-xs px-2 py-0.5 rounded-md border"
            style={{
              backgroundColor: "var(--bg-chip)",
              borderColor: "var(--border-subtle)",
              color: "var(--text-secondary)",
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
