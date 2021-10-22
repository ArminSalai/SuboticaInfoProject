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
                userId: data.localId,
                username: payload.username
            })
        });

        if (!additional.ok) {
            console.log(data);
            const error = new Error(data.message || 'Failed to set username');
            throw error;
        }

        const resp = await fetch('https://subotica-info-5ee5a-default-rtdb.europe-west1.firebasedatabase.app/users.json');

        const additionalData = await resp.json();

        let userKey;

        for (const key of Object.keys(additionalData)) {
            if (additionalData[key].userId == data.localId) userKey = key;
        }

        const UserName = additionalData[userKey].username;

        if (!response.ok) {
            console.log(data);
            alert("Probajte ponovo sa valid imejl adresa i lozinka!");
            const error = new Error(data.message || 'Failed to load');
            throw error;
        }

        const expiresIn = +data.expiresIn * 1000;
        const expirationDate = new Date().getTime() + expiresIn;

        localStorage.setItem('token', data.idToken);
        localStorage.setItem('userId', data.localId);
        localStorage.setItem('tokenExpiration', expirationDate);
        localStorage.setItem('userName', UserName);

        timer = setTimeout(function () {
            context.dispatch('logout');
        }, expiresIn);

        context.commit('setUser', {
            token: data.idToken,
            userId: data.localId,
            userName: UserName
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

        const resp = await fetch('https://subotica-info-5ee5a-default-rtdb.europe-west1.firebasedatabase.app/users.json');

        const additionalData = await resp.json();

        let userKey;

        for (const key of Object.keys(additionalData)) {
            if (additionalData[key].userId == data.localId) userKey = key;
        }

        const UserName = additionalData[userKey].username;

        if (!response.ok) {
            console.log(data);
            const error = new Error(data.message || 'Failed to load');
            throw error;
        }

        const expiresIn = +data.expiresIn * 1000;
        const expirationDate = new Date().getTime() + expiresIn;

        localStorage.setItem('token', data.idToken);
        localStorage.setItem('userId', data.localId);
        localStorage.setItem('tokenExpiration', expirationDate);
        localStorage.setItem('userName', UserName);

        timer = setTimeout(function () {
            context.dispatch('logout');
        }, expiresIn);

        context.commit('setUser', {
            token: data.idToken,
            userId: data.localId,
            userName: UserName
        })
    },

    autoLogin(context) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const userName = localStorage.getItem('userName');
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
                userName: userName
            })
        }
    },

    logout(context) {
        context.commit('logout');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('tokenExpiration');

        clearTimeout(timer);
    },

    async comment(context, payload) {
        if (context.state.userId != null) {
            const postTime = new Date().getTime();
            const response = await fetch("https://subotica-info-5ee5a-default-rtdb.europe-west1.firebasedatabase.app/comments.json", {
                method: 'POST',
                body: JSON.stringify({
                    user: context.state.userName,
                    comment: payload.comment,
                    articleNid: payload.articleNid,
                    id: context.state.userId + postTime,
                    likedBy: [""],
                    dislikedBy: [""]
                })
            });

            const data = await response.json();

            if (!response.ok) {
                console.log(data)
                const error = new Error(data.message || 'Failed to post comment');
                throw error;
            }
        }
        else
            alert("Please login to your account, or create a new one");
    },

    async likeComment(_, payload) {
        const resp = await fetch('https://subotica-info-5ee5a-default-rtdb.europe-west1.firebasedatabase.app/comments.json');

        const data = await resp.json();
        const user = localStorage.getItem('userId');

        let likedKey;

        for (const key of Object.keys(data)) {
            if (data[key].id == payload)
                likedKey = key;
        }

        if (data[likedKey].likedBy.find(lB => lB == user))
            data[likedKey].likedBy.pop(user);
        else if (data[likedKey].dislikedBy.find(lB => lB == user)) {
            data[likedKey].likedBy.push(user);
            data[likedKey].dislikedBy.pop(user);
        }
        else
            data[likedKey].likedBy.push(user);

        await fetch('https://subotica-info-5ee5a-default-rtdb.europe-west1.firebasedatabase.app/comments.json', {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },

    async dislikeComment(_, payload) {
        const resp = await fetch('https://subotica-info-5ee5a-default-rtdb.europe-west1.firebasedatabase.app/comments.json');

        const data = await resp.json();
        const user = localStorage.getItem('userId');

        let dislikedKey;

        for (const key of Object.keys(data)) {
            if (data[key].id == payload)
                dislikedKey = key;
        }

        if (data[dislikedKey].dislikedBy.find(lB => lB == user))
            data[dislikedKey].dislikedBy.pop(user);
        else if (data[dislikedKey].likedBy.find(lB => lB == user)) {
            data[dislikedKey].likedBy.pop(user);
            data[dislikedKey].dislikedBy.push(user);
        }
        else
            data[dislikedKey].dislikedBy.push(user);

        await fetch('https://subotica-info-5ee5a-default-rtdb.europe-west1.firebasedatabase.app/comments.json', {
            method: 'PUT',
            body: JSON.stringify(data)
        });
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