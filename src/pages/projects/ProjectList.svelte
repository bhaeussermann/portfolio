<script lang="ts">
  import ProjectItem from './ProjectItem.svelte';
  import ProjectGroup from './ProjectGroup.svelte';
  import type { ProjectEntry } from './models/project';

  export let projectEntries: ProjectEntry[];
  export let entryIndexPath: number[];
  export let setExpanded: (entryIndexPath: number[], expanded: boolean) => void;
</script>

<div>
  {#each projectEntries as entry, index}
  {#if entry.type === 'item'}
  <ProjectItem
    projectItem={entry}
    entryIndexPath={[...entryIndexPath, index]}
    {setExpanded}
    />
  {:else}
  <ProjectGroup
    projectGroup={entry}
    entryIndexPath={[...entryIndexPath, index]}
    {setExpanded}
    />
  {/if}
  {/each}
</div>
