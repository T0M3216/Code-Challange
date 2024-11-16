// backend/index.ts
import express from 'express';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const tasks: Task[] = [];
let idCounter = 1;

const app = express();
app.use(express.json());

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  const newTask: Task = { id: idCounter++, title, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const taskIndex = tasks.findIndex(task => task.id === +id);
  if (taskIndex === -1) return res.status(404).json({ error: 'Task not found' });
  tasks[taskIndex] = { ...tasks[taskIndex], title, completed };
  res.json(tasks[taskIndex]);
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(task => task.id === +id);
  if (taskIndex === -1) return res.status(404).json({ error: 'Task not found' });
  tasks.splice(taskIndex, 1);
  res.sendStatus(204);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});