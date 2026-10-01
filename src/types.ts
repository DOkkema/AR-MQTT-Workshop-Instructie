export type StepKey =
  | 'doel'
  | 'vscode'
  | 'github'
  | 'opdracht1'
  | 'opdracht2'
  | 'opdracht3'
  | 'opdracht4'
  | 'opdracht5'
  | 'opdracht6'
  | 'opdracht7';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface HintLevel {
  title: string;
  content: string;
}

export interface WorkshopStep {
  key: StepKey;
  stepNumber: string; // e.g. "Overzicht", "VS Code", "GitHub", "Opdracht 1", etc.
  title: string;
  subtitle: string;
  usedMarker: string;
  estimatedMinutes: number;
  whatYouWillBuild: string;
  whyThisMatters: string;
  sections: {
    title: string;
    description: string;
    substeps?: string[];
    image?: {
      src: string;
      alt: string;
      caption?: string;
      badge?: string;
    };
    codeBlock?: {
      filename?: string;
      targetLocation: string;
      code: string;
      language?: string;
    };
    callout?: {
      type: 'tip' | 'warning' | 'info' | 'gouden-regel';
      title: string;
      text: string;
    };
  }[];
  checkCriteria: string[];
  quiz: QuizQuestion[];
  hints: HintLevel[];
  codeSnippetForDiff?: {
    label: string;
    code: string;
  };
}

export interface Sticker {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  badgeColor: string;
  glowColor: string;
  svgIcon: string;
}

export interface CompletedStepState {
  completed: boolean;
  selectedStickerId?: string;
  completedAt?: string;
}
