export type ProjectEntry = ProjectItem | ProjectGroup;

export interface ProjectItem extends ProjectEntryBase {
  type: 'item';
  info: {
    title: string;
    description: string;
    appUrl: string;
    repoUrl: string;
  }
}

export interface ProjectGroup extends ProjectEntryBase {
  type: 'group';
  title: string;
  entries: ProjectEntry[];
}

interface ProjectEntryBase {
  type: string;
  expanded: boolean;
}
