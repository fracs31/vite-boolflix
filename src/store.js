import { reactive } from "vue"; //importo reactive da Vue

//Store
const store = reactive({
    listMovies: [], //lista dei film
    listTV: [], //lista della serie tv
});

export default store; //esporto lo store