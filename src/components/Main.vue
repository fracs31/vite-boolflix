<!-- JavaScript -->
<script>
import Card from "./Card.vue"; //importo la carta
import store from "../store.js"; //importo lo store

//Esporto
export default {
    //Componenti
    components: {
        Card, //carta
    },
    //Dati
    data() {
        return {
            store, //stpre
        }
    }
}
</script>

<!-- Template -->
<template>
    <!-- Main -->
    <main class="main-content">
        <!-- Lista -->
        <ul class="list">
            <!-- Elemento della lista -->
            <li class="list-item" v-for="(element) in store.listSearch">
                <!-- Carta -->
                <Card 
                    v-bind:poster_path="element.poster_path" 
                    v-bind:title="element.title" 
                    v-bind:original_title="element.original_title" 
                    v-bind:vote_average="element.vote_average" 
                    v-bind:overview="element.overview"
                >
                </Card>
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
        padding: 20px;
    }
    /* Lista */
    .list {
        display: flex;
        flex-wrap: wrap;
        gap: 35px 35px;
    }
    /* Elemento della lista */
    .list-item {
        flex-basis: calc((100% / 4) - (35px * (3 / 4)));
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }
</style>