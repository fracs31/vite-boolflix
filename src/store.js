import { reactive } from "vue"; //importo reactive da Vue

//Store
const store = reactive({
    listSearch: [], //lista che contiene i risultati della ricerca di film e serie tv
    listGenresMovies: [], //lista dei generi dei film
    listGenresTVs: [], //lista dei generi delle serie tv
});

export default store; //esporto lo store