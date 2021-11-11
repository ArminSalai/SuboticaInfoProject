const axios = require('axios').default;

export default {
    async setLatest(context, payload) {
        try {
            let articles = [];
            if (String(payload) == "latest") {
                const response = await axios.get('https://www.subotica.info/restful-latest');
                for (let i = 0; i < 6; i++)
                    articles.push(response.data.nodes[i].node);
            }
            else {
                const response = await axios.get(`https://www.subotica.info/restful-latest?page=${payload}`);
                let all = [];
                for (let i = 0; i < response.data.nodes.length; i++)
                    all.push(response.data.nodes[i].node);
                articles = all;
            }
            context.commit('setArticle', articles);
        } catch (error) {
            console.error(error);
        }
    },
    async setArticle(context, payload) {
        try {
            const response = await axios.get(`https://www.subotica.info/restful-article/${payload}`);
            let data = null;
            if (response.data.nodes[0] !== undefined) {
                data = response.data.nodes[0].node;
            }
            else {
                const resp = await axios.get('https://www.subotica.info/restful-latest');
                let all = resp.data.nodes;
                data = all.find(node => node.node.Nid === payload).node;
            }
            context.commit('setArticle', data);
        }
        catch (error) {
            console.error(error);
        }
    },
    getArticle(context, payload) {
        return context.state.article[payload];
    },
    setTerm(context, payload) {
        context.commit('setTerm', payload);
    },
    async search(context, payload) {
        try {
            const response = await axios.get(`https://www.subotica.info/restful-search?naslov=${payload.value}`);
            let realResults = [];
            let results = [];
            for (let i = 0; i < response.data.nodes.length - 1; i++)
                results.push(response.data.nodes[i].node.Nid);
            for (const result of results) {
                let accurateResponse = await axios.get(`https://www.subotica.info/restful-article/${result}`);
                let data = accurateResponse.data.nodes[0].node;
                realResults.push(data);
            }
            context.commit('setArticle', realResults);
        }
        catch (error) {
            console.error(error);
        }
    },


    async setSport(context, payload) {
        const response = await axios.get(`https://www.subotica.info/restful-sport`);
        if (payload == 'latest') {
            context.commit('addSport', response.data.nodes[0].node);
        }
        else {
            for (const data of response.data.nodes) {
                context.commit('addSport', data.node);
            }
        }
    },
    async setCultures(context, payload) {
        const response = await axios.get(`https://www.subotica.info/restful-kultura`);
        if (payload == 'latest') {
            context.commit('addCulture', response.data.nodes[0].node);
        }
        else {
            let results = [];
            for (const data of response.data.nodes) {
                results.push(data.node);
            }
            context.commit('addCulture', results);
        }
    },
    async setZajednica(context, payload) {
        const response = await axios.get(`https://www.subotica.info/restful-zajednica`);
        if (payload == 'latest') {
            context.commit('addZajednica', response.data.nodes[0].node);
        }
        else {
            let results = [];
            for (const data of response.data.nodes) {
                results.push(data.node);
            }
            context.commit('addZajednica', results);
        }
    },
    async setNajava(context) {
        const response = await axios.get(`https://www.subotica.info/restful-najava`);
        let results = [];
        for (const data of response.data.nodes) {
            results.push(data.node);
        }
        context.commit('addNajava', results);
    },
    async setNajavaDetails(context, payload) {
        const response = await axios.get(`https://www.subotica.info/restful-najava`);
        for (const data of response.data.nodes) {
            if (data.node.Nid == payload) context.commit('setNajava', data.node);
        }
    },
    async setPanoramica(context) {
        const random = await Math.floor(Math.random() * 31)
        const response = await axios.get(`https://www.subotica.info/restful-panoramica?page=${random}`);
        const r = Math.floor(Math.random() * response.data.nodes.length);
        context.commit('addPanoramica', response.data.nodes[r].node);
    },

    async loadSportItems(context, payload) {
        try {
            const response = await axios.get(`https://www.subotica.info/restful-sport?page=${payload}`);
            for (let i = 0; i < response.data.nodes.length; i++)
                context.commit('addSport', response.data.nodes[i].node);
        } catch (error) {
            console.error(error);
        }
    },
    async loadCultureItems(context, payload) {
        try {
            const response = await axios.get(`https://www.subotica.info/restful-kultura?page=${payload}`);
            for (let i = 0; i < response.data.nodes.length; i++)
                context.commit('addCulture', response.data.nodes[i].node);
        } catch (error) {
            console.error(error);
        }
    },
    async loadZajednicaItems(context, payload) {
        try {
            const response = await axios.get(`https://www.subotica.info/restful-zajednica?page=${payload}`);
            for (let i = 0; i < response.data.nodes.length; i++)
                context.commit('addZajednica', response.data.nodes[i].node);
        } catch (error) {
            console.error(error);
        }
    },
    async loadPrivredaItems(context, payload) {
        try {
            const response = await axios.get(`https://www.subotica.info/restful-privreda?page=${payload}`);
            for (let i = 0; i < response.data.nodes.length; i++)
                context.commit('addPrivreda', response.data.nodes[i].node);
        } catch (error) {
            console.error(error);
        }
    },
    async loadIntervjuItems(context, payload) {
        try {
            const response = await axios.get(`https://www.subotica.info/restful-intervju?page=${payload}`);
            for (let i = 0; i < response.data.nodes.length; i++) {
                context.commit('addIntervju', response.data.nodes[i].node);
                context.commit('setPage', { Nid: response.data.nodes[i].node.Nid, Page: payload });
            }
        } catch (error) {
            console.error(error);
        }
    },
    async loadPressItems(context, payload) {
        try {
            const response = await axios.get(`https://www.subotica.info/restful-press?page=${payload.page}`);
            if (payload.category.value)
                for (let i = 0; i < response.data.nodes.length; i++) {
                    if (response.data.nodes[i].node.Kategorija == payload.category.value)
                        context.commit('addPress', response.data.nodes[i].node);
                }
            else
                for (let i = 0; i < response.data.nodes.length; i++)
                    context.commit('addPress', response.data.nodes[i].node);
        } catch (error) {
            console.error(error);
        }
    },
    async loadDailyItems(context, payload) {
        try {
            const response = await axios.get(`https://www.subotica.info/restful-dailyphoto?page=${payload}`);
            for (let i = 0; i < response.data.nodes.length; i++) {
                context.commit('addDaily', response.data.nodes[i].node);
                context.commit('setPage', { Nid: response.data.nodes[i].node.Nid, Page: payload });
            }
        } catch (error) {
            console.error(error);
        }
    },
    async setDailyDetails(context, payload) {
        const response = await axios.get(`https://www.subotica.info/restful-dailyphoto?page=${payload.Page}`);
        for (const data of response.data.nodes) {
            if (data.node.Nid == payload.Nid) context.commit('setDaily', data.node);
        }
    },
    async setIntervjuDetails(context, payload) {
        const response = await axios.get(`https://www.subotica.info/restful-intervju?page=${payload.Page}`);
        for (const data of response.data.nodes) {
            if (data.node.Nid == payload.Nid) context.commit('setIntervju', data.node);
        }
    },
    Reset(context) {
        context.commit('reset');
    },
}