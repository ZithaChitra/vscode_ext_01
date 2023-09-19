<script setup>

import { defineProps } from 'vue'


let props = defineProps(['title', 'data', 'onEdit', 'onAdd']);

</script>



<template>
    <div class="border rounded-md">
        <div class="md:grid grid-cols-12 p-2 pb-0 gap-4 ">
            <div class="col-span-6">
                <div class="flex justify-between border-b p-1">
                    <h3>{{ props.title ?? 'List Title' }}</h3>
                    <button @click="onAdd"
                        class="bg-primary text-black px-2 rounded hover:bg-white">Create New</button>
                </div>
            </div>
        </div>
        <div class="md:grid grid-cols-12 p-2 gap-4">
            <!-- list col -->
            <div class="col-span-6">
                <ul v-if="data">
                    <li v-for="(item, index) in data" :key="item.id">
                        <div
                            class="flex justify-between">
                            <p>{{ item.title }}</p>
                            <button @click="onEdit(item.id)">Edit</button>
                        </div>
                    </li>
                </ul>
            </div>

            <!-- action column -->
            <div class="col-span-6">
                <slot name="action"></slot>
            </div>
        </div>
    </div>
</template>