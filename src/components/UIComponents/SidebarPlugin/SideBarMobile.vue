<template>
  <div :class="{'nav-open': $sidebar.showSidebar}">
    <router-view></router-view>
    <!--This sidebar appears only for screens smaller than 992px-->
    <side-bar type="navbar" :sidebar-links="$sidebar.sidebarLinks">
      <ul class="nav navbar-nav">
     
       
        <li>
          <a href="#" @click="logout()">
            <i class="ti-settings"></i>
            <p>Sair</p>
          </a>
        </li>
        <li class="divider"></li>
      </ul>
    </side-bar>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["Logout"]),
    logout() {
      this.Logout();
      location.reload(true);
    },
  
  },
  created(){}
};

</script>

<style lang="scss" scoped>

.sidebar[data-background-color="black"] .nav li:not(.active) > a, .off-canvas-sidebar[data-background-color="black"] .nav li:not(.active) > a {
    color: #68b3c8 !important;
}

.sidebar[data-active-color="success"] .nav li.active > a,
.off-canvas-sidebar[data-active-color="success"] .nav li.active > a {
  color: #68b3c8 !important;
  opacity: 0.6;
}
.sidebar[data-active-color="success"] .nav li.active > a:hover,
.off-canvas-sidebar[data-active-color="success"] .nav li.active > a:hover {
  color: #68b3c8 !important;
  opacity: 1;
}
</style>
