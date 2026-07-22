<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useTaskStore } from "../stores/task";


const route = useRoute();
const taskStore = useTaskStore();

const task = computed(() =>
    taskStore.getTaskById(Number(route.params.id))
);
</script>

<template>
    <div class="container mx-auto max-w-5xl p-6">
        <h1 class="mb-8 text-center text-3xl font-bold">
            Task Details
        </h1>

    </div>
</template>