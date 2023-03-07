<!-- JavaScript -->
<script>
import Header from "./components/Header.vue"; //importo l'header
import Main from "./components/Main.vue"; //importo il main

//Esporto
export default {
  //Componenti
  components: {
    Header, //header
    Main, //main
  }
}
</script>

<!-- Template -->
<template>
  <!-- Header -->
  <Header></Header>
  <!-- Main -->
  <Main></Main>
</template>

<!-- CSS -->
<style scoped>
</style>