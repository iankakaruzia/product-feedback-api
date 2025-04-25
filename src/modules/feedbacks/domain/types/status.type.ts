export const Statuses = {
  InProgress: 'InProgress',
  Live: 'Live',
  Planned: 'Planned',
  Suggestion: 'Suggestion',
} as const;

export type Status = (typeof Statuses)[keyof typeof Statuses];
