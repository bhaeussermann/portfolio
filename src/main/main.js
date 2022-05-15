import { useState, useEffect } from 'preact/hooks';
import { DisplayModeOption } from '../common/display-mode-option';
import './main.scss';
import Menu from '../menu/menu';
import ProjectList from '../projects/project-list';

const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

export default function Main() {
  function getDarkMode(displayModeOption) {
    return (displayModeOption === DisplayModeOption.dark) || ((displayModeOption === DisplayModeOption.auto) && darkModeQuery.matches);
  }

  const savedDisplayMode = window.localStorage.getItem('displayMode') || DisplayModeOption.auto;
  const [state, setState] = useState({ darkMode: getDarkMode(savedDisplayMode), displayModeOption: savedDisplayMode });

  function setDisplayModeOption(displayModeOption) {
    setState({ ...state, darkMode: getDarkMode(displayModeOption), displayModeOption });
    window.localStorage.setItem('displayMode', displayModeOption);
  }

  useEffect(() => {
    function refreshDarkMode() {
      setDisplayModeOption(state.displayModeOption);
    }

    darkModeQuery.addEventListener('change', refreshDarkMode);
    return () => darkModeQuery.removeEventListener('change', refreshDarkMode);
  }, [state.displayModeOption]);

  return (
    <div id="page-content" className={state.darkMode ? 'dark' : ''}>
      <aside>
        <Menu
          className="menu"
          darkMode={state.darkMode}
          displayModeOption={state.displayModeOption}
          setDisplayModeOption={setDisplayModeOption}
          />
      </aside>
      <header>
        <div>Bernhard H&auml;ussermann: Personal Portfolio</div>
      </header>
      <main>
        <div className="title">My Personal Projects</div>
        <div>
          <ProjectList darkMode={state.darkMode} />
        </div>
      </main>
    </div>
  );
}
