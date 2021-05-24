import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: {
      quote: null
    },
    mutations: {
      SET_QUOTE(state, data) {
        state.quote = data;
      }
    },
    actions: {
      saveQuote({ commit }, payload) {
        const json = JSON.stringify(payload);
        localStorage.setItem('saved-quote', json);
      },
      fetchQuote({ commit }) {
        if (localStorage.getItem('saved-quote')) {
          try {
            return JSON.parse(localStorage.getItem('saved-quote'));
          } catch (e) {
            localStorage.removeItem('saved-quote');
          }
        }
      },
      clearQuote({ commit }) {
        if (localStorage.getItem('saved-quote')) {
          localStorage.removeItem('saved-quote');
        }
      }
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
