interface Project {
  _id: string;
  name: string;
}

interface SidebarProps {
  projects: Project[];
  activeProjectId: string | null;
  setActiveProjectId: (id: string) => void;
  handleCreateProject: () => void;
}

export default function Sidebar({ projects, activeProjectId, setActiveProjectId, handleCreateProject }: SidebarProps) {
  return (
    <aside className="sidebar">
      <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '40px' }}>DevTrack.</h2>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <p style={{ fontWeight: 700, color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Your Projects</p>
        
        {/* Clean styling, but keeps the z-index punch-through! */}
        <button 
          onClick={handleCreateProject} 
          type="button"
          style={{ 
            background: 'transparent', 
            border: 'none', 
            color: 'var(--text-dark)', 
            cursor: 'pointer', 
            fontSize: '1.6rem', 
            fontWeight: 'bold',
            position: 'relative', 
            zIndex: 9999,
            padding: '0 5px', // slightly wider invisible click area
            lineHeight: '1'
          }}
        >
          +
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {projects.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No projects yet.</p>
        ) : (
          projects.map(project => (
            <button
              key={project._id}
              onClick={() => setActiveProjectId(project._id)}
              style={{
                textAlign: 'left',
                padding: '10px 15px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'all 0.2s',
                background: activeProjectId === project._id ? 'var(--text-dark)' : 'transparent',
                color: activeProjectId === project._id ? '#fff' : 'var(--text-muted)'
              }}
            >
              {project.name}
            </button>
          ))
        )}
      </div>
    </aside>
  );
}