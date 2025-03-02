<script setup>
import { onMounted, watch } from 'vue';
let map;
let markers = [];

const props = defineProps({
    places: Array
})

onMounted(async () => {
    await init();
});

async function init() {
    const { Map } = await google.maps.importLibrary("maps");

    map = new Map(document.getElementById('map'), {
        center: { lat: 59.334591, lng: 18.063240 },
        zoom: 12,
        mapId: "DEMO_MAP_ID",
    });
}

async function updateMarkers() {
    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");
    let collisionBehavior = google.maps.CollisionBehavior.OPTIONAL_AND_HIDES_LOWER_PRIORITY;
    markers.forEach(marker => marker.setMap(null));
    markers = [];
    markers = props.places.map((place) => {
        const pin = new PinElement({
            scale: .75,
            glyph: `${place.displayName}, ${place.rating}`,
            glyphColor: "black",
        });
        const marker = new AdvancedMarkerElement({
            position: place.location,
            title: place.displayName,
            content: pin.element,
            collisionBehavior: collisionBehavior,
            map
        })
        return marker;
    })
}

watch(() => props.places, (newVal, oldVal) => {
    if (newVal !== oldVal) {
        updateMarkers();
    }
}, { deep: true });

</script>

<template>
    <div id="map"></div>
</template>

<style scoped>
#map {
    height: 500px;
    width: 500px;
    background-color: gray;
}
</style>