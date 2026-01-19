/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { supabase } from '../supabase-client';
import { type Session } from '@supabase/supabase-js';


interface Task {
  id: number;
  title: string;
  description: string;
  created_at: string;
  image_url: string;
}


function TaskManager({ session }: { session: Session }) {
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newDescription, setNewDescription] = useState('');

  const [taskImage, setTaskImage] = useState<File | null>(null);

  const fetchTasks = async () => {
    const { error, data } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching tasks:', error.message);
    } else {
      setTasks(data);
    }
  };

  // Initial fetch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTasks();
  }, []);

  // Realtime subscriptions
  useEffect(() => {
    const channel = supabase
      .channel('tasks-channel')
      // INSERT
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'tasks' },
        (payload) => {
          const newTask = payload.new as Task;
          setTasks((prev) => [...prev, newTask]);
        }
      )
      // UPDATE
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'tasks' },
        (payload) => {
          const updatedTask = payload.new as Task;
          setTasks((prev) =>
            prev.map((task) =>
              task.id === updatedTask.id ? updatedTask : task
            )
          );
        }
      )
      // DELETE
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'tasks' },
        (payload) => {
          const deletedId = payload.old.id;
          setTasks((prev) => prev.filter((task) => task.id !== deletedId));
        }
      )
      .subscribe((status) => {
        console.log('Subscription:', status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);


  const deleteTask = async (id: number) => {
    const { error } = await supabase.from('tasks').delete().eq('id', id);

    if (error) {
      console.error('Error deleting task:', error.message);
    }
    fetchTasks();
  };

  const updateTask = async (id: number) => {
    console.log('Updating task id:', id, 'with description:', newDescription);
    const { error } = await supabase
      .from('tasks')
      .update({ description: newDescription })
      .eq('id', id);
    if (error) {
      console.error('Error updating task:', error.message);
    }
    setNewDescription('');
    fetchTasks();
  };

  const uploadImage = async (file: File) : Promise<string | null> => {
    const filePath = `${file.name}-${Date.now()}`;
    
    const {  error } = await supabase.storage
      .from('tasks-images')
      .upload(filePath, file, {
        upsert: false,
        cacheControl: '3600',
      });
  
    

    if (error) {
      console.error('Error uploading image:', error.message);
      return null;
    }

    const { data } = supabase.storage.from('tasks-images').getPublicUrl(filePath);
    
    return data.publicUrl;

  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let imageUrl: string | null = null;
    
    if (taskImage) { 
      imageUrl = await uploadImage(taskImage);
    }  

    const { error } = await supabase
      .from('tasks')
      .insert({ ...newTask, email: session.user.email || '', image_url: imageUrl })
      .single();

    if (error) {
      console.error('Error inserting task:', error.message);
      return;
    }
  
    alert('Task added successfully!');
    setNewTask({ title: '', description: '' });
    // use currentTarget which is correctly typed as HTMLFormElement
    fetchTasks();
    e.currentTarget.reset();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) { 
      setTaskImage(e.target.files[0]);
    }
  }    

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
      <h2>Task Manager CRUD</h2>

      {/* Form to add a new task */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input
          type='text'
          placeholder='Task Title'
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, title: e.target.value }))
          }
          style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
        />
        <textarea
          placeholder='Task Description'
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, description: e.target.value }))
          }
          style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
        />

        <input
          type='file'
          accept='image/*'
          onChange={handleFileChange}
          style={{
            border: '1px solid gray',
            padding: '7px',
            borderRadius: '4px',
            marginRight: '1rem',
          }}
        />

        <button type='submit' style={{ padding: '0.5rem 1rem' }}>
          Add Task
        </button>
      </form>

      <h2 style={{ marginTop: '3rem', fontSize: '2rem' }}>All Pending Tasks</h2>
      {/* List of Tasks */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((task, key) => (
          <li
            key={key}
            style={{
              border: '1px solid #bbbbbbff',
              borderRadius: '8px',
              padding: '1rem',
              margin: '1rem 0',
              backgroundColor: '#363636ff',
            }}
          >
            <div>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              {task.image_url && (
                <img src={task.image_url} style={{ height: 70 }} />
              )}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '1rem',
                  alignItems: 'center',
                }}
              >
                <textarea
                  placeholder='Updated description...'
                  onChange={(e) => setNewDescription(e.target.value)}
                />
                <button
                  onClick={() => updateTask(task.id)}
                  style={{ padding: '0.5rem 1rem', marginRight: '0.5rem' }}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  style={{ padding: '0.5rem 1rem' }}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
