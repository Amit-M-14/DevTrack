import { motion } from 'framer-motion';

// FIXED: Added projectId to exactly match App.tsx
interface Task {
  _id: string;
  title: string;
  summary: string;
  status: string;
  projectId: string; 
}

interface TaskCardProps {
  task: Task;
  index: number;
  advanceTask: (task: Task) => void;
  deleteTask: (id: string) => void;
}

export default function TaskCard({ task, index, advanceTask, deleteTask }: TaskCardProps) {
  const getStatusClass = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'done') return 'status-done';
    if (s === 'in progress') return 'status-in-progress';
    return 'status-todo';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="card-3d"
    >
      <h2 className="task-title">{task.title}</h2>
      <p className="task-summary">{task.summary}</p>
      
      <div style={{ marginTop: 'auto', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className={`status-badge ${getStatusClass(task.status)}`}>
          {task.status}
        </span>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          {task.status !== 'Done' && (
            <button onClick={() => advanceTask(task)} className="btn-secondary">
              Advance
            </button>
          )}
          <button onClick={() => deleteTask(task._id)} className="btn-secondary" style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
}