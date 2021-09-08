import { useState } from 'react';
import './Item.scss';

function Item(props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div class={'item ' + (expanded ? 'expanded' : 'collapsed')}>
      <div class="row">
        <a class="app-link" href={props.item.appUrl} target="_blank" rel="noreferrer">{props.item.title}</a>
        <a class="repo-link" href={props.item.repoUrl} target="_blank" rel="noreferrer">
          <img class src="github.png" alt="Repo on GitHub" />
        </a>
        <div class="expander" onClick={() => setExpanded(!expanded)}></div>
      </div>
      {expanded && <div class="description">{props.item.description}</div>}
    </div>
  );
}

export default Item;
