<script setup lang="ts">
import { computed } from "vue";

const search = defineModel<string>("search", {
    default: "",
});

const status = defineModel<string>("status", {
    default: "",
});

const hasActiveFilters = computed(() => search.value !== "" || status.value !== "");

function clearFilters() {
    search.value = "";
    status.value = "";
}
</script>

<template>
    <div class="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
        <div class="relative flex-1">
            <input v-model="search" type="text" placeholder="Search by title..." aria-label="Search tasks by title"
                class="w-full rounded-lg border p-3 pr-9 focus:outline-none focus:ring-2 focus:ring-blue-500" />

            <button v-if="search" type="button" @click="search = ''" aria-label="Clear search"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                ✕
            </button>
        </div>

        <select v-model="status" aria-label="Filter by status"
            class="rounded-lg border p-3 md:w-56 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">
                All Statuses
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

        <button v-if="hasActiveFilters" type="button" @click="clearFilters"
            class="whitespace-nowrap rounded-lg px-3 py-2 text-sm text-gray-500 transition hover:bg-gray-100 hover:text-gray-700">
            Clear filters
        </button>
    </div>
</template>