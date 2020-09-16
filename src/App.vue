<template>
  <div id="app">
    <NavGlobal></NavGlobal>
    <NavPage></NavPage>
    <router-view></router-view>
    <FooterGlobal></FooterGlobal>
  </div>
</template>

<script>
import "./css/global.css";
import NavGlobal from "./components/NavGlobal";
import NavPage from "./components/NavPage";
import FooterGlobal from "./components/FooterGlobal";
export default {
  name: "App",
  components: {
    NavGlobal,
    NavPage,
    FooterGlobal
  }
};
</script>

<style>

</style>
