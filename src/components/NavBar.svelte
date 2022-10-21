<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type { Unsubscriber } from 'svelte/store';
  import { globalHistory, Link } from 'svelte-navigator';
  
  import type { DisplayModeOption } from '../common/display-mode-option';
  import Menu from './Menu.svelte';

  export let displayModeOption: DisplayModeOption;

  const menuItems = [
    { path: '/', title: 'Home' },
    { path: '/projects', title: 'Projects' },
    { path: '/blog', title: 'Blog' }
  ];

  let currentPath = globalHistory.location.pathname;
  let unsubscribeLocationChange: Unsubscriber;

  onMount(() => {
    unsubscribeLocationChange = globalHistory.listen(({ location }) => currentPath = location.pathname);
  });

  onDestroy(() => unsubscribeLocationChange());
</script>

<div id="root">
  <nav class="menu-bar pure-menu">
    <span class="pure-menu-heading">Bernhard — Portfolio</span>
    <ul class="menu-item-list pure-menu-list">
      {#each menuItems as menuItem}
      <li class="menu-item pure-menu-item {currentPath === menuItem.path ? 'active' : ''}">
        <Link class="menu-item-link pure-menu-link" to={menuItem.path}>{menuItem.title}</Link>
      </li>
      {/each}
    </ul>
    <Menu bind:displayModeOption on:displayModeOptionChanged />
  </nav>
</div>

<style lang="scss">
#root {
  --menubar-background-color: #f0f0f0;
  --menuitem-border-color: #ccc;
  --menuitem-hover-background-color: #e0e0e0;
}

:global(.dark) #root {
  --menubar-background-color: #181818;
  --menuitem-border-color: #333;
  --menuitem-hover-background-color: #202020;
}

#root {
  height: 59px;
  z-index: 1;
}

.menu-bar {
  position: fixed;
  display: flex;
  background-color: var(--menubar-background-color);
  width: 100%;
  padding: 10px 20px;

  > * {
    margin-top: auto;
    margin-bottom: auto;
  }

  > .menu-item-list {
    flex: 1;
    display: flex;
    flex-direction: row;

    > .menu-item {
      border: 0.15rem solid transparent;

      &.active {
        border: 0.15rem dotted var(--menuitem-border-color);
      }

      > :global(.menu-item-link) {
        &:hover {
          background-color: var(--menuitem-hover-background-color);
        }
      }
    }
  }
}
</style>
