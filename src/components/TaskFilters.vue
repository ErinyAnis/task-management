<script setup lang="ts">
const search = defineModel<string>("search", {
    default: "",
});

const status = defineModel<string>("status", {
    default: "",
});
</script>

<template>
    <div class="mb-6 flex flex-col gap-4 md:flex-row">
        <input v-model="search" type="text" placeholder="Search by title..." class="flex-1 rounded-lg border p-3" />

        <select v-model="status" class="rounded-lg border p-3 md:w-56">
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
</template>