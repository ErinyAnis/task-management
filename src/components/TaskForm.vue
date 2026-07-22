<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import { taskSchema } from "../validation/taskSchema";
import type { Task } from "../types/task";
import { watch } from "vue";
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
    {
        immediate: true,
    }
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
    <form @submit.prevent="submitForm" class="mb-8 rounded-lg border bg-white p-6 shadow">
        <h2 class="mb-4 text-xl font-semibold">
            {{ task ? "Edit Task" : "Add New Task" }}
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
                <option value="">Select status (optional)</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
            </select>
            <p class="text-sm text-red-500">
                {{ errors.status }}
            </p>

            <input v-model="dueDate" type="date" class="w-full rounded border p-3" />
            <p class="text-sm text-red-500">
                {{ errors.dueDate }}
            </p>

            <div class="mt-4 flex gap-3">
                <button :disabled="taskStore.actionLoading"
                    class="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50">
                    {{ taskStore.actionLoading ? "Saving..." : (task ? "Save Changes" : "Add Task") }}
                </button>

                <button v-if="task" type="button" @click="emit('cancel')"
                    class="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600">
                    Cancel
                </button>
            </div>
        </div>
    </form>
</template>