<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { Route, Router } from 'svelte-navigator';

  import { DisplayModeOption } from './common/display-mode-option';
  import { darkMode } from './common/stores';
  import NavBar from './components/NavBar.svelte';
  import Home from './pages/home/Page.svelte';
  import Projects from './pages/projects/Page.svelte';
  import NotFound from './pages/NotFound.svelte';

  export let url = '';

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

<Router {url}>
  <div class={'root ' + (darkModeValue ? 'dark' : 'light')}>
    <header>
      <NavBar bind:displayModeOption on:displayModeOptionChanged={_ => handleDisplayModeOptionChanged()} />
    </header>
    <main>
      <Route path="/" component={Home} />
      <Route path="/projects" component={Projects} />
      <Route component={NotFound} />
    </main>
  </div>
</Router>

<style lang="scss">
.root {
  --main-background-color: white;
  --main-text-color: black;
  --main-header-color: #555;
}

.root.dark {
  --main-background-color: #1d1d1f;
  --main-text-color: white;
  --main-header-color: #bbb;
}

.root {
  background: var(--main-background-color);
}

header {
  display: flex;
}

main {
  display: flex;
  flex-direction: column;
  color: var(--main-text-color);
  min-height: calc(100vh - 80px);
  padding: 5px 50px;
}

@media (max-width: 400px) {
  main {
    padding: 5px 10px;
  }
}
</style>
