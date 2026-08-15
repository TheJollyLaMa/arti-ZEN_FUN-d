import type { FitResult, FitLevel } from './types';
import type { Project } from './types';
import type { Fund } from './types';

/**
 * Calculate how well a project fits a Fund.
 * Returns a FitResult with level, explanation, and trait details.
 *
 * Scoring:
 *  - Each excluded trait match → ineligible
 *  - Count preferred trait matches (max = preferredTraits.length)
 *  - Count eligibility requirement keyword overlaps with project traits
 *
 * Fit levels:
 *  - strong: ≥ 3 preferred trait matches and no exclusions
 *  - possible: 1–2 preferred trait matches and no exclusions
 *  - weak: 0 preferred matches and no exclusions
 *  - ineligible: any excluded trait matches
 */
export function calculateFit(project: Project, fund: Fund): FitResult {
  const projectTraits = new Set(project.traits);

  // Check exclusions first
  const excluded = fund.excludedTraits.filter((t) => projectTraits.has(t));
  if (excluded.length > 0) {
    return {
      fundId: fund.id,
      level: 'ineligible',
      explanation: `This garden bed isn't the right soil for ${project.name}. One or more of your project's traits (${excluded.join(', ')}) conflicts with this Fund's exclusion criteria.`,
      matchingTraits: [],
      missingTraits: fund.preferredTraits.filter((t) => !projectTraits.has(t)),
    };
  }

  const matchingTraits = fund.preferredTraits.filter((t) =>
    projectTraits.has(t)
  );
  const missingTraits = fund.preferredTraits.filter(
    (t) => !projectTraits.has(t)
  );

  let level: FitLevel;
  let explanation: string;

  if (matchingTraits.length >= 3) {
    level = 'strong';
    explanation = `${project.name} shows strong alignment with ${fund.name}. Your project shares ${matchingTraits.length} of this Fund's preferred traits, and no exclusions apply.`;
  } else if (matchingTraits.length >= 1) {
    level = 'possible';
    explanation = `${project.name} may fit ${fund.name}, but the connection isn't fully clear. You share ${matchingTraits.length} preferred trait(s). Consider whether you can provide stronger evidence of alignment.`;
  } else {
    level = 'weak';
    explanation = `${project.name} doesn't share many traits with ${fund.name}. This may not be the right garden bed for this seed.`;
  }

  return {
    fundId: fund.id,
    level,
    explanation,
    matchingTraits,
    missingTraits,
  };
}

/**
 * Calculate fit for all provided funds and return results.
 */
export function calculateAllFits(project: Project, funds: Fund[]): FitResult[] {
  return funds.map((f) => calculateFit(project, f));
}
