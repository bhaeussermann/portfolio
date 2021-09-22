import { useState } from 'preact/hooks';
import Item from './project-item';

let outerSetState = null;

export default function ProjectList() {
  const [state, setState] = useState({ items: [] });
  outerSetState = setState;

  const setExpanded = (itemIndex, newExpanded) => {
    setState({
      items: state.items.map((item, index) => ({ ...item, expanded: (index === itemIndex) && newExpanded }))
    });
  };

  return (
    <div>
      {state.items.map((item, index) =>
        <Item
          key={index}
          info={item.info}
          expanded={item.expanded}
          setExpanded={newExpanded => setExpanded(index, newExpanded)}
          />
        )}
    </div>
  );
}

fetch('../assets/project-info.json')
  .then(result => result.json())
  .then(projects => outerSetState({ items: projects.map(info => ({ info, expanded: false })) }))
  .catch(error => console.error('Error fetching project info: ' + error.message));
