import { useState, useEffect } from 'preact/hooks';
import Item from './project-item';

export default function ProjectList() {
  const [state, setState] = useState({ items: [] });

  useEffect(async () => {
    try {
      const result = await fetch('../assets/project-info.json');
      const projects = await result.json();
      setState({ items: projects.map(info => ({ info, expanded: false })) });
    } catch (error) {
      console.error('Error fetching project info: ' + error.message);
    }
  }, []);

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
