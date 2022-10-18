<script lang="ts">
  import { onMount } from 'svelte';
  import { useFocus } from 'svelte-navigator';
  import ProjectList from './ProjectList.svelte';
  import type { ProjectEntry } from './models/project';
  
  const registerFocus = useFocus();

  let projectEntries: ProjectEntry[] = [];

  onMount(async function() {
    try {
      const result = await fetch('./project-info.json');
      projectEntries = mapEntries(await result.json());
    } catch (error) {
      console.error('Error fetching project info: ' + error.message);
    }
  });

  function mapEntries(rawEntries: any[]): ProjectEntry[] {
    return rawEntries
      .sort((p1, p2) => p1.title < p2.title ? -1 : 1)
      .map(entry => {
        return entry.type === 'item'
          ? {
            type: 'item',
            expanded: false,
            info: { ...entry, type: undefined }
          }
          : {
            type: 'group',
            expanded: false,
            title: entry.title,
            entries: mapEntries(entry.entries)
          };
      });
  }

  function setExpanded(entryIndexPath: number[], expanded: boolean) {
    setExpandedInList(projectEntries, entryIndexPath, expanded);
    projectEntries = projectEntries;
  }

  function setExpandedInList(projectEntries: ProjectEntry[], entryIndexPath: number[], expanded: boolean) {
    const [headEntryIndex, ...entryIndexTail] = entryIndexPath;
    projectEntries.forEach((entry, index) => {
      if (entry.type === 'item') {
        entry.expanded = (index === headEntryIndex) && expanded;
      } else {
        entry.expanded = (index === headEntryIndex) && (expanded || !!entryIndexTail.length);
        setExpandedInList(entry.entries, entryIndexTail, expanded);
      }
    });
  }
</script>

<div id="root">
  <h1 use:registerFocus>Personal Projects</h1>
  <div class="paragraph">
    Below is a list of some small projects I've been working on in my spare time.<br />
    Note that while the projects below are implemented in a number of different (predominantly web-related) technologies, most of my working experience
    (at my employer) is in .NET / C#.
  </div>
  <div>
    <ProjectList
      {projectEntries}
      entryIndexPath={[]}
      {setExpanded}
      />
  </div>
</div>

<style lang="scss">
div {
  margin: 0 auto 1em auto;
}
</style>
