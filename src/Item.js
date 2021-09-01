import './Item.css';

function Item(props) {
  return (
    <div class="item">
      <a class="app-link" href={props.item.appUrl} target="_blank" rel="noreferrer">{props.item.description}</a>
      <a class="repo-link" href={props.item.repoUrl} target="_blank" rel="noreferrer">
        <img class src="github.png" alt="Repo on GitHub" />
      </a>
    </div>
  );
}

export default Item;
