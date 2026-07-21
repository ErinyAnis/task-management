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
</script>

<template>
    <div class="grid gap-5">
        <TaskCard v-for="task in tasks" :key="task.id" :task="task" @edit="emit('edit', $event)"
            @delete="emit('delete', $event)" />
    </div>
</template>