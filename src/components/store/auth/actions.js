let timer;

export default {
    async register(context, payload) {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBpvNj56s_DBiSlXXV9fK6aimJHQVKBaiE', {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        });

        
        const data = await response.json();
        
        const additional = await fetch('https://subotica-info-5ee5a-default-rtdb.europe-west1.firebasedatabase.app/users.json', {
            method: 'POST',
            body: JSON.stringify({
                userToken: data.idToken,
                userId: data.localId,
                username: payload.username
            })
        });

        const additionalData = await additional.json();
        
        if (!response.ok) {
            console.log(data)
            const error = new Error(data.message || 'Failed to load');
            throw error;
        }

        const expiresIn = +data.expiresIn * 1000;
        const expirationDate = new Date().getTime() + expiresIn;

        localStorage.setItem('token', data.idToken);
        localStorage.setItem('userId', data.localId);
        localStorage.setItem('tokenExpiration', expirationDate);
        localStorage.setItem('userName', additionalData.username);

        timer = setTimeout(function () {
            context.dispatch('logout');
        }, expiresIn);

        context.commit('setUser', {
            token: data.idToken,
            userId: data.localId,
        })
    },

    async login(context, payload) {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBpvNj56s_DBiSlXXV9fK6aimJHQVKBaiE', {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.log(data)
            const error = new Error(data.message || 'Failed to load');
            throw error;
        }

        const expiresIn = +data.expiresIn * 1000;
        const expirationDate = new Date().getTime() + expiresIn;

        timer = setTimeout(function () {
            context.dispatch('logout');
        }, expiresIn);

        localStorage.setItem('token', data.idToken);
        localStorage.setItem('userId', data.localId);
        localStorage.setItem('tokenExpiration', expirationDate);

        context.commit('setUser', {
            token: data.idToken,
            userId: data.localId,
        })
    },

    autoLogin(context) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const tokenExpiration = localStorage.getItem('tokenExpiration');

        const expiresIn = + tokenExpiration - new Date().getTime();

        if (expiresIn < 10) {
            return;
        }

        timer = setTimeout(function () {
            context.dispatch('logout');
        }, expiresIn);

        if (token && userId) {
            context.commit('setUser', {
                token: token,
                userId: userId,
            })
        }
    },

    logout(context) {
        context.commit('logout');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenExpiration');

        clearTimeout(timer);
    },

    async comment(context, payload) {
        if (context.state.userId != null) {
            const postTime = new Date().getTime();
            const response = await fetch("https://subotica-info-5ee5a-default-rtdb.europe-west1.firebasedatabase.app/comments.json", {
                method: 'POST',
                body: JSON.stringify({
                    user: context.state.userId,
                    comment: payload.comment,
                    articleNid: payload.articleNid,
                    id: context.state.userId + postTime
                })
            });

            const data = await response.json();

            if (!response.ok) {
                console.log(data)
                const error = new Error(data.message || 'Failed to load comments');
                throw error;
            }
        }
        else
            alert("Please login to your account, or create a new one");
    },

    async loadComments(context, payload) {
        context.state.comments = [];
        const response = await fetch("https://subotica-info-5ee5a-default-rtdb.europe-west1.firebasedatabase.app/comments.json");

        const data = await response.json();

        if (!response.ok) {
            console.log(data)
            const error = new Error(data.message || 'Failed to load comments');
            throw error;
        }

        const comments = Object.values(data);

        context.commit('addComment', comments.filter(c => c.articleNid == payload));
    }
}