<script setup lang="ts">
import type { Task } from "../types/task";
import TaskCard from "./TaskCard.vue";

defineProps<{
    tasks: Task[];
}>();

const emit = defineEmits<{
    edit: [task: Task];
    delete: [task: Task];
}>();

function handleEdit(task: Task) {
    emit("edit", task);
}

function handleDelete(task: Task) {
    emit("delete", task);
}
</script>

<template>
    <TransitionGroup name="task" tag="div" class="grid gap-6 md:grid-cols-2">
        <TaskCard v-for="task in tasks" :key="task.id" :task="task" @edit="handleEdit" @delete="handleDelete" />
    </TransitionGroup>
</template>

<style scoped>
.task-enter-active,
.task-leave-active {
    transition: all 0.25s ease;
}

.task-enter-from,
.task-leave-to {
    opacity: 0;
    transform: translateY(12px);
}

.task-move {
    transition: transform 0.25s ease;
}
</style>