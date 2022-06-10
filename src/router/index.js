import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Register from "../views/Register.vue";
import SignIn from "../views/SignIn.vue";
import Sheet from "../views/sheet.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const routes = [
	{
		path: "/",
		name: "home",
		component: HomeView,
		meta: {
			requiresAuth: true,
		}
	},
	{
		path: "/register",
		name: "register",
		component: Register,
	},
	{
		path: "/signIn",
		name: "signIn",
		component: SignIn,
	},
	{
		path: "/sheet",
		name: "sheet",
		component: Sheet,
		meta: {
			requiresAuth: true,
		}
	},
	{
		path: "/about",
		name: "about",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
	},
	
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const removeListener = onAuthStateChanged(
			getAuth(),
			(user) => {
				removeListener();
				resolve(user);
			},
			reject
		);
	})
}

router.beforeEach(async (to, from, next) => {
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (await getCurrentUser()) {
			next();
		} else {
			alert('restringido');
			next("/signIn");
		}
	} else {
		next();
	}
})

export default router;
