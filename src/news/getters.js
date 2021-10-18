export default {
    getArticles(state) {
        return state.article;
    },
    getTerm(state) {
        return state.searchTerm;
    },
    getSports(state) {
        return state.sports;
    },
    getCultures(state) {
        return state.cultures;
    },
    getZajednica(state) {
        return state.zajednica;
    },
    getNajava(state) {
        return state.najava;
    },
    getPanoramica(state) {
        return state.panoramica;
    }
}