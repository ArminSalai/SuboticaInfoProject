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
    addSport(state, payload) {
        state.sports.push(payload);
    },
    addCultures(state, payload) {
        state.cultures.push(payload);
    },
    setAdditional(state, payload) {
        state.additionals = payload;
    },
    setMovieDays(state, payload) {
        state.movieDays = payload;
    },
    reset(state) {
        state.article = [];
        state.additionals = [];
        state.searchTerm = '';
        state.movieDays = [];
        state.sports = [];
        state.cultures = [];
    },
}