import 'purecss/build/base-min.css';
import 'purecss/build/menus-min.css';
import App from './App.svelte';

const app = new App({
  target: document.getElementById('app')
});

export default app;
