<script setup lang="ts">
import { ref } from "vue";
import type { TaskStatus } from "../types/task";

const title = ref("");
const description = ref("");
const status = ref<TaskStatus>("Pending");
const dueDate = ref("");

function submitForm() {
    console.log({
        title: title.value,
        description: description.value,
        status: status.value,
        dueDate: dueDate.value,
    });
}
</script>

<template>
    <form @submit.prevent="submitForm" class="mb-8 rounded-lg border bg-white p-6 shadow">
        <h2 class="mb-4 text-xl font-semibold">
            Add New Task
        </h2>

        <div class="space-y-4">

            <input v-model="title" type="text" placeholder="Task title" class="w-full rounded border p-3" />

            <textarea v-model="description" placeholder="Task description" class="w-full rounded border p-3" />

            <select v-model="status" class="w-full rounded border p-3">
                <option>Pending</option>
                <option>In Progress</option>
                <option>Done</option>
            </select>

            <input v-model="dueDate" type="date" class="w-full rounded border p-3" />

            <button class="rounded bg-blue-600 px-4 py-2 text-white">
                Add Task
            </button>

        </div>
    </form>
</template>