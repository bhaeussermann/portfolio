import './Main.scss';
import Item from './Item';

function Main() {
  const items = [
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

  return (
    <div id="page-content">
      <header>
        <div>Bernhard H&auml;ussermann: Personal Portfolio</div>
      </header>
      <main>
        <div class="title">My Personal Projects</div>
        {items.map(i =>
            <Item key={i.appUrl} item={i} />
          )}
      </main>
    </div>
  );
}

export default Main;
