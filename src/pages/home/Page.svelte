<script lang="ts">
import { useFocus } from 'svelte-navigator';
const registerFocus = useFocus();
</script>

<div id="root">
  <h1 use:registerFocus>Bernhard H&auml;ussermann — Software Engineer</h1>

  <div id="content">
    <div id="info">
      <ul>
        <li>👨‍💻 .NET full-stack developer</li>
        <li>📍 <a
          class="external-link"
          href="https://www.google.com/maps/place/Wingate+Park,+Pretoria,+0153"
          target="_blank"
          rel="nofollow noreferrer noopener">Pretoria, South Africa</a></li>
        <li>✉️ <a href="mailto:bernhardgh@icloud.com">bernhardgh@icloud.com</a></li>
      </ul>
    </div>
    <img id="profile" src="profile.jpg" alt="Profile">
  </div>
</div>

<style lang="scss">
#root {
  --link-color: #777;
  --visited-link-color: #aaa;
}

:global(.dark) #root {
  --link-color: #bbb;
  --visited-link-color: #888;
}

#root {
  display: flex;
  flex-direction: column;
}

#content {
  display: flex;
  flex-direction: row;

  > #info {
    flex-grow: 1;
  }

  > #profile {
    width: 250px;
    height: auto;
    border-radius: 50%;
  }
}

ul {
  list-style-type: none;
  padding-left: 0;

  > li {
    font-size: 1.2em;
    margin-bottom: 20px;

    a {
      color: var(--link-color);

      &:visited {
        color: var(--visited-link-color);
      }
    }
  }
}

@media (max-width: 600px) {
  #profile {
    display: none;
  }
}
</style>
