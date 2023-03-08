import { reactive } from "vue"; //importo reactive da Vue

//Store
const store = reactive({
    listSearch: [], //lista che contiene i risultati della ricerca di film e serie tv
    //Lista dei generi
    listGenres: {
        movie: [], //lista dei generi dei film
        tv: [], //lista dei generi delle serie tv
    },
});

export default store; //esporto lo store