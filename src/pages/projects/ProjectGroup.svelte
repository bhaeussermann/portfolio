<script lang="ts">
  import ProjectList from './ProjectList.svelte';
  import type { ProjectGroup } from './models/project';

  export let projectGroup: ProjectGroup;
  export let entryIndexPath: number[];
  export let setExpanded: (entryIndexPath: number[], expanded: boolean) => void;
</script>

<div class={'root project-group ' + (projectGroup.expanded ? 'expanded' : 'collapsed')}>
  <div class="row" on:click={() => setExpanded(entryIndexPath, !projectGroup.expanded)}>
    <div class="group-title">{projectGroup.title}</div>
     <div class="space" />
    <div class="expander" />
  </div>
  <div class="expandable-section">
    <ProjectList
      projectEntries={projectGroup.entries}
      {entryIndexPath}
      {setExpanded}
      />
  </div>
</div>

<style lang="scss">
.root {
  --group-item-background-color: #dde;
  --group-item-border-color: #99a;
  --group-item-title-color: #333;
  --group-item-expander-color: black;
}

:global(.dark) .root {
  --group-item-background-color: #223;
  --group-item-border-color: #667;
  --group-item-title-color: #eee;
  --group-item-visited-link-color: #bbb;
  --group-item-expander-color: white;
}

.root {
  max-width: 500px;
}

.row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  min-height: 50px;
  border: 5px solid;
  border-radius: 8px;
  border-color: var(--group-item-border-color);
  background-color: var(--group-item-background-color);
  cursor: pointer;
  
  .group-title {
    margin-left: 10px;
    font-size: 1.2em;
    font-weight: bold;
    color: var(--group-item-title-color);
  }

  .space {
    margin-left: auto;
  }
  
  .expander {
    width: 25px;
    cursor: pointer;
  
    &::after {
      content: '';
      display: inline-block;
      margin-left: 5px;
      padding: 3px;
      width: 0.1px;
      border: solid;
      border-color: var(--group-item-expander-color);
      border-width: 0 3px 3px 0;
      transition: transform 0.4s ease-in-out;
    }
  }
}

.expandable-section {
  overflow-y: hidden;
  transition: max-height 0.4s ease-in-out;
}

.collapsed {
  > .row .expander::after {
    transform: translateY(-4px) rotate(45deg);
    -webkit-transform: translateY(-4px) rotate(45deg);
  }

  > .expandable-section {
    max-height: 0;
  }
}

.expanded {
  > .row .expander::after {
    transform: translateY(0) rotate(-135deg);
    -webkit-transform: translateY(0) rotate(-135deg);
  }

  > .expandable-section {
    max-height: 500px;
  }
}
</style>