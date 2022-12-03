<script lang="ts">
  import { onMount } from 'svelte';
  import type { Skill } from './models/skill';

  const githubSearchUrlBase = 'https://github.com/bhaeussermann?tab=repositories&sort=stargazers';

  let skills: Skill[];
  let isLoadingSkills = true;
  let didLoadingFail = false;

  onMount(async function() {
    try {
      const result = await fetch('./info/skills.json');
      skills = mapEntries(await result.json());
    } catch (error) {
      console.error('Error fetching skills info: ' + error.message);
      didLoadingFail = true;
    } finally {
      isLoadingSkills = false;
    }
  });

  function mapEntries(rawEntries: any[]): Skill[] {
    return rawEntries.map(entry => ({
      name: entry.name,
      githubQuery: entry.githubQuery
    }));
  }
</script>

<div id="root">
  <h1 id="header">Skills</h1>
  {#if didLoadingFail}
  <div class="error">Failed loading skills.</div>
  {:else if isLoadingSkills}
  <div class="skeleton skeleton-row">
    <div class="bubble" />
    <div class="bubble" />
    <div class="bubble" />
    <div class="bubble" />
  </div>
  {:else}
  <div id="skills-container">
    {#each skills as skill}
    <a
      class="skill"
      href={!skill.githubQuery ? 'javascript:void(0)' : githubSearchUrlBase + skill.githubQuery}
      target={!skill.githubQuery ? '' : '_blank'}
      rel="noreferrer noopener"
      >{skill.name}</a>
    {/each}
  </div>
  {/if}
</div>

<style lang="scss">
  #root {
    --text-color: #111;
    --background-color-odd: #aaf;
    --background-color-even: #ccf;
  }

  :global(.dark) #root {
    --text-color: #111;
    --background-color-odd: #66b;
    --background-color-even: #88b;
  }

  #header {
    margin: 0.67em 0.2em 0.2em 0.2em !important;
  }

  #skills-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    > .skill {
      margin: 10px;
      padding: 5px;
      border-radius: 12px;
      cursor: pointer;
      color: var(--text-color);
      text-decoration: none;

      &:nth-child(odd) {
        background-color: var(--background-color-odd);
      }
      
      &:nth-child(even) {
        background-color: var(--background-color-even);
      }
    }
  }
</style>
