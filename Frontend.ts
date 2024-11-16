<template>
  <div>
    <input type="text" v-model="newTaskTitle" @keyup.enter="createTask" />
    <ul>
      <li v-for="task in tasks" :key="task.id">
        {{ task.title }}
        <button @click="toggleComplete(task)">Done</button>
        <button @click="deleteTask(task)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const newTaskTitle = ref('');
const tasks = ref([]);

const fetchData = async () => {
  const response = await axios.get('/tasks');
  tasks.value = response.data;
};

const createTask = async () => {
  const { data } = await axios.post('/tasks', { title: newTaskTitle.value });
  tasks.value.push(data);
  newTaskTitle.value = '';
};

const updateTask = async (task) => {
  const response = await axios.put(`/tasks/${task.id}`, task);
  // Atualiza o estado local (opcional)
};

const deleteTask = async (task) => {
  await axios.delete(`/tasks/${task.id}`);
  tasks.value = tasks.value.filter(t => t.id !== task.id);
};

onMounted(() => {
  fetchData();
});
</script>