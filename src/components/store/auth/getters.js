export default {
    getLoggedIn(state) {
        return state.userId;
    },
    getComments(state) {
        return state.comments[0];
    },
    getUserName(state) {
        return state.userName;
    }
}