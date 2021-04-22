<template>
    <div :class="sidebarClasses"
         :data-background-color="backgroundColor"
         :data-active-color="activeColor">
        <!--
                Tip 1: you can change the color of the sidebar's background using: data-background-color="white | black | darkblue"
                Tip 2: you can change the color of the active button using the data-active-color="primary | info | success | warning | danger"
            -->
        <!-- -->
        <div class="sidebar-wrapper" id="style-3">
            <div class="logo">
                <a href="/?#/admin/" class="simple-text" >
                    <div class="">
                        <img src="static/img/logo.png" alt="" width="40%" style="border-radius: 15px; margin: auto;">
                        <br>
                        <font  v-if="getUser != undefined" >Bem vindo {{getUser.nickname}}</font>
                    </div>
                    <!-- painel -->
                </a>
            </div>
            <slot>

            </slot>
            <ul :class="navClasses">
                <!--By default vue-router adds an active class to each route link. This way the links are colored when clicked-->
                <router-link v-for="(link,index) in sidebarLinks" :to="link.path" tag="li" :ref="link.name"
                             :key="link.name + index">

                    <a class="linha">
                        <div :class="link.collapse==false?'item':'item-collapse'">
                            <i :class="link.icon"></i>

                            <p v-on:click="OpenCollapse(link)">{{link.name}}
                            </p>


                            <!-- <i class="ti-angle-down" v-if="!link.collapse"></i>
                            <i class="ti-angle-up" v-if="link.collapse"></i> -->
                        </div>
                        <router-link v-for="item in link.subLinks" :to="item.path"  :ref="item.name"
                                     :key="item.name" v-if="link.collapse == true">
                        <a>
                        <div class="subitem" >
                            <i :class="item.icon"></i>

                            <p v-on:click="OpenCollapse(item)">{{item.name}}
                            </p>


                            <!-- <i class="ti-angle-down" v-if="!link.collapse"></i>
                            <i class="ti-angle-up" v-if="link.collapse"></i> -->
                        </div>
                        <router-link v-for="subitem in item.subLinks" :to="subitem.path" tag="li" :ref="subitem.name"
                                     :key="subitem.name" v-if="item.collapse == true">
                            <div class="subsubitem" style="margin:5px 25px; font-size: 10px;">
                                <i :class="subitem.icon"></i>

                                <p >{{subitem.name}}</p>
                            </div>
                        </router-link>
                    </a>
                        </router-link>
                    </a>

                </router-link>
            </ul>
            <!-- <moving-arrow :move-y="arrowMovePx">

            </moving-arrow> -->
        </div>
    </div>
</template>
<script>
  import MovingArrow from "./MovingArrow.vue";
  import {mapActions, mapState, mapGetters} from "vuex";

  export default {

    props: {
      type: {
        type: String,
        default: "sidebar",
        validator: value => {
          let acceptedValues = ["sidebar", "navbar"];
          return acceptedValues.indexOf(value) !== -1;
        }
      },
      backgroundColor: {
        type: String,
        default: "black",
        validator: value => {
          let acceptedValues = ["white", "black", "darkblue"];
          return acceptedValues.indexOf(value) !== -1;
        }
      },
      activeColor: {
        type: String,
        default: "success",
        validator: value => {
          let acceptedValues = [
            "primary",
            "info",
            "success",
            "warning",
            "danger"
          ];
          return acceptedValues.indexOf(value) !== -1;
        }
      },
      sidebarLinks: {
        type: Array,
        default: () => []
      },
    
    },
    components: {
      MovingArrow,
    },
    computed: {
        ...mapGetters({
        sidebarFlag: 'sidebarFlag',
        getUser: 'getUser'
        
      }),
      
      sidebarClasses() {
        if (this.type === "sidebar") {
          return "sidebar";
        } else {
          return "collapse navbar-collapse off-canvas-sidebar";
        }
      },
      navClasses() {
        if (this.type === "sidebar") {
          return "nav";
        } else {
          return "nav navbar-nav";
        }
      },
      /**
       * Styles to animate the arrow near the current active sidebar link
       * @returns {{transform: string}}
       */
      arrowMovePx() {
        return this.linkHeight * this.activeLinkIndex;
      }
    },
    data() {
      return {
        linkHeight: 60,
        activeLinkIndex: 0,
        user: null,
        windowWidth: 0,
        isWindows: false,
        hasAutoHeight: false,
       
    
      };
    },
     created() {
    },
    methods: {

    
      ...mapActions(["getMe"]),

      
      findActiveLink() {
        this.sidebarLinks.find((element, index) => {
          let found = element.path === this.$route.path;
          if (found) {
            this.activeLinkIndex = index;
          }

          return found;
        });
      },
      OpenCollapse(link) {
        if (!link.collapse) {
            link.collapse = true
          } else {
            link.collapse = false;
          }
        },
        
      
    },
    mounted() {
      this.findActiveLink();

      
    },
    watch: {
      $route: function (newRoute, oldRoute) {
        this.findActiveLink();
      }
    }
  };
</script>
<style lang="scss" scoped>
@import "./src/assets/sass/paper-dashboard.scss";

    .sidebar {
        font-family: 'Roboto', sans-serif;

        .logo .simple-text, .off-canvas-sidebar .logo .simple-text {
            text-align: center;
            font-size: 16px !important;
        }

        .item-collapse {
            color: $primary_color !important;
            opacity: 1;
        }
        .item:hover {
            background-color: gray;
            color: $primary_color !important;
            opacity: 1;

        }

        .subitem:hover {
            background-color: grey;
            color: $white-color !important;
            opacity: 1;
        }
        .subsubitem {
            color: $white-color !important;
            opacity: 1;
        }

        .linha{
          padding: 0 !important;
          margin: 0 !important;
        }

        .item-collapse {
            color: $primary_color !important;
            opacity: 0.6;
            padding: 15px 15px;
            margin-top: 5px;
            p {
                font-size: 14px
            }
            i {
                font-size: 16px;
                margin-right: 5px;
            }
        }
        .item {
            color: $primary_color !important;
            opacity: 0.6;
            padding: 15px 15px;
            margin-top: 5px;
            p {
                font-size: 14px
            }
            i {
                font-size: 16px;
                margin-right: 5px;
            }
        }
        
        .subitem {
            color: $white-color !important;
            opacity: 0.6;
            padding: 10px 10px 10px 35px;
            p {
                font-size: 12px
            }
            i {
                font-size: 14px;
                margin-right: 5px;
            }
        }
        .subsubitem {
            color: $white-color !important;
            opacity: 0.6;
            p {
                font-size: 10px
            }
            i {
                font-size: 12px;
                margin-right: 5px;
            }
        }
        
       
    }

    // .sidebar[data-background-color="black"] .nav li:not(.active) > a, .off-canvas-sidebar[data-background-color="black"] .nav li:not(.active) > a {
    //     color: #68b3c8 !important;
    // }

    // .sidebar[data-active-color="success"] .nav li.active > a,
    // .off-canvas-sidebar[data-active-color="success"] .nav li.active > a {
    //   color: #68b3c8 !important;
    //   opacity: 0.6;
    // }
    // .sidebar[data-active-color="success"] .nav li.active > a:hover,
    // .off-canvas-sidebar[data-active-color="success"] .nav li.active > a:hover {
    //   color: #68b3c8 !important;
    //   opacity: 1;
    // }
</style>
