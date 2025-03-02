<script setup>
import { ref } from "vue";
import UserInput from "@/components/UserSelect.vue";
import Map from "@/components/Map.vue";
import PlacesChart from "@/components/PlacesChart.vue";
const places = ref([]);

function updatePlaces(newPlaces) {
    places.value = newPlaces;
}

</script>

<template>
    <div>
        <Map :places="places" />
        <UserInput @update-places="updatePlaces" />
        <br />
        <PlacesChart :places="places" />
    </div>
</template>