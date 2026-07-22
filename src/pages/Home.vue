<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { useTaskStore } from "../stores/task";
import type { Task } from "../types/task";

import TaskList from "../components/TaskList.vue";
import TaskForm from "../components/TaskForm.vue";
import TaskFilters from "../components/TaskFilters.vue";

const taskStore = useTaskStore();
const selectedTask = ref<Task | null>(null);
const search = ref("");
const status = ref("");

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
}

function handleDeleteTask(task: Task) {
    const confirmed = window.confirm(
        `Are you sure you want to delete "${task.title}"?`
    );

    if (!confirmed) return;

    taskStore.deleteTask(task.id);

    if (selectedTask.value?.id === task.id) {
        selectedTask.value = null;
    }
}

const filteredTasks = computed(() => {
    return taskStore.tasks.filter((task) => {
        const matchesSearch =
            task.title
                .toLowerCase()
                .includes(search.value.trim().toLowerCase());

        const matchesStatus =
            !status.value ||
            task.status === status.value;

        return matchesSearch && matchesStatus;
    });
});
</script>

<template>
    <div class="container mx-auto max-w-5xl p-6">
        <h1 class="mb-8 text-center text-3xl font-bold">
            Task Management
        </h1>



        <TaskForm :task="selectedTask" @submit="handleSubmitTask" @cancel="selectedTask = null" />

        <TaskFilters v-model:search="search" v-model:status="status" />

        <div v-if="taskStore.loading" class="py-8 text-center">
            Loading...
        </div>

        <div v-else-if="taskStore.error" class="py-8 text-center text-red-500">
            {{ taskStore.error }}
        </div>

        <div v-else-if="filteredTasks.length === 0"
            class="rounded-lg border border-dashed p-8 text-center text-gray-500">
            No tasks found.
        </div>

        <TaskList v-else :tasks="filteredTasks" @edit="handleEditTask" @delete="handleDeleteTask" />
    </div>
</template>