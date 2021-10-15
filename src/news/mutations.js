export default {
    setArticle(state, payload) {
        state.article = payload;
    },
    addArticle(state, payload) {
        state.article.push(...payload);
    },
    setTerm(state, payload) {
        state.searchTerm = payload;
    },
    addAdditional(state, payload) {
        state.additionals.push(payload);
    },
    setAdditional(state, payload) {
        state.additionals = payload;
    },
    reset(state) {
        state.article = [];
        state.additionals = [];
        state.searchTerm = '';
    }
}