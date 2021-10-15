import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const numinix = { template: '<div>numinix</div>'}
const twitter = { template: '<div>twitter</div>'}
const gmail = { template: '<div>gmail</div>'}

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  { 
		path: '/numinix',
		beforeEnter() {location.href = 'https://www.numinix.com/'},
		component: numinix
  },
  { 
		path: '/twitter',
		beforeEnter() {location.href = 'https://www.twitter.com/'},
		component: twitter
  },
  { 
		path: '/gmail',
		beforeEnter() {location.href = 'https://www.gmail.com/'},
		component: gmail
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
