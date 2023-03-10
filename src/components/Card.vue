<!-- JavaScript -->
<script>
//Esporto
export default {
    //Props
    props: {
        poster_path: String, //immagine
        title: String, //titolo
        original_title: String, //titolo originale
        original_language: String, //lingua originale
        vote_average: Number, //voto
        overview: String, //trama
        genre_ids: Array, //generi
        cast: Array, //cast
    },
    //Computed
    computed: {
        //Metodo per restituire la bandiera del paese del film
        getCountryFlag() {
            let flag = ""; //bandiera
            switch (this.original_language) {
                //Inglese
                case "en":
                    flag = "../src/assets/img/united-states.png"; //bandiera americana
                    break; //break
                //Italia
                case "it":
                    flag = "../src/assets/img/italy.png"; //bandiera italiana
                    break; //break
                //Francia
                case "fr":
                    flag = "../src/assets/img/france.png"; //bandiera francese
                    break; //break
                //Spagna
                case "es":
                    flag = "../src/assets/img/spain.png"; //bandiera spagnola
                    break; //break
                //Germania
                case "de":
                    flag = "../src/assets/img/germany.png"; //bandiera tedesca
                    break; //break
                //Giappone
                case "ja":
                    flag = "../src/assets/img/japan.png"; //bandiera giapponese
                    break; //break
                //Cina
                case "zh":
                    flag = "../src/assets/img/china.png"; //bandiera cinese
                    break; //break
                //Corea del Sud
                case "ko":
                    flag = "../src/assets/img/south-korea.png"; //bandiera sud coreana
                    break; //break
                //Se il paese non viene riconosciuto
                default:
                    flag = "../src/assets/img/unknown-flag.png"; //bandiera placeholder
                    break; //break
            }
            return flag; //restituisco la bandiera
        },
        //Metodo per restituire l'url dell'immagine del fil o della serie tv
        getImgURL() {
            let url = ""; //url dell'immagine
            //Se il film o la serie tv ha un'immagine
            if (this.poster_path) {
                url = "https://image.tmdb.org/t/p/w780" + this.poster_path; //creo l'url dell'immagine
            } else { //altrimenti
                url = "../src/assets/img/placeholder-img.png"; //utilizzo un placeholder come immagine
            }
            return url; //restituiso l'url
        }
    }
}
</script>

<!-- Template -->
<template>
    <!-- Carta -->
    <div class="card">
        <!-- Poster della carta -->
        <div class="card__poster">
            <!-- Immagine -->
            <img class="card__poster--img" v-bind:src="getImgURL" v-bind:alt="title">
        </div>
        <!-- Descrizione della carta -->
        <div class="card__description">
            <!-- Titoli -->
            <div class="titles">
                <!-- Titolo -->
                <h1 class="title">
                    {{ title }}
                </h1>
                <!-- Titolo originale -->
                <h2 class="original-title">
                    {{ original_title }}
                </h2>
            </div>
            <!-- Paese -->
            <div class="country">
                <!-- Immagine -->
                <img class="country__img" v-bind:src="getCountryFlag" v-bind:alt="original_language">
            </div>
            <!-- Generi -->
            <div class="genres">
                Genere:
                <!-- Genere -->
                <span class="genre" v-for="(genre) in genre_ids">
                    {{ genre }},
                </span>
            </div>
            <!-- Cast -->
            <div class="cast">
                Cast:
                <!-- Attore -->
                <span class="actor" v-for="(actor) in cast">
                    {{ actor }},
                </span>
            </div>
            <!-- Voto -->
            <div class="vote">
                <!-- Stella -->
                <span class="star" v-for="(star) in vote_average">
                    <i class="fa-solid fa-star"></i>
                </span>
            </div>
            <!-- Trama -->
            <div class="overview">
                {{ overview }}
            </div>
        </div>
    </div>
</template>

<!-- CSS -->
<style scoped>
    /* Carta */
    .card {
        height: 500px;
        overflow-y: auto;
        cursor: pointer;
        position: relative;
    }
    /* Poster della carta */
    .card__poster {
        width: 100%;
        height: 100%;
    }
    /* Immagine */
    .card__poster--img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top;
        display: block;
    }
    /* Descrizione della carta */
    .card__description {
        width: 100%;
        height: 100%;
        padding: 15px;
        display: none;
        flex-direction: column;
        gap: 10px;
        position: absolute;
        top: 0px;
        left: 0px;
        background-color: rgba(0, 0, 0, 0.9);
        color: white;
    }
    /* Hover della carta */
    .card:hover .card__description {
        display: flex;
    }
    /* Titolo */
    .title {
        font-size: 28px;
    }
    /* Titolo originale */
    .original-title {
        font-size: 16px;
        font-weight: normal;
    }
    .country__img {
        width: 15px;
        aspect-ratio: 1/1;
    }
    /*
        Generi
        Cast 
    */
    .genres,
    .cast {
        font-size: 14px;
    }
    /* Voto */
    .vote {
        text-align: right;
    }
    /* Stella */
    .star {
        color: #ffc300;
    }
</style>