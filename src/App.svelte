<script lang="ts">
  import './app.scss';
  import { onMount, onDestroy } from 'svelte';
  import { Route, Router } from 'svelte-navigator';

  import { DisplayModeOption } from './common/display-mode-option';
  import { darkMode } from './common/stores';
  import NavBar from './components/NavBar.svelte';
  import Home from './pages/home/Page.svelte';
  import Projects from './pages/projects/Page.svelte';
  import Blog from './pages/blog/Page.svelte';
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
  <div id="root" class={darkModeValue ? 'dark' : 'light'}>
    <header>
      <NavBar bind:displayModeOption on:displayModeOptionChanged={_ => handleDisplayModeOptionChanged()} />
      <a
        id="github-ribbon"
        href="https://github.com/bhaeussermann/portfolio"
        rel="noopener noreferrer"
        target="_blank">
        <svg class="z-10" width="80" height="80" viewBox="0 0 250 250">
          <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" fill="#6D6D6D"></path>
          <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6
                          C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="#ffffff" style="transform-origin: 130px 106px 0px;">
          </path>
          <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6
                          C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1
                          C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6
                          C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5
                          C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5
                          C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="#ffffff">
          </path>
        </svg>
      </a>
    </header>
    <main>
      <Route path="/" component={Home} />
      <Route path="/projects" component={Projects} />
      <Route path="/blog" component={Blog} />
      <Route component={NotFound} />
    </main>
  </div>
</Router>

<style lang="scss">
#root {
  --main-background-color: white;
  --main-text-color: black;
  --main-header-color: #555;
}

#root.dark {
  --main-background-color: #1d1d1f;
  --main-text-color: white;
  --main-header-color: #bbb;
}

#root {
  background: var(--main-background-color);
}

header {
  display: flex;
  
  #github-ribbon {
    position: fixed;
    top: 59px;
    right: 0;
  }
}

main {
  display: flex;
  flex-direction: column;
  color: var(--main-text-color);
  min-height: calc(100vh - 80px);
  padding: 5px 100px;
}

@media (max-width: 800px) {
  main {
    padding: 5px 50px;
  }
}

@media (max-width: 400px) {
  main {
    padding: 5px 10px;
  }
}
</style>
