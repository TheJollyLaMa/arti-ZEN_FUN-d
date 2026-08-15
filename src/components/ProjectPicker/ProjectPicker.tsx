import type { Project } from '../../game/types';
import './ProjectPicker.css';

interface Props {
  projects: Project[];
  onSelect: (projectId: string) => void;
}

const EMOJI: Record<string, string> = {
  'green-tea': '🍵',
  'streetwave-radio': '📻',
  'solar-commons': '☀️',
};

export default function ProjectPicker({ projects, onSelect }: Props) {
  return (
    <section className="project-picker" aria-labelledby="pp-heading">
      <h2 id="pp-heading">Choose Your Seed 🌱</h2>
      <p className="project-picker__intro">
        Select a sample project for this learning session. Each project has
        different traits that will shape which Funds are a genuine fit.
      </p>
      <ul className="project-picker__list" role="list">
        {projects.map((project) => (
          <li key={project.id}>
            <button
              className="project-card"
              onClick={() => onSelect(project.id)}
              aria-label={`Choose ${project.name}`}
            >
              <span className="project-card__emoji" aria-hidden="true">
                {EMOJI[project.id] ?? '🌿'}
              </span>
              <div className="project-card__content">
                <h3 className="project-card__name">{project.name}</h3>
                <p className="project-card__desc">{project.description}</p>
                <ul
                  className="project-card__traits"
                  aria-label="Project traits"
                >
                  {project.traits.map((trait) => (
                    <li key={trait} className="trait-tag">
                      {trait.replace(/-/g, ' ')}
                    </li>
                  ))}
                </ul>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
