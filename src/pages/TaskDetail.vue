<script setup>
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTaskStore } from "../stores/task";

const route = useRoute();
const router = useRouter();
const taskStore = useTaskStore();

const task = computed(() =>
    taskStore.getTaskById(Number(route.params.id))
);

onMounted(async () => {
    if (!taskStore.tasks.length) {
        await taskStore.fetchTasks();
    }
});

const statusClass = computed(() => {
    switch (task.value?.status) {
        case "Pending":
            return "bg-yellow-100 text-yellow-800";

        case "In Progress":
            return "bg-blue-100 text-blue-800";

        case "Done":
            return "bg-green-100 text-green-800";

        default:
            return "bg-gray-100 text-gray-800";
    }
});

const formattedDate = computed(() => {
    if (!task.value) return "";

    return new Date(task.value.dueDate).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
});
</script>

<template>
    <div class="container mx-auto max-w-5xl p-6">
        <button @click="router.back()"
            class="mb-6 flex items-center gap-2 rounded-lg border px-4 py-2 text-gray-700 transition hover:bg-gray-100 cursor-pointer">
            ← Back
        </button>
        <div v-if="!task" class="py-10 text-center text-red-500">
            Task not found.
        </div>

        <div v-else class="rounded-xl bg-white p-8 shadow">

            <h1 class="mb-8 text-3xl font-bold">
                {{ task.title }}
            </h1>

            <p class="mb-6 text-sm text-gray-400">
                Task #{{ task.id }}
            </p>

            <div class="space-y-6">

                <div>
                    <h2 class="mb-2 font-semibold text-gray-700">
                        Description
                    </h2>

                    <p class="text-gray-600">
                        {{ task.description || "No description provided." }}
                    </p>
                </div>

                <div>
                    <h2 class="mb-2 font-semibold text-gray-700">
                        Status
                    </h2>

                    <span :class="[
                        statusClass,
                        'inline-block rounded-full px-3 py-1 text-sm font-medium'
                    ]">
                        {{ task.status }}
                    </span>
                </div>

                <div>
                    <h2 class="mb-2 font-semibold text-gray-700">
                        Due Date
                    </h2>

                    <p class="text-gray-600">
                        {{ formattedDate }}
                    </p>
                </div>

            </div>

        </div>
    </div>
</template>