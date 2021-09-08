import { useState } from 'react';
import './Main.scss';
import Item from './Item';

const itemInfos = [
  {
    title: 'Northwind Express API',
    description: `A RESTful API, implemented in Node.js using Express, providing CRUD functionality for managing employee details in a
    PostgreSQL database.`,
    appUrl: 'https://northwind-express-api.herokuapp.com/swagger',
    repoUrl: 'https://github.com/bhaeussermann/northwind-api'
  },
  {
    title: 'Angular Northwind App',
    description: `A simple CRUD application for managing employee details in a standard Northwind database. It is implemented using Angular
    and the Angular Material UI component library.`,
    appUrl: 'https://angular-northwind.herokuapp.com',
    repoUrl: 'https://github.com/bhaeussermann/AngularNorthwind'
  },
  {
    title: 'Vue Northwind App (Buefy)',
    description: `A simple CRUD application for managing employee details in a standard Northwind database. It is implemented using Vue.js
    and the Buefy UI component library.`,
    appUrl: 'https://vue-northwind-buefy.herokuapp.com',
    repoUrl: 'https://github.com/bhaeussermann/VueNorthwind'
  },
  {
    title: 'Vue Northwind App (Vuetify)',
    description: `A simple CRUD application for managing employee details in a standard Northwind database. It is implemented using Vue.js
    and the Vuetify UI component library.`,
    appUrl: 'https://vue-northwind-vuetify.herokuapp.com',
    repoUrl: 'https://github.com/bhaeussermann/VueNorthwind/tree/vuetify'
  }
];

const initialItems = itemInfos.map(info => ({ info, expanded: false }));

function Main() {
  const [items, setItems] = useState(initialItems);

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

export default Main;
