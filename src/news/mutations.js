export default {
    setArticle(state, payload) {
        state.article = payload;
    },
    addArticle(state, payload) {
        state.article.push(payload);
    },
    setTerm(state, payload) {
        state.searchTerm = payload;
    }
}