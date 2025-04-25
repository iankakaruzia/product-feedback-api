export const Categories = {
  Bug: 'Bug',
  Enhancement: 'Enhancement',
  Feature: 'Feature',
  UI: 'UI',
  UX: 'UX',
} as const;

export type Category = (typeof Categories)[keyof typeof Categories];
