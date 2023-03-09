o<!-- JavaScript -->
<script>
import axios from "axios"; //importo axios
import store from "../store.js"; //importo lo store
//Esporto
export default {
    //Dati
    data() {
        return {
            search: "", //ricerca
            genre: "", //genere
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
                        media_type: "movie", //tipo di contenuto
                        title: results[i].title, //titolo del film
                        original_title: results[i].original_title, //titolo originale del film 
                        original_language: results[i].original_language, //lingua originale film
                        vote_average: this.parseStars(results[i].vote_average), //voto medio del film
                        poster_path: "https://image.tmdb.org/t/p/w780" + results[i].poster_path, //percorso dell'immagine del film
                        overview: results[i].overview, //trama del film
                        genre_ids: this.parseGenreFromIdToName([...results[i].genre_ids], "movie"), //id dei generi
                        id: results[i].id, //id del film
                        cast: [], //cast
                    };
                    this.store.listSearch.push(movie); //inserisco il film dentro la lista della ricerca
                }
                //Ciclo
                for (let i = 0; i < this.store.listSearch.length; i++) {
                    //Se il contentuto della lista è un film
                    if (this.store.listSearch[i].media_type == "movie") {
                        this.fetchCastMovie(this.store.listSearch[i].id); //cerco il cast del film
                    }
                }
                console.log("Results: ", results); //stampo i risultati della ricerca
                console.log("Lista: ", this.store.listSearch); //stampo la lista della ricerca
                //Se il filtro non è vuoto
                if (this.genre != "") {
                    this.filterByGenre(); //filtro gli elementi della ricerca
                }
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
                        media_type: "tv", //tipo di contenuto
                        title: results[i].name, //nome della serie tv
                        original_title: results[i].original_name, //nome originale della serie tv
                        original_language: results[i].original_language, //lingua originale della serie tv
                        vote_average: this.parseStars(results[i].vote_average), //voto medio della serie tv
                        poster_path: "https://image.tmdb.org/t/p/w780" + results[i].poster_path, //percorso dell'immagine della serie tv
                        overview: results[i].overview, //trama della serie tv
                        genre_ids: this.parseGenreFromIdToName([...results[i].genre_ids], "tv"), //id dei generi
                        id: results[i].id, //id del film
                        cast: [], //cast
                    };
                    this.store.listSearch.push(tv); //inserisco la serie tv dentro la lista della ricerca
                }
                //Ciclo
                for (let i = 0; i < this.store.listSearch.length; i++) {
                    //Se il contenuto della lista è una serie tv
                    if (this.store.listSearch[i].media_type == "tv") {
                        this.fetchCastTV(this.store.listSearch[i].id); //cerco il cast del film
                    }
                }
                console.log("Results: ", results); //stampo i risultati della ricerca
                console.log("Lista: ", this.store.listSearch); //stampo la lista della ricerca
                //Se il filtro non è vuoto
                if (this.genre != "") {
                    this.filterByGenre(); //filtro gli elementi della ricerca
                }
            });
        },
        //Metodo per ottenere i generi dei film e delle serie tv
        fetchGenres() {
            this.fetchGenresMovies(); //cerco i generi dei film
            this.fetchGenresTVs(); //cerco i generi delle serie tv
            console.log("Generi: ", this.store.listGenres); //stampo la lista dei generi
        },
        //Metodo per ottenere i generi dei film
        fetchGenresMovies() {
            //Effettuo la chiamata all'API
            axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=4cb5867956b2d28be2e1ac26f742a720", {
                //Parametri
                params: {
                    language: "it-IT", //lingua
                }
            })
            .then((res) => {
                const results = res.data.genres; //salvo il risultati della ricerca
                //Ciclo
                for (let i = 0; i < results.length; i++) {
                    //Genere
                    let genre = {
                        id: results[i].id, //id del genere
                        name: results[i].name, //nome del genere
                    };
                    this.store.listGenres.push(genre); //inserisco il genere dentro la lista dei generi
                }
                //Ciclo
                for (let i = 0; i < this.store.listGenres.length; i++) {
                    //Ciclo
                    for (let j = 0; j < this.store.listGenres.length; j++) {
                        //Se gli indici sono diversi
                        if (i != j) {
                            //Se il genere è già presente dentro la lista
                            if (this.store.listGenres[i].id == this.store.listGenres[j].id) {
                                this.store.listGenres.splice(j, 1); //cancello il duplicato
                            }
                        }
                    }
                }
            });
        },
        //Metodo per ottenere i generi delle serie tv
        fetchGenresTVs() {
            //Effettuo la chiamata all'API
            axios.get("https://api.themoviedb.org/3/genre/tv/list?api_key=4cb5867956b2d28be2e1ac26f742a720", {
                //Parametri
                params: {
                    language: "it-IT", //lingua
                }
            })
            .then((res) => {
                const results = res.data.genres; //salvo il risultati della ricerca
                //Ciclo
                for (let i = 0; i < results.length; i++) {
                    //Genere
                    let genre = {
                        id: results[i].id, //id del genere
                        name: results[i].name, //nome del genere
                    };
                    this.store.listGenres.push(genre); //inserisco il genere dentro la lista dei generi
                }
                //Ciclo
                for (let i = 0; i < this.store.listGenres.length; i++) {
                    //Ciclo
                    for (let j = 0; j < this.store.listGenres.length; j++) {
                        //Se gli indici sono diversi
                        if (i != j) {
                            //Se il genere è già presente dentro la lista
                            if (this.store.listGenres[i].id == this.store.listGenres[j].id) {
                                this.store.listGenres.splice(j, 1); //cancello il duplicato
                            }
                        }
                    }
                }
            });
        },
        //Metodo per cercare il cast dei film
        fetchCastMovie(movie_id) {
            //Effettuo la chiamata all'API
            axios.get("https://api.themoviedb.org/3/movie/" + movie_id + "/credits?api_key=4cb5867956b2d28be2e1ac26f742a720", {
                //Parametri
                params: {
                    language: "it-IT", //lingua
                }
            })
            .then((res) => {
                const results = res.data.cast; //salvo i risultati della ricerca
                //Ciclo
                for (let i = 0; i < this.store.listSearch.length; i++) {
                    //Se l'id del film dentro la lista della ricerca coincide con l'id passato come parametro nell'API
                    if (this.store.listSearch[i].id == movie_id) {
                        //Ciclo
                        for (let j = 0; j < 5; j++) {
                            this.store.listSearch[i].cast.push(results[j].name); //salvo il cast
                        }
                    }
                }
            });
        },
        //Metodo per cercare il cast delle serie tv
        fetchCastTV(tv_id) {
            //Effettuo la chiamata all'API
            axios.get("https://api.themoviedb.org/3/tv/" + tv_id + "/credits?api_key=4cb5867956b2d28be2e1ac26f742a720", {
                //Parametri
                params: {
                    language: "it-IT", //lingua
                }
            })
            .then((res) => {
                const results = res.data.cast; //salvo i risultati della ricerca
                //Ciclo
                for (let i = 0; i < this.store.listSearch.length; i++) {
                    //Se l'id della serie tv dentro la lista della ricerca coincide con l'id passato come parametro nell'API
                    if (this.store.listSearch[i].id == tv_id) {
                        //Ciclo
                        for (let j = 0; j < 5; j++) {
                            this.store.listSearch[i].cast.push(results[j].name); //salvo il cast
                        }
                    }
                }
            });
        },
        //Filtro per genere
        filterByGenre() {
            let filter = []; //elementi filtrati
            //Ciclo
            for (let i = 0; i < this.store.listSearch.length; i++) {
                //Se nella lista della ricerca sono presenti degli elementi con lo stesso genere del filtro
                if (this.store.listSearch[i].genre_ids.includes(this.genre)) {
                    filter.push(this.store.listSearch[i]); //salvo l'elemento con lo stesso genere del filtro
                }
            }
            this.store.listSearch = filter; //assegno alla lista della ricerca gli elementi filtrati
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
        },
        //Metodo per convertire da id del genere a nome del genere
        parseGenreFromIdToName(ids) {
            //Ciclo
            for (let i = 0; i < ids.length; i++) {
                //Ciclo
                for (let j = 0; j < this.store.listGenres.length; j++) {
                    //Se l'id del genere del film è uguale all'id presente nella lista dei generi
                    if (ids[i] == this.store.listGenres[j].id) {
                        ids[i] = this.store.listGenres[j].name; //cambio l'id con il suo nome effettivo
                    }
                }
            }
            return ids; //restituisco gli id converiti
        }
    },
    //Created
    created() {
        this.fetchGenres(); //cerco i generi
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
        <!-- Navbar -->
        <nav class="navbar">
            <!-- Lista -->
            <ul class="navbar__list">
                <!-- Home -->
                <li class="navbar__list-item active">
                    Home
                </li>
                <!-- Film -->
                <li class="navbar__list-item">
                    Film
                </li>
                <!-- Home -->
                <li class="navbar__list-item">
                    Serie TV
                </li>
            </ul>
        </nav>
        <!-- Barra di ricerca -->
        <div class="search">
            <!-- Filtro per genere -->
            <select class="select" v-model="genre" v-on:change="fetchMoviesAndTVs()">
                <!-- Opzione -->
                <option class="option" value="">Genere</option>
                <!-- Opzione -->
                <option class="option" v-for="genre in store.listGenres" v-bind:value="genre.name">{{ genre.name.toUpperCase() }}</option>
            </select>
            <!-- Input -->
            <input class="search__input" type="text" placeholder="Cerca un film o una serie tv" v-model="search" v-on:keyup.enter="fetchMoviesAndTVs()">
        </div>
    </header>
</template>

<!-- CSS -->
<style scoped>
    /* Header */
    .main-header {
        flex-shrink: 0;
        background-color: black;
        height: 70px;
        padding: 20px;
        display: flex;
        align-items: center;
        gap: 20px;
    }
    /* Immagine usata come logo */
    .logo__img {
        width: 150px;
        object-fit: cover;
    }
    /* Navbar */
    .navbar {
        flex-grow: 1;
    }
    .navbar__list {
        color: #adb5bd;
        display: flex;
        gap: 20px;
    }
    /* Elementi della lista della Navbar */
    .navbar__list-item {
        font-size: 16px;
        cursor: pointer;
    }
    /* Hover degli elementi della lista della Navbar */
    .navbar__list-item:hover {
        color: white;
    }
    /* Active */
    .active.navbar__list-item {
        color: white;
    }
    /* Input */
    .search__input {
        font-size: 16px;
        width: 400px;
        height: 40px;
        padding: 0px 10px;
    }
    /* Select */
    .select {
        color: #adb5bd;
        font-size: 16px;
        border: none;
        background-color: transparent;
        cursor: pointer;
        margin-right: 30px;
    }
    /* Select in hover */
    .select:hover {
        color: white;
    }
    /* Opzioni della select */
    .option {
        color: black;
    }
</style>