import './Main.css';
import Item from './Item';

function Main() {
  const items = [
    {
      description: 'Northwind Express API',
      url: 'https://northwind-express-api.herokuapp.com/swagger'
    },
    {
      description: 'Angular Northwind App',
      url: 'https://angular-northwind.herokuapp.com'
    }
  ];

  return (
    <div>
      {items.map(i =>
        <div key="i.url">
          <Item item={i} />
        </div>
        )}
    </div>
  );
}

export default Main;
