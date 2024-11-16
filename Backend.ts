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
  // ... implementação da rota PUT
});

app.delete('/tasks/:id', (req, res) => {
  // ... implementação da rota DELETE
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});