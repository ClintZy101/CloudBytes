import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash";

// import example from './module-example'

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: {
      quotes: []
    },
    mutations: {
      ADD_QUOTE(state, data) {
        state.quotes.push(data);
      },
      SET_QUOTES(state, quotes) {
        state.quotes = quotes;
      },
      REMOVE_QUOTE(state, i) {
        if (i > -1) {
          state.quotes.splice(i, 1);
        }
      }
    },
    actions: {
      addQuote({ commit, state }, payload) {
        commit("ADD_QUOTE", payload);
        const json = JSON.stringify(state.quotes);
        localStorage.setItem("saved-quotes", json);
      },
      removeQuote({ commit, state }, id) {
        const index = _.findIndex(state.quotes, o => o.id === id);
        commit("REMOVE_QUOTE", index);
        const json = JSON.stringify(state.quotes);
        localStorage.setItem("saved-quotes", json);
      },
      fetchQuotes({ commit }) {
        if (localStorage.getItem("saved-quotes")) {
          try {
            const quotes = JSON.parse(localStorage.getItem("saved-quotes"));
            commit("SET_QUOTES", quotes);
          } catch (e) {
            localStorage.removeItem("saved-quotes");
          }
        }
      },
      saveQuote({}, payload) {
        const json = JSON.stringify(payload);
        localStorage.setItem("saved-quote", json);
      },
      fetchQuote({}) {
        if (localStorage.getItem("saved-quote")) {
          try {
            return JSON.parse(localStorage.getItem("saved-quote"));
          } catch (e) {
            localStorage.removeItem("saved-quote");
          }
        }
      },
      clearQuote({}) {
        if (localStorage.getItem("saved-quote")) {
          localStorage.removeItem("saved-quote");
        }
      }
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  });

  return Store;
}
