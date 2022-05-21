import { useState, useEffect } from 'preact/hooks';
import ProjectList from './project-list';

export default function ProjectListController(props) {
  const [state, setState] = useState({ entries: [] });

  useEffect(async () => {
    try {
      const result = await fetch('../assets/project-info.json');
      setState({ entries: mapEntries(await result.json()) });
    } catch (error) {
      console.error('Error fetching project info: ' + error.message);
    }
  }, []);

  function mapEntries(rawEntries) {
    return rawEntries
      .sort((p1, p2) => p1.title < p2.title ? -1 : 1)
      .map(entry => {
        return entry.type === 'item'
          ? {
            type: entry.type,
            expanded: false,
            info: { ...entry, type: undefined }
          }
          : {
            type: entry.type,
            expanded: false,
            title: entry.title,
            entries: mapEntries(entry.entries)
          };
      });
  }

  function setExpanded(entryIndexPath, newExpanded) {
    setState({
      entries: setExpandedInList(entryIndexPath, newExpanded, state.entries)
    });
  }

  function setExpandedInList(entryIndexPath, newExpanded, entries) {
    const [headEntryIndex, ...entryIndexTail] = entryIndexPath;
    return entries.map((entry, index) => {
      return entry.type === 'item'
        ? {
          ...entry,
          expanded: (index === headEntryIndex) && newExpanded
        }
        : {
          ...entry,
          expanded: (index === headEntryIndex) && (entryIndexTail.length || newExpanded),
          entries: setExpandedInList(index === headEntryIndex ? entryIndexTail : [], newExpanded, entry.entries)
        };
    });
  }

  return (
    <div>
      <ProjectList
        darkMode={props.darkMode}
        entryIndexPath={[]}
        entries={state.entries}
        setExpanded={setExpanded}
        />
    </div>
  );
}
