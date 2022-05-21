import Item from './project-item';
import ProjectGroup from './project-group';

export default function ProjectList(props) {
  return (
    <div>
      {props.entries.map((entry, index) =>
        entry.type === 'item'
        ? <Item
          key={index}
          darkMode={props.darkMode}
          info={entry.info}
          expanded={entry.expanded}
          setExpanded={newExpanded => props.setExpanded([...props.entryIndexPath, index], newExpanded)}
          />
        : 
        <ProjectGroup
          key={index}
          darkMode={props.darkMode}
          entryIndexPath={[...props.entryIndexPath, index]}
          entry={entry}
          setExpanded={props.setExpanded}
          />
        )}
    </div>
  );
}
