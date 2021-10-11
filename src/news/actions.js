const axios = require('axios').default;

export default {
    async setArticle(context, payload) {
        try {
            const response = await axios.get('https://www.subotica.info/restful-latest');
            let articles = [];
            if (String(payload) == "latest") {
                for (let i = 0; i < 6; i++)
                    articles.push(response.data.nodes[i].node);
            }
            else {
                let all = [];
                for (let i = 0; i < response.data.nodes.length; i++)
                    all.push(response.data.nodes[i].node);
                articles.push(all.find(node => node.Nid == payload));
            }
            context.commit('setArticle', articles);
        } catch (error) {
            console.error(error);
        }
    },
    getArticle(context, payload) {
        return context.state.article[payload];
    }
}