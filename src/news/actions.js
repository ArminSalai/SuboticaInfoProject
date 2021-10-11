const axios = require('axios').default;

export default {
    async setLatest(context, payload) {
        try {
            const response = await axios.get('https://www.subotica.info/restful-latest');
            let articles = [];
            if (String(payload) == "latest") {
                for (let i = 0; i < 6; i++)
                    articles.push(response.data.nodes[i].node);
            }
            else {
                let all = [];
                for (let i = 0; i < response.data.nodes.length - 1; i++)
                    all.push(response.data.nodes[i].node);
                articles.push(all.find(node => node.Nid == payload));
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
    }
}