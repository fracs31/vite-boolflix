<!-- JavaScript -->
<script>
//Esporto
export default {
    //Props
    props: {
        poster_path: String,
        title: String,
        original_title: String,
        vote_average: Number,
        overview: String,
        genre_ids: Object,
    }
}
</script>

<!-- Template -->
<template>
    <!-- Carta -->
    <div class="card">
        <!-- Immagine della carta -->
        <div class="card__img">
            <!-- Immagine -->
            <img class="card__img--img" v-bind:src="poster_path" v-bind:alt="title">
        </div>
        <!-- Descrizione della carta -->
        <div class="card__description">
            <!-- Titolo -->
            <h1 class="title">
                {{ title }}
            </h1>
            <!-- Titolo originale -->
            <h2 class="original-title">
                Titolo originale: {{ original_title }}
            </h2>
            <!-- Voto -->
            <h3 class="vote">
                Voto:
                <!-- Stelle -->
                <span class="star" v-for="star in vote_average">
                    <i class="fa-solid fa-star"></i>
                </span>
            </h3>
            <!-- Trama -->
            <h3 class="overview">
                Trama: {{ overview }}
            </h3>
            <!-- Generi -->
            <h3 class="genres">
                <!-- Genere -->
                <span class="genre" v-for="genre in genre_ids">
                    {{ genre }}
                </span>
            </h3>
        </div>
    </div>
</template>

<!-- CSS -->
<style scoped>
    /* Carta */
    .card {
        color: white;
        height: 500px;
        position: relative;
        cursor: pointer;
    }
    /* Immagine della carta */
    .card__img {
        width: 100%;
        height: 100%;
    }
    /* Immagine utilizzata */
    .card__img--img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        object-position: top;
    }
    /* Descrizione della carta */
    .card__description {
        width: 100%;
        height: 100%;
        font-size: 12px;
        padding: 20px;
        background-color: rgba(0, 0, 0, 0.8);
        overflow-y: auto;
        position: absolute;
        top: 0px;
        left: 0px;
        display: none;
        flex-direction: column;
        gap: 10px;
    }
    /* Hover della carta */
    .card:hover .card__description {
        display: flex;
    }
    /* Titoli presenti nella carta */
    .title, 
    .original-title,
    .vote,
    .overview {
        font-weight: normal;
    }

    /* Stella */
    .star {
        color: yellow;
    }
    .genre {
        margin-right: 10px;
    }
</style>