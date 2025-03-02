<script setup>
import { usePlaces } from '@/composables/usePlaces';
import { ref } from 'vue';

const error = ref(null);
const selected = ref('');
const places = ref([]);

async function handleSelect() {
    error.value = null;
    try {
        const result = await usePlaces(selected.value);
        places.value = result;
        emit('update-places', places.value);
    } catch (e) {
        places.value = [];
        error.value = "Failed to fetch places. Please try again.";
    }
}

const emit = defineEmits(['update-places']);
</script>

<template>
    <div v-if="places.length === 0 && !error">
        <p>What do you want to find?</p>
    </div>
    <div v-else="places.length > 0">
        <p>Found {{ places.length }} places.</p>
    </div>
    <select v-model="selected" @change="handleSelect">
        <option value="" disabled>Select</option>
        <option value="restaurant">Restaurants</option>
        <option value="bar">Bars</option>
        <option value="cafe">Cafes</option>
        <option value="bakery">Bakeries</option>
        <option value="gym">Gyms</option>
        <option value="hair_care">Hair salons</option>
        <option value="park">Parks</option>
    </select>
    <!-- <div>
        <div v-if="places.length > 0">
            <div v-for="place in places" :key="place.id">
                <p>{{ place.displayName }}</p>
            </div>
        </div>
        <div v-if="error">{{ error }}</div>
    </div> -->
</template>
