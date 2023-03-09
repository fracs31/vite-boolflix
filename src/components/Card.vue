<!-- JavaScript -->
<script>
//Esporto
export default {
    //Props
    props: {
        poster_path: String, //immagine
        title: String, //titolo
        original_title: String, //titolo originale
        vote_average: Number, //voto
        overview: String, //trama
        genre_ids: Array, //generi
        cast: Array, //cast
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
            <img class="card__poster--img" v-bind:src="poster_path" v-bind:alt="title">
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
        gap: 15px;
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