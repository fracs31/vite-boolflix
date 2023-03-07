<!-- JavaScript -->
<script>
import Card from "./Card.vue"; //importo la carta

//Esporto
export default {
    //Componenti
    components: {
        Card, //carta
    }
}
</script>

<!-- Template -->
<template>
    <!-- Main -->
    <main class="main-content">
        <!-- Lista -->
        <ul class="list">
            <li class="list-item">
                <!-- Carta -->
                <Card></Card>
            </li>
        </ul>
    </main>
</template>

<!-- CSS -->
<style scoped>
    /* Main */
    .main-content {
        flex-grow: 1;
        background-color: #1E1E1E;
    }
</style>