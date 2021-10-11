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
            let data = response.data.nodes[0].node;
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
    async setCategory(context, payload) {
        const response = await axios.get(`https://www.subotica.info/restful-${payload.category}`);
        if (payload.isLatest == 'latest') {
            let results = response.data.nodes[0].node;
            context.commit('addArticle', results);
        }
        else {
            let results = [];
            for (const data of response.data.nodes) {
                results.push(data.node);
            }
            context.commit('setArticle', results);
        }
    }
}