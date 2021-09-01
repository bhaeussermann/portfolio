import './Main.css';
import Item from './Item';

function Main() {
  const items = [
    {
      description: 'Northwind Express API',
      appUrl: 'https://northwind-express-api.herokuapp.com/swagger',
      repoUrl: 'https://github.com/bhaeussermann/northwind-api'
    },
    {
      description: 'Angular Northwind App',
      appUrl: 'https://angular-northwind.herokuapp.com',
      repoUrl: 'https://github.com/bhaeussermann/AngularNorthwind'
    },
    {
      description: 'Vue Northwind App (Buefy)',
      appUrl: 'https://vue-northwind-buefy.herokuapp.com',
      repoUrl: 'https://github.com/bhaeussermann/VueNorthwind'
    },
    {
      description: 'Vue Northwind App (Vuetify)',
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
