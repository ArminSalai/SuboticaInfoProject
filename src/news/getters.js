export default {
    getArticles(state) {
        return state.article;
    },
    getTerm(state) {
        return state.searchTerm;
    },
    getAdditionals(state) {
        return state.additionals;
    },
    getSports(state) {
        return state.sports;
    },
    getKultures(state) {
        return state.cultures;
    }
}