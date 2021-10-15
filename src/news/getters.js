export default {
    getArticles(state) {
        return state.article;
    },
    getTerm(state) {
        return state.searchTerm;
    },
    getAdditionals(state) {
        return state.additionals;
    }
}