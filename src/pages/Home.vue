<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useTaskStore } from "../stores/task";
import type { Task } from "../types/task";

import TaskList from "../components/TaskList.vue";
import TaskForm from "../components/TaskForm.vue";

const taskStore = useTaskStore();
const selectedTask = ref<Task | null>(null);

onMounted(() => {
    taskStore.fetchTasks();
});

function handleSubmitTask(task: Omit<Task, "id">) {
    if (selectedTask.value) {
        taskStore.updateTask({
            ...selectedTask.value,
            ...task,
        });

        selectedTask.value = null;
    } else {
        taskStore.addTask(task);
    }
}

function handleEditTask(task: Task) {
    selectedTask.value = task;
    console.log(task);
}
</script>

<template>
    <div class="container mx-auto max-w-5xl p-6">
        <h1 class="mb-8 text-center text-3xl font-bold">
            Task Management
        </h1>

        <TaskForm :task="selectedTask" @submit="handleSubmitTask" @cancel="selectedTask = null" />

        <div v-if="taskStore.loading" class="py-8 text-center">
            Loading...
        </div>

        <div v-else-if="taskStore.error" class="py-8 text-center text-red-500">
            {{ taskStore.error }}
        </div>

        <TaskList v-else :tasks="taskStore.tasks" @edit="handleEditTask" />
    </div>
</template>