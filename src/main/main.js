import { useState } from 'preact/hooks';
import './main.scss';
import ProjectList from '../projects/project-list';

const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

export default function Main() {
  const [state, setState] = useState({ darkMode: darkModeQuery.matches });

  darkModeQuery.addEventListener('change', e => setState({ darkMode: e.matches }));

  return (
    <div id="page-content" className={state.darkMode ? 'dark' : ''}>
      <header>
        <div>Bernhard H&auml;ussermann: Personal Portfolio</div>
      </header>
      <main>
        <div className="title">My Personal Projects</div>
        <ProjectList />
      </main>
    </div>
  );
}
