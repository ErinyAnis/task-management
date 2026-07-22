<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useTaskStore } from "../stores/task";

const route = useRoute();
const taskStore = useTaskStore();

const task = computed(() =>
    taskStore.getTaskById(Number(route.params.id))
);

onMounted(async () => {
    if (!taskStore.tasks.length) {
        await taskStore.fetchTasks();
    }
});
</script>

<template>
    <div class="container mx-auto max-w-5xl p-6">
        <div v-if="!task" class="py-10 text-center text-red-500">
            Task not found.
        </div>

        <div v-else class="space-y-6 rounded-xl bg-white p-6 shadow">
            <h1 class="text-3xl font-bold">
                {{ task.title }}
            </h1>

            <div>
                <h2 class="font-semibold text-gray-700">
                    Description
                </h2>

                <p class="mt-2 text-gray-600">
                    {{ task.description || "No description provided." }}
                </p>
            </div>

            <div>
                <h2 class="font-semibold text-gray-700">
                    Status
                </h2>

                <p class="mt-2">
                    {{ task.status }}
                </p>
            </div>

            <div>
                <h2 class="font-semibold text-gray-700">
                    Due Date
                </h2>

                <p class="mt-2">
                    {{ task.dueDate }}
                </p>
            </div>
        </div>
    </div>
</template>