<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  import { DisplayModeOption } from './common/display-mode-option';
  import { darkMode } from './common/stores';
  import Menu from './components/Menu.svelte';
  import Projects from './pages/projects/Page.svelte';

  const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

  let displayModeOption: DisplayModeOption;
  let darkModeValue: boolean;

  onMount(() => {
    displayModeOption = window.localStorage.getItem('displayMode') as DisplayModeOption ?? DisplayModeOption.Auto;
    refreshDarkMode();
    darkModeQuery.addEventListener('change', refreshDarkMode);
  });

  onDestroy(() => {
    darkModeQuery.removeEventListener('change', refreshDarkMode);
  });

  function handleDisplayModeOptionChanged() {
    refreshDarkMode();
    window.localStorage.setItem('displayMode', displayModeOption);
  }

  darkMode.subscribe(value => darkModeValue = value);

  function refreshDarkMode() {
    darkMode.set((displayModeOption === DisplayModeOption.Dark) || ((displayModeOption === DisplayModeOption.Auto) && darkModeQuery.matches));
  }
</script>

<div class={'root ' + (darkModeValue ? 'dark' : 'light')}>
  <aside>
    <Menu bind:displayModeOption on:displayModeOptionChanged={_ => handleDisplayModeOptionChanged()} />
  </aside>
  <header>
    <div>Bernhard H&auml;ussermann: Personal Portfolio</div>
  </header>
  <main>
    <Projects />
  </main>
</div>

<style lang="scss">
.root {
  --main-background-color: white;
  --main-text-color: black;
  --main-header-color: #555;
}

.root.dark {
  --main-background-color: #222;
  --main-text-color: white;
  --main-header-color: #bbb;
}

.root {
  background: var(--main-background-color);
  color: var(--main-text-color);
  min-height: 100vh;
  padding: 5px 50px;
}

@media (max-width: 400px) {
  .root {
    padding: 5px 10px;
  }
}

header {
  display: flex;

  > div {
    font-size: 3em;
    margin: 0.67em auto;
    color: var(--main-header-color);
  }
}

main {
  display: flex;
  flex-direction: column;
}
</style>
