import { useState } from 'react';
import './Main.scss';
import Item from './Item';

let outerSetItems = null;

export default function Main() {
  const [items, setItems] = useState([]);
  outerSetItems = setItems;

  const setExpanded = (itemIndex, newExpanded) => {
    setItems(items.map((item, index) => ({ ...item, expanded: (index === itemIndex) && newExpanded })));
  };

  return (
    <div id="page-content">
      <header>
        <div>Bernhard H&auml;ussermann: Personal Portfolio</div>
      </header>
      <main>
        <div className="title">My Personal Projects</div>
        {items.map((item, index) =>
            <Item
              key={index}
              info={item.info}
              expanded={item.expanded}
              setExpanded={newExpanded => setExpanded(index, newExpanded)}
              />
          )}
      </main>
    </div>
  );
}

fetch('./project-info.json')
  .then(result => result.json())
  .then(projects => outerSetItems(projects.map(info => ({ info, expanded: false }))))
  .catch(error => console.error('Error fetching project info: ' + error.message));
