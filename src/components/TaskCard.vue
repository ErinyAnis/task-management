<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";
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

const isOverdue = computed(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dueDate = new Date(props.task.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    return dueDate < today && props.task.status !== "Done";
});
</script>

<template>
    <article
        class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div class="flex items-start justify-between gap-4">
            <h2 class="text-xl font-semibold text-gray-900">
                {{ task.title }}
            </h2>

            <span :class="[
                statusClass,
                'shrink-0 rounded-full px-3 py-1 text-xs font-semibold',
            ]">
                {{ task.status }}
            </span>
        </div>

        <p class="mt-4 min-h-12 text-sm leading-6 text-gray-600">
            {{ task.description || "No description provided." }}
        </p>

        <div class="mt-5 rounded-lg bg-gray-50 p-3">
            <p class="text-sm text-gray-500">
                📅 Due Date
            </p>

            <div class="mt-1 flex items-center justify-between">
                <span class="font-medium text-gray-700">
                    {{ formattedDate }}
                </span>

                <span v-if="isOverdue" class="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">
                    Overdue
                </span>
            </div>
        </div>

        <div class="mt-6 flex flex-wrap justify-end gap-2">
            <RouterLink :to="`/tasks/${task.id}`"
                class="rounded-lg bg-gray-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800">
                View Details
            </RouterLink>

            <button
                class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 cursor-pointer"
                @click="emit('edit', task)">
                Edit
            </button>

            <button
                class="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 cursor-pointer"
                @click="emit('delete', task)">
                Delete
            </button>
        </div>
    </article>
</template>