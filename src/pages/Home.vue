<script setup lang="ts">
import { onMounted } from "vue";
import { useTaskStore } from "../stores/task";

import TaskList from "../components/TaskList.vue";

const taskStore = useTaskStore();

onMounted(() => {
    taskStore.fetchTasks();
});
</script>

<template>
    <div class="container mx-auto p-6">
        <h1 class="mb-6 text-3xl font-bold">
            Task Management
        </h1>

        <div v-if="taskStore.loading">
            Loading...
        </div>

        <div v-else-if="taskStore.error" class="text-red-500">
            {{ taskStore.error }}
        </div>

        <TaskList v-else :tasks="taskStore.tasks" />
    </div>
</template>