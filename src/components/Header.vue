<!-- JavaScript -->
<script>
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
            <input class="search__input" type="text" placeholder="Cerca un film o serie tv">
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