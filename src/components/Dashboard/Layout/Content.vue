<template>
  <div class="content">
    <div class="container-fluid">
        <transition name="fade" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </transition>
            <notifications group="foo" />

    </div>
  </div>
</template>
<script>
  import {mapActions} from "vuex";

  export default {
    methods: {
      ...mapActions(["isLogin"])
    },
    created() {
      this.isLogin()
        .then(res => {
        })
        .catch(res => {
          window.location = window.location.href.split('#')[0] + '#/login'
        });
    }
  };
</script>
<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .1s
  }

  .fade-enter,
  .fade-leave-to
  /* .fade-leave-active in <2.1.8 */

  {
    opacity: 0
  }

  .container-fluid{
    max-width: 1024px;
    margin: auto;
  }
</style>
