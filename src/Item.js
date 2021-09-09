import './Item.scss';

function Item(props) {
  return (
    <div className={'item ' + (props.expanded ? 'expanded' : 'collapsed')}>
      <div className="row">
        <a className="app-link" href={props.info.appUrl} target="_blank" rel="noreferrer">{props.info.title}</a>
        <a className="repo-link" href={props.info.repoUrl} target="_blank" rel="noreferrer">
          <img src="github.png" alt="Repo on GitHub" />
        </a>
        <div className="expander" onClick={() => props.setExpanded(!props.expanded)}></div>
      </div>
      <div className="expandable-section">
        <div className="description">{props.info.description}</div>
      </div>
    </div>
  );
}

export default Item;
