<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { DisplayModeOption } from '../common/display-mode-option';
  import { darkMode } from '../common/stores';

  export let displayModeOption: DisplayModeOption;

  let isMenuOpen = false;
  let darkModeValue: boolean;
  let rootElement: HTMLElement;
  
  darkMode.subscribe(value => darkModeValue = value);

  const eventDispatcher = createEventDispatcher();

  onMount(() => document.addEventListener('mousedown', handleClick));
  onDestroy(() => document.removeEventListener('mousedown', handleClick));

  function handleClick(event: MouseEvent) {
    if (rootElement && !rootElement.contains(event.target as Node)) {
      isMenuOpen = false;
    }
  }

  function setDisplayModeOption(newDisplayModeOption: DisplayModeOption) {
    if (displayModeOption !== newDisplayModeOption) {
      displayModeOption = newDisplayModeOption;
      eventDispatcher('displayModeOptionChanged', displayModeOption);
    }
  }
</script>

<div class="root" bind:this={rootElement}>
  <div class="menu-button-container">
    <picture class="menu-button" on:click={() => isMenuOpen = !isMenuOpen}>
      <source srcset={`menu-${darkModeValue ? 'dark' : 'light'}.png`} />
      <img alt="Menu" />
    </picture>
  </div>
  <div class={'menu' + (isMenuOpen ? '' : ' menu-hidden')}>
    {#each Object.values(DisplayModeOption) as option}
      <div class="menu-item" on:click={() => setDisplayModeOption(option)}>
        <div class={'checkbox' + (displayModeOption === option ? ' checked' : '')} />{option}
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
.root {
  --menu-background-color: #c7c7c7;
  --menu-border-color: #bbb;
  --menu-item-text-color: black;
  --menu-item-text-hover-color: #333;
}

:global(.dark) .root {
  --menu-background-color: #383838;
  --menu-border-color: #555;
  --menu-item-text-color: white;
  --menu-item-text-hover-color: #ddd;
}

.root {
  position: fixed;
  right: 30px;
  top: 20px;
}

.menu-button-container {
  display: flex;
  flex-direction: row-reverse;

  > .menu-button {
    cursor: pointer;
  }
}

.menu {
  background-color: var(--menu-background-color);
  border: 3px solid;
  border-radius: 8px;
  border-color: var(--menu-border-color);
  padding: 10px 10px 0 10px;
  opacity: 1;
  transition: opacity 0.2s;

  &.menu-hidden {
    opacity: 0;
    transition: opacity 0.5s;
  }

  > .menu-item {
    color: var(--menu-item-text-color);
    padding-bottom: 10px;
    min-width: 90px;
    cursor: pointer;

    &:hover {
      color: var(---item-text-hover-color);
    }

    > .checkbox {
      position: relative;
      display: inline-block;
      height: 20px;
      width: 20px;
      margin-right: 15px;

      &.checked::before {
        position: absolute;
        content: "";
        left: 0;
        top: 50%;
        height: 50%;
        width: 3px;
        background-color: var(--menu-item-text-color);
        transform: translateX(10px) rotate(-45deg) translateY(2px);
        transform-origin: left bottom;
      }

      &.checked::after {
        position: absolute;
        content: "";
        left: 0;
        bottom: 0;
        height: 3px;
        width: 100%;
        background-color: var(--menu-item-text-color);
        transform: translateX(10px) rotate(-45deg) translateY(2px);
        transform-origin: left bottom;
      }
    }
  }
}
</style>
