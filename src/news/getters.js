export default {
    getArticles(state) {
        console.log(state.article);
        return state.article;
    },
    getTerm(state) {
        return state.searchTerm;
    },
}