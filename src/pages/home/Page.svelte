<script lang="ts">
import { useFocus } from 'svelte-navigator';
import { darkMode } from '../../common/stores';

const registerFocus = useFocus();

let darkModeValue: boolean;
darkMode.subscribe(value => darkModeValue = value);
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
        <li style="display: flex">
          <picture>
            <source srcset="download-{darkModeValue ? 'dark' : 'light'}.png" />
            <img alt="CV Download" />
          </picture>
          <a style="margin-left: 5px;" href="cv.pdf" target="_blank">Download my CV</a>
        </li>
      </ul>
      <div id="profiles-section">
        <a
          href="https://github.com/bhaeussermann"
          target="_blank"
          rel="noreferrer noopener"
          title="GitHub profile">
          <picture>
            <source srcset="github-{darkModeValue ? 'dark' : 'light'}.png" />
            <img alt="GitHub profile" />
          </picture>
        </a>
        <a
          href="https://stackoverflow.com/users/359765/bgh"
          target="_blank"
          rel="noreferrer noopener"
          title="Stack Overflow profile">
          <img src="stackoverflow.png" alt="Stack Overflow profile" />
        </a>
        <a
          href="https://dev.to/bhaeussermann"
          target="_blank"
          rel="noreferrer noopener"
          title="My blog articles on dev.to">
          <img src="dev.to.png" alt="My blog articles on dev.to" />
        </a>
        <a
          href="https://www.youtube.com/channel/UCV4M2g3WCFKJ7CgG2cJ46YQ/featured"
          target="_blank"
          rel="noreferrer noopener"
          title="My piano videos on YouTube">
          <img src="youtube.png" alt="My piano videos on YouTube" />
        </a>
      </div>
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
    height: 250px;
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

#profiles-section {
  margin-top: 50px;
  display: flex;
  gap: 40px;
}

@media (max-width: 600px) {
  #profile {
    display: none;
  }
}
</style>
