export default {
    getLoggedIn(state) {
        return state.userId;
    },
    getComments(state) {
        console.log(state.comments[0])
        return state.comments[0];
    }
}