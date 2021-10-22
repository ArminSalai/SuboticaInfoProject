export default {
    setUser(state, payload) {
        state.token = payload.token;
        state.userId = payload.userId;
        state.userName = payload.userName;
    },
    token(state) {
        return state.token
    },
    logout(state) {
        state.token = null;
        state.userId = null;
        state.userName = "";
        state.tokenExpiration = null;
    },
    addComment(state, payload) {
        state.comments.push(payload);
    }
}