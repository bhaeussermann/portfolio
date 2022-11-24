<script lang="ts">
  import '../../rows.scss';

  import { darkMode } from '../../common/stores';
  import ProjectDescription from './ProjectDescription.svelte';
  import type { ProjectItem } from './models/project';

  export let projectItem: ProjectItem;
  export let entryIndexPath: number[];
  export let setExpanded: (entryIndexPath: number[], expanded: boolean) => void;

  let darkModeValue: boolean;

  darkMode.subscribe(value => darkModeValue = value);
</script>

<div id="root" class={projectItem.expanded ? 'expanded' : 'collapsed'}>
  <div class="row">
    <a class="link external-link" href={projectItem.info.appUrl} target="_blank" rel="noreferrer noopener">{projectItem.info.title}</a>
    <div class="space" />
    {#if projectItem.info.repoUrl}
    <a class="repo-link" href={projectItem.info.repoUrl} target="_blank" rel="noreferrer noopener">
      <picture>
        <source srcset="github-{darkModeValue ? 'dark' : 'light'}.png" />
        <img alt="Repo on GitHub" />
      </picture>
    </a>
    {/if}
    <div class="expander" on:click={() => setExpanded(entryIndexPath, !projectItem.expanded)} />
  </div>
  <div class="expandable-section">
    <ProjectDescription description={projectItem.info.description}></ProjectDescription>
  </div>
</div>

<style lang="scss">
#root {
  --item-level-2-background-color: #ccd;
  --item-level-2-border-color: #778;
  --item-expander-color: black;
}

:global(.dark) #root {
  --item-level-2-background-color: #334;
  --item-level-2-border-color: #778;
  --item-expander-color: white;
}

#root {
  max-width: 500px;
  margin-bottom: 10px;
}

.row {
  max-width: 500px;
  transition: border-radius 0.4s ease-in-out;
  
  .link {
    max-width: 395px;
  }

  .space {
    margin-left: auto;
  }
  
  .repo-link {
    margin: 0 10px;
    
    > picture {
      display: flex;

      > img {
        height: 40px;
      }
    }
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
      border-color: var(--item-expander-color);
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
  > .row {
    border-radius: 8px;

    .expander::after {
      transform: translateY(-4px) rotate(45deg);
      -webkit-transform: translateY(-4px) rotate(45deg);
    }
  }

  > .expandable-section {
    max-height: 0;
  }
}

.expanded {
  > .row {
    border-radius: 8px 8px 0 0;

    .expander::after {
      transform: translateY(0) rotate(-135deg);
      -webkit-transform: translateY(0) rotate(-135deg);
    }
  }

  > .expandable-section {
    max-height: 150px;
  }
}

:global(.project-group) #root {
  margin-left: 20px;
  margin-right: 20px;

  > .row {
    background-color: var(--item-level-2-background-color);
    border-color: var(--item-level-2-border-color);
  }
}
</style>
