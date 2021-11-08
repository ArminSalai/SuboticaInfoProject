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
    addCulture(state, payload) {
        state.cultures.push(payload);
    },
    addZajednica(state, payload) {
        state.zajednica.push(payload);
    },
    addPrivreda(state, payload) {
        state.privreda.push(payload);
    },
    addIntervju(state, payload) {
        state.intervju.push(payload);
    },
    addPress(state, payload) {
        state.press.push(payload);
    },
    addDaily(state, payload) {
        state.daily.push(payload);
    },
    setDaily(state, payload) {
        state.daily = [];
        state.daily.push(payload);
    },
    setIntervju(state, payload) {
        state.intervju = [];
        state.intervju.push(payload);
    },
    addNajava(state, payload) {
        state.najava.push(payload);
    },
    setNajava(state, payload) {
        state.najava = [];
        state.najava.push(payload);
    },
    addPanoramica(state, payload) {
        state.panoramica = payload;
    },
    setAdditional(state, payload) {
        state.additionals = payload;
    },
    setMovieDays(state, payload) {
        state.movieDays = payload;
    },
    reset(state) {
        state.article = [],
        state.sports = [],
        state.cultures = [],
        state.zajednica = [],
        state.najava = [],
        state.privreda = [],
        state.intervju = [],
        state.press = [],
        state.daily = [],
        state.panoramica = {},
        state.searchTerm = ''
    }
}