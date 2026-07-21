<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import { taskSchema } from "../validation/taskSchema";

const {
    defineField,
    errors,
    handleSubmit,
} = useForm({
    validationSchema: toTypedSchema(taskSchema),
});

const [title] = defineField("title");
const [description] = defineField("description");
const [status] = defineField("status");
const [dueDate] = defineField("dueDate");

const submitForm = handleSubmit((values) => {
    console.log(values);
});

</script>

<template>
    <form @submit.prevent="submitForm" class="mb-8 rounded-lg border bg-white p-6 shadow">
        <h2 class="mb-4 text-xl font-semibold">
            Add New Task
        </h2>

        <div class="space-y-4">

            <input v-model="title" type="text" placeholder="Task title" class="w-full rounded border p-3" />
            <p class="text-sm text-red-500">
                {{ errors.title }}
            </p>

            <textarea v-model="description" placeholder="Task description" class="w-full rounded border p-3" />
            <p class="text-sm text-red-500">
                {{ errors.description }}
            </p>

            <select v-model="status" class="w-full rounded border p-3">
                <option>Pending</option>
                <option>In Progress</option>
                <option>Done</option>
            </select>
            <p class="text-sm text-red-500">
                {{ errors.status }}
            </p>

            <input v-model="dueDate" type="date" class="w-full rounded border p-3" />
            <p class="text-sm text-red-500">
                {{ errors.dueDate }}
            </p>

            <button class="rounded bg-blue-600 px-4 py-2 text-white">
                Add Task
            </button>

        </div>
    </form>
</template>