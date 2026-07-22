<script setup lang="ts">
import { watch } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";

import { taskSchema } from "../validation/taskSchema";
import type { Task } from "../types/task";
import { useTaskStore } from "../stores/task";

const taskStore = useTaskStore();

const emit = defineEmits<{
    submit: [task: Omit<Task, "id">];
    cancel: [];
}>();

const props = defineProps<{
    task?: Task | null;
}>();

const {
    defineField,
    errors,
    handleSubmit,
    resetForm,
    setValues,
} = useForm({
    validationSchema: toTypedSchema(taskSchema),
});

watch(
    () => props.task,
    (task) => {
        if (!task) {
            resetForm();
            return;
        }

        setValues({
            title: task.title,
            description: task.description ?? "",
            status: task.status ?? "Pending",
            dueDate: task.dueDate,
        });
    },
    { immediate: true }
);

const [title] = defineField("title");
const [description] = defineField("description");
const [status] = defineField("status");
const [dueDate] = defineField("dueDate");

const submitForm = handleSubmit((values) => {
    emit("submit", {
        ...values,
        description: values.description ?? "",
        status: values.status ?? "Pending",
    });

    resetForm();
});
</script>

<template>
    <form @submit.prevent="submitForm" class="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 class="mb-6 text-2xl font-bold text-gray-800">
            {{ task ? "Edit Task" : "Add New Task" }}
        </h2>

        <div class="space-y-5">
            <!-- Title -->
            <div>
                <label for="title" class="mb-2 block text-sm font-medium text-gray-700">
                    Task Title <span class="text-red-500">*</span>
                </label>

                <input id="title" v-model="title" type="text" placeholder="Enter task title" :class="[
                    'w-full rounded-lg border p-3 outline-none transition focus:ring-2',
                    errors.title
                        ? 'border-red-500 focus:ring-red-200'
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                ]" />

                <p v-if="errors.title" class="mt-1 text-sm text-red-500">
                    {{ errors.title }}
                </p>
            </div>

            <!-- Description -->
            <div>
                <label for="description" class="mb-2 block text-sm font-medium text-gray-700">
                    Description
                </label>

                <textarea id="description" v-model="description" rows="4" placeholder="Enter task description" :class="[
                    'w-full resize-none rounded-lg border p-3 outline-none transition focus:ring-2',
                    errors.description
                        ? 'border-red-500 focus:ring-red-200'
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                ]" />

                <p v-if="errors.description" class="mt-1 text-sm text-red-500">
                    {{ errors.description }}
                </p>
            </div>

            <!-- Status -->
            <div>
                <label for="status" class="mb-2 block text-sm font-medium text-gray-700">
                    Status
                </label>

                <select id="status" v-model="status" :class="[
                    'w-full rounded-lg border p-3 outline-none transition focus:ring-2',
                    errors.status
                        ? 'border-red-500 focus:ring-red-200'
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                ]">
                    <option value="">
                        Select status (optional)
                    </option>

                    <option value="Pending">
                        Pending
                    </option>

                    <option value="In Progress">
                        In Progress
                    </option>

                    <option value="Done">
                        Done
                    </option>
                </select>

                <p v-if="errors.status" class="mt-1 text-sm text-red-500">
                    {{ errors.status }}
                </p>
            </div>

            <!-- Due Date -->
            <div>
                <label for="dueDate" class="mb-2 block text-sm font-medium text-gray-700">
                    Due Date <span class="text-red-500">*</span>
                </label>

                <input id="dueDate" v-model="dueDate" type="date" :class="[
                    'w-full rounded-lg border p-3 outline-none transition focus:ring-2',
                    errors.dueDate
                        ? 'border-red-500 focus:ring-red-200'
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                ]" />

                <p v-if="errors.dueDate" class="mt-1 text-sm text-red-500">
                    {{ errors.dueDate }}
                </p>
            </div>

            <div class="flex flex-wrap gap-3 pt-2">
                <button :disabled="taskStore.actionLoading"
                    class="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer">
                    {{
                        taskStore.actionLoading
                            ? "Saving..."
                            : task
                                ? "Save Changes"
                                : "Add Task"
                    }}
                </button>

                <button v-if="task" type="button" @click="emit('cancel')"
                    class="rounded-lg border border-gray-300 bg-white px-5 py-2.5 font-medium text-gray-700 transition hover:bg-gray-100 cursor-pointer">
                    Cancel
                </button>
            </div>
        </div>
    </form>
</template>