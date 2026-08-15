export type GamePhase =
  | 'welcome'
  | 'choose-project'
  | 'playing'
  | 'select-funds'
  | 'build-pitch'
  | 'curation'
  | 'fund-drive'
  | 'garden-plan'
  | 'complete';

export type SpaceType =
  | 'path'
  | 'decision'
  | 'soil-test'
  | 'trellis'
  | 'root'
  | 'garden-guide'
  | 'wild-bloom'
  | 'reflection';

export type Zone = 'plant' | 'explore' | 'cultivate' | 'curate' | 'bloom';

export interface DecisionOption {
  id: string;
  text: string;
  isOptimal: boolean;
  feedback: string;
  pointsEffect: number;
}

export interface BoardSpace {
  id: number;
  type: SpaceType;
  zone: Zone;
  title: string;
  content: string;
  options?: DecisionOption[];
  trellisAdvance?: number;
  rootSetback?: number;
  guideMessage?: string;
  reflectionKey?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  traits: string[];
}

export interface Fund {
  id: string;
  name: string;
  mission: string;
  eligibilityRequirements: string[];
  preferredTraits: string[];
  excludedTraits: string[];
  applicationStatus: 'open' | 'closed' | 'rolling';
  sampleAvailableMatch: string;
  note: string;
}

export type FitLevel = 'strong' | 'possible' | 'weak' | 'ineligible';

export interface FitResult {
  fundId: string;
  level: FitLevel;
  explanation: string;
  matchingTraits: string[];
  missingTraits: string[];
}

export type CurationOutcome =
  | 'curated'
  | 'needs-clarification'
  | 'eligible-not-selected'
  | 'not-eligible';

export interface CurationResult {
  fundId: string;
  outcome: CurationOutcome;
  explanation: string;
}

export type PhraseCategory = 'what' | 'who' | 'evidence' | 'impact' | 'engagement';

export interface PitchPhrase {
  id: string;
  category: PhraseCategory;
  text: string;
  isSpecific: boolean;
}

export interface Pitch {
  fundId: string;
  phraseIds: string[];
  score: number;
  feedback: string;
}

export interface FundDriveResult {
  fundId: string;
  artifactSales: number;
  matchAvailable: number;
  matchUnlocked: number;
  matchRemaining: number;
  matchMultiple: number;
  totalRaised: number;
}

export interface GameState {
  phase: GamePhase;
  selectedProjectId: string | null;
  currentSpace: number;
  totalSpaces: number;
  growthPoints: number;
  isMoving: boolean;
  lastRoll: number | null;
  completedSpaces: number[];
  currentEncounter: BoardSpace | null;
  encounterResolved: boolean;
  fitResults: FitResult[];
  selectedFundIds: string[];
  skippedFundIds: string[];
  pitches: Pitch[];
  curationResults: CurationResult[];
  fundDriveResults: FundDriveResult[];
  reflections: Record<string, string>;
  reducedMotion: boolean;
  soundEnabled: boolean;
  seedValue: number;
  savedAt: number | null;
}

export type GameAction =
  | { type: 'START_GAME' }
  | { type: 'SELECT_PROJECT'; projectId: string }
  | { type: 'ROLL_DIE'; value: number }
  | { type: 'ADVANCE_TOKEN' }
  | { type: 'LAND_ON_SPACE'; space: BoardSpace }
  | { type: 'RESOLVE_ENCOUNTER'; optionId?: string; reflection?: string }
  | { type: 'GO_TO_SELECT_FUNDS' }
  | { type: 'SELECT_FUND'; fundId: string }
  | { type: 'SKIP_FUND'; fundId: string }
  | { type: 'ADD_FIT_RESULT'; result: FitResult }
  | { type: 'GO_TO_BUILD_PITCH' }
  | { type: 'SUBMIT_PITCH'; pitch: Pitch }
  | { type: 'GO_TO_CURATION' }
  | { type: 'ADD_CURATION_RESULT'; result: CurationResult }
  | { type: 'GO_TO_FUND_DRIVE' }
  | { type: 'ADD_FUND_DRIVE_RESULT'; result: FundDriveResult }
  | { type: 'GO_TO_GARDEN_PLAN' }
  | { type: 'COMPLETE_GAME' }
  | { type: 'ADD_POINTS'; points: number }
  | { type: 'TOGGLE_REDUCED_MOTION' }
  | { type: 'TOGGLE_SOUND' }
  | { type: 'RESET_GAME' }
  | { type: 'RESTORE_STATE'; state: GameState };
