<script lang="ts">
  import { navigate } from 'svelte-routing';
  import type { DisplayModeOption } from '../common/display-mode-option';
  import Menu from './Menu.svelte';

  export let displayModeOption: DisplayModeOption;
</script>

<div class="root">
  <nav class="menu-bar pure-menu">
    <span class="pure-menu-heading">Bernhard — Portfolio</span>
    <ul class="menu-item-list pure-menu-list">
      <li class="menu-item pure-menu-item"><a href={null} class="pure-menu-link" on:click={() => navigate('projects')}>Projects</a></li>
    </ul>
    <Menu bind:displayModeOption on:displayModeOptionChanged />
  </nav>
</div>

<style lang="scss">
.root {
  --menubar-background-color: #f0f0f0;
  --menuitem-hover-background-color: #e0e0e0;
}

:global(.dark) .root {
  --menubar-background-color: #181818;
  --menuitem-hover-background-color: #202020;
}

.root {
  height: 70px;
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

    > .menu-item > a {
      background-color: transparent;
      cursor: pointer;
    }

    > .menu-item > a:hover {
      background-color: var(--menuitem-hover-background-color);
    }
  }
}
</style>
