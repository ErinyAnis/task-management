<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useTaskStore } from "../stores/task";
import type { Task } from "../types/task";

import TaskForm from "../components/TaskForm.vue";
import TaskFilters from "../components/TaskFilters.vue";
import TaskList from "../components/TaskList.vue";

const taskStore = useTaskStore();

const selectedTask = ref<Task | null>(null);

const searchQuery = ref("");
const selectedStatus = ref("");

onMounted(() => {
    taskStore.fetchTasks();
});

async function handleSubmitTask(task: Omit<Task, "id">) {
    if (selectedTask.value) {
        await taskStore.updateTask({
            ...selectedTask.value,
            ...task,
        });

        selectedTask.value = null;
    } else {
        await taskStore.addTask(task);
    }
}

async function handleDeleteTask(task: Task) {
    const confirmed = window.confirm(
        `Are you sure you want to delete "${task.title}"?`
    );

    if (!confirmed) return;

    await taskStore.deleteTask(task.id);

    if (selectedTask.value?.id === task.id) {
        selectedTask.value = null;
    }
}

function handleEditTask(task: Task) {
    selectedTask.value = task;

    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

const filteredTasks = computed(() =>
    taskStore.tasks.filter((task) => {
        const matchesSearch = task.title
            .toLowerCase()
            .includes(searchQuery.value.trim().toLowerCase());

        const matchesStatus =
            !selectedStatus.value ||
            task.status === selectedStatus.value;

        return matchesSearch && matchesStatus;
    })
);
</script>

<template>
    <div class="container mx-auto max-w-5xl p-6">
        <header class="mb-10 text-center">
            <h1 class="text-4xl font-bold text-gray-900">
                📝 Task Management
            </h1>

            <p class="mt-2 text-gray-500">
                Organize, track and manage your daily tasks.
            </p>
        </header>

        <div class="mb-8">
            <TaskForm :task="selectedTask" @submit="handleSubmitTask" @cancel="selectedTask = null" />
        </div>

        <p v-if="taskStore.actionError"
            class="mb-6 rounded-lg border border-red-200 bg-red-50 p-3 text-center text-sm text-red-600">
            {{ taskStore.actionError }}
        </p>

        <div class="mb-8">
            <TaskFilters v-model:search="searchQuery" v-model:status="selectedStatus" />
        </div>

        <p class="mb-6 text-center text-sm text-gray-500">
            Showing
            <span class="font-semibold">
                {{ filteredTasks.length }}
            </span>
            of
            <span class="font-semibold">
                {{ taskStore.tasks.length }}
            </span>
            tasks
        </p>

        <div v-if="taskStore.loading" class="flex flex-col items-center py-16">
            <div class="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

            <p class="mt-4 text-gray-500">
                Loading tasks...
            </p>
        </div>

        <div v-else-if="taskStore.error" class="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
            <p class="font-medium text-red-700">
                {{ taskStore.error }}
            </p>
        </div>

        <div v-else-if="!filteredTasks.length"
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