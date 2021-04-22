<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" :class="{toggled: $sidebar.showSidebar}" @click="toggleSidebar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar bar1"></span>
          <span class="icon-bar bar2"></span>
          <span class="icon-bar bar3"></span>
        </button>
        <a class="navbar-brand">{{routeName}}</a>
      </div>
      <div class="collapse navbar-collapse">
        <ul class="nav navbar-nav navbar-right">

          <drop-down title="Opções" icon="ti-bell">
            <li><a href="#" @click="logout()">Sair</a></li>
          </drop-down>

        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
  import {mapActions, mapGetters} from "vuex"

  export default {
    computed: {
      routeName() {
        const {name} = this.$route
        return this.capitalizeFirstLetter(name)
      },
      ...mapGetters({
        sidebarFlag: 'sidebarFlag'
      })
    },
    data() {
      return {
        activeNotifications: false
      }
    },
    created() {
      this.updateSidebar();
    },
    methods: {
      ...mapActions(["Logout"]),

      capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
      },
      toggleNotificationDropDown() {
        this.activeNotifications = !this.activeNotifications
      },
      closeDropDown() {
        this.activeNotifications = false
      },
      toggleSidebar() {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      },
      hideSidebar() {
        this.$sidebar.displaySidebar(false)
      },
      updateSidebar() {
        this.$sidebar.updateSidebar(this.sidebarFlag);
        if(this.sidebarFlag !== 'NONE') return;
        setTimeout(() => {
          this.updateSidebar()
        }, 1000);
      },
      logout() {
        this.Logout()
        location.reload(true)
      }
    }
  }

</script>
<style>

</style>
