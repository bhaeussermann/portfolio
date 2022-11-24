<script lang="ts">
  export let description: string;
</script>

<div id="root">{description}</div>

<style lang="scss">
  #root {
    --item-description-background-color: #e5e5f5;
    --item-description-border-color: #99a;
    --item-description-text-color: black;
  }
  
  :global(.dark) #root {
    --item-description-background-color: #113;
    --item-description-border-color: #667;
    --item-description-text-color: #eee;
  }

  #root {
    padding: 8px;
    background-color: var(--item-description-background-color);
    border: solid;
    border-color: var(--item-description-border-color);
    border-width: 0 2px 2px 2px;
  }
</style>
