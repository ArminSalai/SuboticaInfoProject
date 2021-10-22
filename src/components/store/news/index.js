import getters from './getters.js';
import actions from './actions.js';
import mutations from './mutations.js';

export default {
    state() {
        return {
            article: [],
            sports: [],
            cultures: [],
            zajednica: [],
            najava: [],
            privreda: [],
            intervju: [],
            press: [],
            panoramica: {},
            searchTerm: ''
        }
    },
    getters,
    mutations,
    actions
};

