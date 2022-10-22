<script lang="ts">
  import '../../rows.scss';

  import { onMount } from 'svelte';
  import { useFocus } from 'svelte-navigator';
  import type { Article } from './models/article';

  const registerFocus = useFocus();

  let articles: Article[];
  let isLoadingArticles = true;
  let didLoadingFail = false;

  onMount(async function() {
    try {
      const response = await fetch('https://dev.to/api/articles?username=bhaeussermann&per_page=8');
      articles = await response.json();
    }
    catch (error) {
      console.error('Error loading articles: ' + error.message);
      didLoadingFail = true;
    }
    finally {
      isLoadingArticles = false;
    }
  });
</script>

<div id="root">
  <h1 use:registerFocus>Blog Articles</h1>
  {#if didLoadingFail}
  <div class="error">Failed loading articles.</div>
  {:else}
  <div class="paragraph">Here's a list of my most recent articles on dev.to.</div>
  {#if isLoadingArticles}
  <div class="skeleton">
    <div class="line" />
    <div class="line" />
    <div class="line" />
    <div class="line" />
  </div>
  {:else}
  <div>
    {#each articles as article}
      <div class="row">
        <div class="article-date">{article.readable_publish_date}</div>
        <a class="link external-link" href={article.url} target="_blank" rel="noreferrer noopener">{article.title}</a>
      </div>
    {/each}
  </div>
  {/if}
  {/if}
</div>

<style lang="scss">
.row {
  margin: 0 auto 10px auto;

  > .article-date {
    margin-left: 10px;
    min-width: 100px;
  }
}
</style>
