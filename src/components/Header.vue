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
        fetchMoviesAndTVs() {
            this.store.listSearch = []; //azzero la lista di film e serie tv
            this.fetchMovies(); //cerco i film
            this.fetchTVs(); //cerco le serie tv
        },
        //Metodo per cercare i film
        fetchMovies() {
            //Effetto la chiamata all'API
            axios.get("https://api.themoviedb.org/3/search/movie?api_key=4cb5867956b2d28be2e1ac26f742a720", {
                //Parametri
                params: {
                    language: "it-IT", //lingua
                    query: this.search, //ricerca
                }
            })
            .then((res) => {
                const results = res.data.results; //salvo i risultati della ricerca
                //Ciclo
                for (let i = 0; i < results.length; i++) {
                    //Film
                    let movie = {
                        title: results[i].title, //titolo del film
                        original_title: results[i].original_title, //titolo originale del film 
                        original_language: results[i].original_language, //lingua originale film
                        vote_average: this.parseStars(results[i].vote_average), //voto medio del film
                        poster_path: "https://image.tmdb.org/t/p/w780" + results[i].poster_path, //percorso dell'immagine del film
                        overview: results[i].overview, //trama del film
                    };
                    this.store.listSearch.push(movie); //inserisco il film dentro la lista della ricerca
                }
                console.log(results); //stampo i risultati della ricerca
                console.log(this.store.listSearch); //stampo la lista della ricerca
            });
        },
        //Metodo per cercare le serie tv
        fetchTVs() {
            //Effettuo la chiamata all'API
            axios.get("https://api.themoviedb.org/3/search/tv?api_key=4cb5867956b2d28be2e1ac26f742a720", {
                //Parametri
                params: {
                    language: "it-IT", //lingua
                    query: this.search, //ricerca
                }
            })
            .then((res) => {
                const results = res.data.results; //salvo i risultati della ricerca
                //Ciclo
                for (let i = 0; i < results.length; i++) {
                    //Serie tv
                    let tv = {
                        title: results[i].name, //nome della serie tv
                        original_title: results[i].original_name, //nome originale della serie tv
                        original_language: results[i].original_language, //lingua originale della serie tv
                        vote_average: this.parseStars(results[i].vote_average), //voto medio della serie tv
                        poster_path: "https://image.tmdb.org/t/p/w780" + results[i].poster_path, //percorso dell'immagine della serie tv
                        overview: results[i].overview, //trama della serie tv
                    };
                    this.store.listSearch.push(tv); //inserisco la serie tv dentro la lista della ricerca
                }
                console.log(results); //stampo i risultati della ricerca
                console.log(this.store.listSearch); //stampo la lista della ricerca
            });
        },
        //Metodo per convertire il voto medio in stelle
        parseStars(vote) {
            const number = Math.ceil(vote); //arrotondo per eccesso il voto
            let stars = 0; //stelle
            //Switch
            switch (number) {
                //Se il voto è uguale ad 1
                case 1:
                    stars = 1; //il voto è una stella
                    break; //break
                //Se il voto è uguale ad 2
                case 2:
                    stars = 1; //il voto è una stella
                    break; //break
                //Se il voto è uguale ad 3
                case 3:
                    stars = 2; //il voto è due stelle
                    break; //break
                //Se il voto è uguale ad 4
                case 4:
                    stars = 2; //il voto è due stelle
                    break; //break
                //Se il voto è uguale ad 5
                case 5:
                    stars = 3; //il voto è tre stelle
                    break; //break
                //Se il voto è uguale ad 6
                case 6:
                    stars = 3; //il voto è tre stelle
                    break; //break
                //Se il voto è uguale ad 6
                case 7:
                    stars = 4; //il voto è quattro stelle
                    break; //break
                //Se il voto è uguale ad 6
                case 8:
                    stars = 4; //il voto è quattro stelle
                    break; //break
                //Se il voto è uguale ad 6
                case 9:
                    stars = 5; //il voto è cinque stelle
                    break; //break
                //Se il voto è uguale ad 6
                case 10:
                    stars = 5; //il voto è cinque stelle
                    break; //break
            }
            return stars; //restituisco il numero di stelle
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
            <input class="search__input" type="text" placeholder="Cerca un film o serie tv" v-model="search" v-on:keyup.enter="fetchMoviesAndTVs()">
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