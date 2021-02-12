import Vue from "vue";
import VueRouter from "vue-router";
import Empty from "../views/jun/empty.vue";
import store from "@/store/modules/jusers.js"


const Home1 = () => import(/* webpackChunkName: "common" */ '../views/isabelle/home.vue')
const isabelle = () => import(/* webpackChunkName: "common" */ '../views/isabelle/isabelle.vue')
const write = () => import(/* webpackChunkName: "common" */ '../views/isabelle/write.vue')
const detail = () => import(/* webpackChunkName: "common" */ '../views/isabelle/detail.vue')
const edit = () => import(/* webpackChunkName: "common" */ '../views/isabelle/edit.vue')
const login = () => import(/* webpackChunkName: "common" */ '../views/isabelle/login.vue')

Vue.use(VueRouter)
// const Home = () => import(/* webpackChunkName: "common" */ "../views/home.vue");
// const rejecAuthMember = (to, from, next) => {
//   if (store.state.isLogin == true) {
//     alert('Login complete')
//     next("/jun/home")
//   } else {
//     next()
//   }
// }
// const onlyAuthMember = (to, from, next) => {
//   if (store.state.isLogin == false) {
//     alert('Login Please!!')
//     next("/jun/home")
//   } else {
//     next()
//   }
// }



const JunHome = () => import(/* webpackChunkName: "jun" */ "../views/jun/jun-home.vue");
const JunCreate = () => import(/* webpackChunkName: "jun" */ "../views/jun/jun-create.vue");
const JunDetail = () => import(/* webpackChunkName: "jun" */ "../views/jun/jun-detail.vue");
const JunUpdate = () => import(/* webpackChunkName: "jun" */ "../views/jun/jun-update.vue");
const JunMypage = () => import(/* webpackChunkName: "jun" */ "../views/jun/jun-mypage.vue");
const JunLogin = () => import("../views/jun/jun-login.vue");
const restTest = () => import(/* webpackChunkName: "jun" */ "../views/jun/rest-test.vue");
const routes = [
  {
    path: "/",
    name: "Home1",
    component: Home1,
    meta: { isAuth: true },
    /*     beforeEnter: requireAuth() */
  },
  {
    path: '/isabelle/:page',
    name: 'isabelle',
    component: isabelle,
    props: true
  },
  {
    path: '/isabelle/write',
    name: 'write',
    component: write,
  },
  {
    path: '/isabelle/detail/:id',
    name: 'detail',
    component: detail,
    /*  props: route => ({
       id: Number(route.params.id)
     }) */
    props: true
  },
  {
    path: '/isabelle/edit/:id',
    name: 'edit',
    component: edit,
    props: route => ({
      id: Number(route.params.id)
    })
  },
  {
    path: '/isabelle/login',
    name: 'login',
    component: login,
  },
  {
    path: "/jun",
    component: Empty,
    children: [
      {
        path: "home",
        name: "JunHome",
        component: JunHome
      },
      {
        path: "create",
        name: "JunCreate",
        meta: { pageAuth: true },
        component: JunCreate
      },
      {
        path: "detail/:id",
        name: "JunDetail",
        component: JunDetail,
        props: true

      },
      {
        path: ":id/edit",
        name: "JunUpdate",

        component: JunUpdate,
        props: true
      },
      {
        path: "login",
        name: "JunLogin",
        meta: { loginAuth: true },
        component: JunLogin,

      },
      {
        path: "mypage",
        name: "JunMypage",
        meta: { pageAuth: true },
        component: JunMypage,

      },
      {
        path : "rest",
        name : "restTest",
        component : restTest,
      }
    ],
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes,
});
//형준
router.beforeEach((to, from, next) => {//login page 처리
  if (to.matched.some(record => record.meta.loginAuth)) {
    if (store.state.isLogin == false) {
      next()
    } else {
      alert("Login complete")
      next("/jun/home")
    }
  } else {
    next() // 반드시 next()를 호출하십시오!
  }
})
router.beforeEach((to, from, next) => {// pageAuth
  if (to.matched.some(record => record.meta.pageAuth)) {

    if (store.state.isLogin == true) {
      next()
    } else {
      alert("Login please")
      next("/jun/login")
    }
  } else {
    next() // 반드시 next()를 호출하십시오!
  }
})

//  const requireAuth = () => (to, from, next) => {
//   if (to.matched.some(record => record.meta.isAuth)){
//   alert('Login Please!');
//   next()
//   }
//   else{ // isAuth === true면 페이지 이동
//   alert('Login Please!');  
//   next('/isabelle/login') 
//   }// isAuth === false면 다시 로그인 화면으로 이동
// } 
// isAuth === false면 다시 로그인 화면으로 이동

/* router.beforeResolve((_to, _from, next) => {
  next(); */


/* _asyncLogin(_to).then(_to => waitForStorageToBeReady(_to)).then(() => {
  next()
}, err => {
  console.log(err)
  if (err.denied) {
    EventBus.$emit("view:denied", err.denied);
    next({ name: "Login" });
  }
}) */

export default router;
