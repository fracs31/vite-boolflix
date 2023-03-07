<!-- JavaScript -->
<script>
import axios from "axios"; //importo axios
import store from "../store.js"; //importo lo store
//Esporto
export default {
    //Dati
    data() {
        return {
            search: "", //ricerca
            store, //store
        }
    },
    //Metodi
    methods: {
        //Metodo per cercare sia i film sia le serie tv 
        fetchMoviesAndTV() {
            this.store.listSearch = []; //azzero la lista di film e serie tv
            this.fetchMovies(); //cerco i film
            this.fetchTV(); //cerco le serie tv
        },
        //Metodo per cercare i film
        fetchMovies() {
            //Effetto la chiamata all'API
            axios.get("https://api.themoviedb.org/3/search/movie?api_key=4cb5867956b2d28be2e1ac26f742a720", {
                //Parametri
                params: {
                    query: this.search, //ricerca
                }
            })
            .then((res) => {
                const results = res.data.results; //salvo i risultati della ricerca
                //Ciclo
                for (let i = 0; i < results.length; i++) {
                    //Film
                    let movie = {
                        title: results[i].title,
                        original_title: results[i].original_title, 
                        original_language: results[i].original_language, 
                        vote_average: results[i].vote_average,
                    };
                    this.store.listSearch.push(movie); //inserisco il film dentro la lista della ricerca
                }
                console.log(results); //stampo i risultati della ricerca
                console.log(this.store.listSearch); //stampo la lista della ricerca
            });
        },
        //Metodo per cercare le serie tv
        fetchTV() {
            //Effettuo la chiamata all'API
            axios.get("https://api.themoviedb.org/3/search/tv?api_key=4cb5867956b2d28be2e1ac26f742a720", {
                //Parametri
                params: {
                    query: this.search, //ricerca
                }
            })
            .then((res) => {
                const results = res.data.results; //salvo i risultati della ricerca
                //Ciclo
                for (let i = 0; i < results.length; i++) {
                    //Serie tv
                    let tv = {
                        name: results[i].name,
                        original_name: results[i].original_name, 
                        original_language: results[i].original_language, 
                        vote_average: results[i].vote_average,
                    };
                    this.store.listSearch.push(tv); //inserisco la serie tv dentro la lista della ricerca
                }
                console.log(results); //stampo i risultati della ricerca
                console.log(this.store.listSearch); //stampo la lista della ricerca
            });
        }
    }
}
</script>

<!-- Template -->
<template>
    <!-- Header -->
    <header class="main-header">
        <!-- Logo -->
        <div class="logo">
            <!-- Immagine -->
            <img class="logo__img" src="../assets/img/logo.png" alt="Logo">
        </div>
        <!-- Barra di ricerca -->
        <div class="search">
            <!-- Input -->
            <input class="search__input" type="text" placeholder="Cerca un film o serie tv" v-model="search" v-on:keyup.enter="fetchMoviesAndTV()">
        </div>
    </header>
</template>

<!-- CSS -->
<style scoped>
    /* Header */
    .main-header {
        flex-shrink: 0;
        background-color: black;
        height: 100px;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    /* Immagine usata come logo */
    .logo__img {
        width: 150px;
        object-fit: cover;
    }
    /* Input */
    .search__input {
        font-size: 16px;
        width: 400px;
        height: 40px;
        padding: 0px 10px;
    }
</style>