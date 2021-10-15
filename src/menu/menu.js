import { useState, useEffect } from 'preact/hooks';
import { createRef } from 'preact';
import { DisplayModeOption } from '../common/display-mode-option';
import './menu.scss';

export default function Menu(props) {
  const [state, setState] = useState({ isMenuOpen: false });
  const menuRef = createRef();

  useEffect(() => {
    function handleClick(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setState({ ...state, isMenuOpen: false });
      }
    }

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuRef]);
  
  function setDisplayModeOption(newDisplayModeOption) {
    setState({ ...state, isMenuOpen: false });
    props.setDisplayModeOption(newDisplayModeOption);
  }

  return (
    <div class="menu-container" ref={menuRef}>
      <div class="menu-button-container">
        <picture class="menu-button" onClick={() => setState({ ...state, isMenuOpen: !state.isMenuOpen })}>
          <source srcset={`assets/menu-${props.darkMode ? 'dark' : 'light'}.png`} />
          <img alt="Menu" />
        </picture>
      </div>
      {state.isMenuOpen && <div class="menu">
        {Object.values(DisplayModeOption).map(option => 
          (
          <div class="menu-item" onClick={() => setDisplayModeOption(option)}>
            <div className={'checkbox' + (props.displayModeOption === option ? ' checked' : '')} />{toDisplayString(option)}
          </div>
          ))
        }
      </div>}
    </div>
  );
}

function toDisplayString(text) {
  return text[0].toUpperCase() + text.substring(1);
}
