import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function(/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  Router.beforeEach((to, from, next) => {
    if (to.path === "/pattern-lock") {
      next();
      return;
    }
    if (
      localStorage.getItem("pattern-lock") === undefined ||
      localStorage.getItem("pattern-lock") === null
    )
      next("/pattern-lock");
    else {
      if (localStorage.getItem("pattern-lock") === "0,1,2,3,4,5,6,7,8") next();
      else next("pattern-lock");
    }
  });

  return Router;
}
