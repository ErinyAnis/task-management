<script setup lang="ts">
import { computed } from "vue";

const search = defineModel<string>("search", {
    default: "",
});

const status = defineModel<string>("status", {
    default: "",
});

const hasActiveFilters = computed(
    () => search.value !== "" || status.value !== ""
);

function clearFilters() {
    search.value = "";
    status.value = "";
}
</script>

<template>
    <div class="mb-8 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 class="mb-5 text-lg font-semibold text-gray-800">
            Filter Tasks
        </h2>

        <div class="grid gap-5 md:grid-cols-[1fr_220px_auto]">

            <!-- Search -->
            <div>
                <label for="search" class="mb-2 block text-sm font-medium text-gray-700">
                    Search
                </label>

                <div class="relative">
                    <input id="search" v-model="search" type="text" placeholder="Search by title..."
                        class="w-full rounded-lg border border-gray-300 p-3 pr-10 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />

                    <button v-if="search" type="button" @click="search = ''"
                        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700">
                        ✕
                    </button>
                </div>
            </div>

            <!-- Status -->
            <div>
                <label for="status" class="mb-2 block text-sm font-medium text-gray-700">
                    Status
                </label>

                <select id="status" v-model="status"
                    class="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
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
            </div>

            <!-- Clear -->
            <div class="flex items-end">
                <button v-if="hasActiveFilters" type="button" @click="clearFilters"
                    class="w-full rounded-lg border border-gray-300 bg-white px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-100 md:w-auto">
                    Clear
                </button>
            </div>

        </div>
    </div>
</template>