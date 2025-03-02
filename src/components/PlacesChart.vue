<script setup>
import { watch, ref } from 'vue';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const props = defineProps({
    places: Array
})

const chart = ref(null);

function createChart() {
    const ctx = document.getElementById('placesChart').getContext('2d');
    if (chart.value) chart.value.destroy();
    chart.value = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: props.places.map(place => place.displayName),
            datasets: [{
                label: 'Rating',
                data: props.places.map(place => place.rating),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

watch(() => props.places, (oldValue, newValue) => {
    if (oldValue !== newValue) {
        createChart();
    }
}, { deep: true });

</script>

<template>
    <canvas id="placesChart"></canvas>
</template>

<style scoped>
#placesChart {
    max-height: 300px;
}
</style>