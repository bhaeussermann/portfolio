<script lang="ts">
  import { darkMode } from '../../common/stores';
  import type { ProjectItem } from './models/project';

  export let projectItem: ProjectItem;
  export let entryIndexPath: number[];
  export let setExpanded: (entryIndexPath: number[], expanded: boolean) => void;

  let darkModeValue: boolean;

  darkMode.subscribe(value => darkModeValue = value);
</script>

<div class={'root ' + (projectItem.expanded ? 'expanded' : 'collapsed')}>
  <div class="row">
    <a class="app-link external-link" href={projectItem.info.appUrl} target="_blank" rel="noreferrer noopener">{projectItem.info.title}</a>
    <div class="space" />
    {#if projectItem.info.repoUrl}
    <a class="repo-link" href={projectItem.info.repoUrl} target="_blank" rel="noreferrer noopener">
      <picture>
        <source srcset={`github-${darkModeValue ? 'dark' : 'light'}.png`} />
        <img alt="Repo on GitHub" />
      </picture>
    </a>
    {/if}
    <div class="expander" on:click={() => setExpanded(entryIndexPath, !projectItem.expanded)} />
  </div>
  <div class="expandable-section">
    <div class="description">{projectItem.info.description}</div>
  </div>
</div>

<style lang="scss">
.root {
  --project-item-background-color: #dde;
  --project-item-border-color: #99a;
  --project-item-level-2-background-color: #ccd;
  --project-item-level-2-border-color: #778;
  --project-item-link-color: #333;
  --project-item-visited-link-color: #777;
  --project-item-expander-color: black;
  --project-item-description-background-color: #e5e5f5;
  --project-item-description-border-color: #99a;
  --project-item-description-text-color: black;
}

:global(.dark) .root {
  --project-item-background-color: #223;
  --project-item-border-color: #667;
  --project-item-level-2-background-color: #334;
  --project-item-level-2-border-color: #778;
  --project-item-link-color: #eee;
  --project-item-visited-link-color: #bbb;
  --project-item-expander-color: white;
  --project-item-description-background-color: #113;
  --project-item-description-border-color: #667;
  --project-item-description-text-color: #eee;
}

.root {
  max-width: 500px;
  margin-bottom: 10px;
}

.row {
  display: flex;
  align-items: center;
  min-height: 50px;
  background-color: var(--project-item-background-color);
  border: 5px solid;
  border-color: var(--project-item-border-color);
  transition: border-radius 0.4s ease-in-out;
  
  .app-link {
    max-width: 395px;
    margin-left: 10px;
    font-size: 1.2em;
    color: var(--project-item-link-color);

    &:visited {
      color: var(--project-item-visited-link-color);
    }
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
      border-color: var(--project-item-expander-color);
      border-width: 0 3px 3px 0;
      transition: transform 0.4s ease-in-out;
    }
  }
}

.expandable-section {
  overflow-y: hidden;
  transition: max-height 0.4s ease-in-out;

  > .description {
    padding: 8px;
    background-color: var(--project-item-description-background-color);
    border: solid;
    border-color: var(--project-item-description-border-color);
    border-width: 0 2px 2px 2px;
  }
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

:global(.project-group) .root {
  margin-left: 20px;
  margin-right: 20px;

  > .row {
    background-color: var(--project-item-level-2-background-color);
    border-color: var(--project-item-level-2-border-color);
  }
}
</style>
