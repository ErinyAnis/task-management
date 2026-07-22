<script setup lang="ts">
import { computed } from "vue";
import type { Task } from "../types/task";

const props = defineProps<{
    task: Task;
}>();

const emit = defineEmits<{
    edit: [task: Task];
    delete: [task: Task];
}>();

const statusClass = computed(() => {
    switch (props.task.status) {
        case "Pending":
            return "bg-yellow-100 text-yellow-800";

        case "In Progress":
            return "bg-blue-100 text-blue-800";

        case "Done":
            return "bg-green-100 text-green-800";

        default:
            return "bg-gray-100 text-gray-700";
    }
});

const formattedDate = computed(() => {
    return new Date(props.task.dueDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
});
</script>

<template>
    <div class="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
        <div class="flex items-start justify-between">
            <h2 class="text-lg font-semibold">
                {{ task.title }}
            </h2>

            <span :class="[
                'rounded-full px-3 py-1 text-sm font-medium',
                statusClass
            ]">
                {{ task.status }}
            </span>
        </div>

        <p class="mt-3 text-gray-600">
            {{ task.description || "No description provided." }}
        </p>

        <p class="mt-4 text-sm text-gray-500">
            Due:
            {{ formattedDate }}
        </p>
        <div class="mt-5 flex justify-end gap-3">

            <button @click="emit('edit', task)"
                class="rounded bg-blue-500 px-3 py-2 text-sm text-white transition hover:bg-blue-600">
                Edit
            </button>

            <button @click="emit('delete', task)"
                class="rounded bg-red-500 px-3 py-2 text-sm text-white transition hover:bg-red-600">
                Delete
            </button>

        </div>

        <RouterLink :to="`/tasks/${task.id}`"
            class="rounded bg-gray-700 px-3 py-2 text-sm text-white hover:bg-gray-800">
            View Details
        </RouterLink>
    </div>

</template>