import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import TaskCard from './components/TaskCard';
import './index.css';

interface Project { _id: string; name: string; }
interface Task { _id: string; title: string; summary: string; status: string; projectId: string; }

export default function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  // --- NEW MODAL STATE VARIABLES ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  const fetchProjects = async () => {
    const res = await axios.get('http://localhost:5001/api/projects');
    setProjects(res.data);
    if (res.data.length > 0 && !activeProjectId) setActiveProjectId(res.data[0]._id);
  };

  const fetchTasks = async () => {
    if (!activeProjectId) return;
    const res = await axios.get(`http://localhost:5001/api/projects/${activeProjectId}/tasks`);
    setTasks(res.data);
  };

  useEffect(() => { fetchProjects(); }, []);
  useEffect(() => { fetchTasks(); }, [activeProjectId]);

  // --- UPDATED MODAL TRIGGER ---
  const handleCreateProject = () => {
    setIsModalOpen(true);
  };

  // --- NEW SUBMISSION LOGIC ---
  const submitNewProject = async () => {
    if (!newProjectName.trim()) return;
    try {
      const res = await axios.post('http://localhost:5001/api/projects', { name: newProjectName });
      setProjects([...projects, res.data]);
      setActiveProjectId(res.data._id);
      setIsModalOpen(false); // Close the modal
      setNewProjectName(''); // Clear the input
    } catch (err) {
      console.error("Error creating project:", err);
    }
  };

  const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!activeProjectId) return alert("Please select or create a project first!");
    const formData = new FormData(e.currentTarget);
    await axios.post('http://localhost:5001/api/tasks', {
      title: formData.get('title'),
      summary: formData.get('summary'),
      status: 'To Do',
      projectId: activeProjectId
    });
    fetchTasks();
    e.currentTarget.reset();
  };

  const advanceTask = async (task: Task) => {
    const nextStatus = task.status === 'To Do' ? 'In Progress' : 'Done';
    await axios.patch(`http://localhost:5001/api/tasks/${task._id}`, { status: nextStatus });
    fetchTasks();
  };

  const deleteTask = async (id: string) => {
    await axios.delete(`http://localhost:5001/api/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="app-container">
      {/* Imported Component! */}
      <Sidebar 
        projects={projects} 
        activeProjectId={activeProjectId} 
        setActiveProjectId={setActiveProjectId} 
        handleCreateProject={handleCreateProject} 
      />

      <main className="main-content">
        <header className="header">
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>
              {projects.find(p => p._id === activeProjectId)?.name || "Select a Project"}
            </h1>
            <p style={{ color: 'var(--text-muted)', marginTop: '5px' }}>Manage your sprint effectively.</p>
          </div>
          
          <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input type="text" name="title" placeholder="New Task Title..." required className="input-field" style={{ marginBottom: 0, width: '200px' }} />
            <input type="text" name="summary" placeholder="Summary..." required className="input-field" style={{ marginBottom: 0, width: '200px' }} />
            <button type="submit" className="btn-primary">Add Task</button>
          </form>
        </header>

        <div className="task-grid">
          {tasks.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>No tasks found for this project. Add one above!</p>
          ) : (
            tasks.map((task, index) => (
              /* Imported Component! */
              <TaskCard 
                key={task._id} 
                task={task} 
                index={index} 
                advanceTask={advanceTask} 
                deleteTask={deleteTask} 
              />
            ))
          )}
        </div>
      </main>

      {/* --- CUSTOM REACT MODAL --- */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Create New Project</h3>
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="e.g., Alpha Phase"
              autoFocus
            />
            <div className="modal-actions">
              <button 
                className="btn-cancel" 
                onClick={() => {
                  setIsModalOpen(false);
                  setNewProjectName('');
                }}
              >
                Cancel
              </button>
              <button className="btn-submit" onClick={submitNewProject}>
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}