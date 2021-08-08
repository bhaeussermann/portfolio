import './Item.css';

function Item(props) {
  return (
    <a href={props.item.url} target="_blank" rel="noreferrer">{props.item.description}</a>
  );
}

export default Item;
