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

async function handleSubmitTask(task: Omit<Task, "id">) {
    if (selectedTask.value) {
        await taskStore.updateTask({ ...selectedTask.value, ...task });
        selectedTask.value = null;
    } else {
        await taskStore.addTask(task);
    }
}

async function handleDeleteTask(task: Task) {
    const confirmed = window.confirm(`Are you sure you want to delete "${task.title}"?`);
    if (!confirmed) return;

    await taskStore.deleteTask(task.id);
    if (selectedTask.value?.id === task.id) selectedTask.value = null;
}

function handleEditTask(task: Task) {
    selectedTask.value = task;
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

        <p v-if="taskStore.actionError" class="mb-4 text-center text-sm text-red-500">
            {{ taskStore.actionError }}
        </p>

        <TaskFilters v-model:search="search" v-model:status="status" />

        <div class="mb-6 text-center text-gray-500">
            {{ filteredTasks.length }} task{{ filteredTasks.length !== 1 ? "s" : "" }}
        </div>

        <div v-if="taskStore.loading" class="flex justify-center py-16">
            <div class="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        </div>

        <div v-else-if="taskStore.error" class="py-8 text-center text-red-500">
            {{ taskStore.error }}
        </div>

        <div v-else-if="filteredTasks.length === 0"
            class="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-10 text-center">
            <h3 class="text-lg font-semibold text-gray-700">
                No tasks found
            </h3>

            <p class="mt-2 text-gray-500">
                Try changing your search or filter, or create a new task.
            </p>
        </div>

        <TaskList v-else :tasks="filteredTasks" @edit="handleEditTask" @delete="handleDeleteTask" />
    </div>
</template>