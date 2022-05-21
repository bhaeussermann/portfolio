import './project-group.scss';
import ProjectList from './project-list';

export default function ProjectGroup(props) {
  return (
    <div className={'project-group ' + (props.entry.expanded ? 'expanded' : 'collapsed')}>
      <div className="row" onClick={() => props.setExpanded(props.entryIndexPath, !props.entry.expanded)}>
        <div className="group-title">{props.entry.title}</div>
        <div className="space" />
        <div className="expander" />
      </div>
      <div className="expandable-section">
        <ProjectList
          darkMode={props.darkMode}
          entryIndexPath={props.entryIndexPath}
          entries={props.entry.entries}
          setExpanded={props.setExpanded}
          />
      </div>
    </div>
  );
}
