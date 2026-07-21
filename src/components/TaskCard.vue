<script setup lang="ts">
import type { Task } from "../types/task";

defineProps<{
    task: Task;
}>();
</script>

<template>
    <div class="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
        <div class="flex items-start justify-between">
            <h2 class="text-lg font-semibold">
                {{ task.title }}
            </h2>

            <span class="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium">
                {{ task.status }}
            </span>
        </div>

        <p class="mt-3 text-gray-600">
            {{ task.description }}
        </p>

        <p class="mt-4 text-sm text-gray-500">
            Due:
            {{ task.dueDate }}
        </p>
    </div>
</template>