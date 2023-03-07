import { reactive } from "vue"; //importo reactive da Vue

//Store
const store = reactive({
    listMovies: [], //lista dei film
});

export default store; //esporto lo store