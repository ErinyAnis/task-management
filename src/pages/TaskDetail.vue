<script setup lang="ts">
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

const isOverdue = computed(() => {
    if (!task.value || task.value.status === "Done") return false;

    const due = new Date(task.value.dueDate);
    due.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return due < today;
});

const formattedDate = computed(() => {
    if (!task.value) return "";

    return new Date(task.value.dueDate).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
});

function handleEdit() {
    if (!task.value) return;

    router.push({ path: "/", query: { edit: String(task.value.id) } });
}

async function handleDelete() {
    if (!task.value) return;

    const confirmed = window.confirm(
        `Are you sure you want to delete "${task.value.title}"?`
    );

    if (!confirmed) return;

    await taskStore.deleteTask(task.value.id);
    router.push("/");
}
</script>

<template>
    <div class="container mx-auto max-w-5xl p-6">
        <button @click="router.back()"
            class="mb-6 flex items-center gap-2 rounded-lg border px-4 py-2 text-gray-700 transition hover:bg-gray-100">
            ← Back
        </button>

        <div v-if="taskStore.loading" class="flex justify-center py-16">
            <div class="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        </div>

        <div v-else-if="!task" class="py-10 text-center text-red-500">
            Task not found.
        </div>

        <div v-else class="rounded-xl bg-white p-8 shadow">

            <div class="mb-8 flex items-start justify-between">
                <div>
                    <h1 class="text-3xl font-bold">
                        {{ task.title }}
                    </h1>

                    <p class="mt-1 text-sm text-gray-300">
                        Task #{{ task.id }}
                    </p>
                </div>

                <div class="flex gap-3">
                    <button @click="handleEdit"
                        class="rounded bg-blue-500 px-3 py-2 text-sm text-white transition hover:bg-blue-600">
                        Edit
                    </button>

                    <button @click="handleDelete" :disabled="taskStore.actionLoading"
                        class="rounded bg-red-500 px-3 py-2 text-sm text-white transition hover:bg-red-600 disabled:opacity-50">
                        Delete
                    </button>
                </div>
            </div>

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

                    <p :class="isOverdue ? 'font-medium text-red-500' : 'text-gray-600'">
                        {{ formattedDate }}
                        <span v-if="isOverdue"
                            class="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                            Overdue
                        </span>
                    </p>
                </div>

            </div>

        </div>
    </div>
</template>