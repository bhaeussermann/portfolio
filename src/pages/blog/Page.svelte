<script lang="ts">
  import { onMount } from 'svelte';
  import { useFocus } from 'svelte-navigator';
  import type { Article } from './models/article';

  const registerFocus = useFocus();

  let articles: Article[] = [];
  let didLoadingFail = false;

  onMount(async function() {
    try {
      const response = await fetch('https://dev.to/api/articles?username=bhaeussermann&per_page=10');
      articles = await response.json();
    }
    catch (error) {
      console.error('Error loading articles: ' + error.message);
      didLoadingFail = true;
    }
  });
</script>

<div id="root">
  <h1 use:registerFocus>Blog Articles</h1>
  {#if didLoadingFail}
  <div class="error">Failed loading articles.</div>
  {:else}
  <div class="paragraph">Here's a list of my most recent articles on dev.to.</div>
  <ul>
  {#each articles as article}
    <li>
      <a class="external-link" href={article.url} target="_blank" rel="noreferrer noopener">{article.title}</a>
    </li>
  {/each}
  </ul>
  {/if}
</div>

<style lang="scss">
.error {
  font-size: 1.2em;
  color: #ff4444;
}
</style>
