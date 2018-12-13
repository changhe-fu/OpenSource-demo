import Vue from "vue";
import Router from "vue-router";
import kindDemo from "@/components/kindDemo";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "kindDemo",
      component: kindDemo
    }
  ]
});
