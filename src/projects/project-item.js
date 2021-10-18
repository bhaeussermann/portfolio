import './project-item.scss';

export default function ProjectItem(props) {
  return (
    <div className={'project-item ' + (props.expanded ? 'expanded' : 'collapsed')}>
      <div className="row">
        <a className="app-link" href={props.info.appUrl} target="_blank" rel="noreferrer">{props.info.title}</a>
        <div className="space" />
        {(props.info.repoUrl) && (
          <a className="repo-link" href={props.info.repoUrl} target="_blank" rel="noreferrer">
            <picture>
              <source srcset={`assets/github-${props.darkMode ? 'dark' : 'light'}.png`} />
              <img alt="Repo on GitHub" />
            </picture>
          </a>)
        }
        <div className="expander" onClick={() => props.setExpanded(!props.expanded)}></div>
      </div>
      <div className="expandable-section">
        <div className="description">{props.info.description}</div>
      </div>
    </div>
  );
}
