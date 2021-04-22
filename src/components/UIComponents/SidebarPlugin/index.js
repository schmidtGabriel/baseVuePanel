import Sidebar from './SideBar.vue'

const SIDEBAR = {
  ADMIN: "ADMIN",
  SUPPORT: "SUPPORT",
  NONE: "NONE",
};

const adminLinks = [
  {
    name: 'Home',
    icon: 'ti-panel',
    path: '/admin/home',
    collapse: false,
    subLinks: []
  },
  // {
  //   name: 'Suporte',
  //   icon: 'ti-headphone-alt',
  //   path: '/admin/suportes/lista',
  //   collapse: false,
  //   subLinks: []
  // },
  {
    name: 'Usuários',
    icon: 'ti-user',
    path: '/admin/usuarios/lista',
    collapse: false,
    subLinks: []
  },
  {
    name: 'Agendamentos',
    icon: 'ti-calendar',
    path: '/admin/agendamentos/lista',
    collapse: false,
    subLinks: []
  },
  {
    name: 'Notícias',
    icon: 'ti-star',
    path: '/admin/noticias/lista',
    collapse: false,
    subLinks: []
  },
  {
    name: 'Denúncias',
    icon: 'ti-announcement',
    path: '/admin/denuncias/lista',
    collapse: false,
    subLinks: []
  },
  {
    name: 'Promoções',
    icon: 'ti-flag-alt',
    path: '/admin/promocoes/lista',
    collapse: false,
    subLinks: []
  },
  {
    name: 'Ferramentas',
    icon: 'ti-clip',
    path: '',
    collapse: false,
    subLinks: [
    {
      name: 'Assuntos',
      icon: 'ti-pencil',
      path: '/admin/assuntos/lista',
      collapse: false,
      subLinks: []
    },
  // {
  //   name: 'Pagamentos',
  //   icon: 'ti-money',
  //   path: '/admin/pagamentos/lista',
  //   collapse: false,
  //   subLinks: []
  // },
  {
    name: 'Area',
    icon: 'ti-pencil',
    path: '/admin/areas/lista',
    collapse: false,
    subLinks: []
  },
  {
    name: 'Sexo',
    icon: 'ti-pencil',
    path: '/admin/sexo/lista',
    collapse: false,
    subLinks: []
  },
  {
    name: 'Estado Civil',
    icon: 'ti-pencil',
    path: '/admin/estadocivil/lista',
    collapse: false,
    subLinks: []
  },
  {
    name: 'Nacionalidade',
    icon: 'ti-pencil',
    path: '/admin/nacionalidade/lista',
    collapse: false,
    subLinks: []
  },
  {
    name: 'Orgão',
    icon: 'ti-pencil',
    path: '/admin/orgaos/lista',
    collapse: false,
    subLinks: []
  }
]},
{
  name: 'Perguntas Frequentes',
  icon: 'ti-pencil',
  path: '/admin/perguntas/lista',
  collapse: false,
  subLinks: []
},
  {
    name: 'Notificações',
    icon: 'ti-comment',
    path: '/admin/notificacoes/lista',
    collapse: false,
    subLinks: [
      // {
      //   name: 'Lista',
      //   icon: 'ti-clipboard',
      //   path: '/admin/notificacoes/lista'
      // },

      // {
      //   name: 'Criar',
      //   icon: 'ti-pencil',
      //   path: '/admin/notificacoes/criar'
      // },
    ]
  },
  {
    name: 'Trocar Senha',
    icon: 'ti-lock',
    path: '/admin/senha/editar',
    collapse: false,
    subLinks: []
  },
  {
    name: 'Configurações',
    icon: 'ti-settings',
    path: '/admin/configuracoes/editar',
    collapse: false,
    subLinks: [
      /*{
        name: 'Lista',
        icon: 'ti-clipboard',
        path: '/admin/blacklist/lista'
      },
      {
        name: 'Criar',
        icon: 'ti-pencil',
        path: '/admin/blacklist/criar'
      },*/
    ]
  },

 
];



const SidebarStore = {
  showSidebar: false,
  sidebarLinks: [],

  displaySidebar(value) {
    this.showSidebar = value
  },
  updateSidebar(value) {
    this.sidebarLinks = adminLinks;
       
    this.showSidebar = 'ADMIN'
  }
};

const SidebarPlugin = {

  install(Vue) {
    Vue.mixin({
      data() {
        return {
          sidebarStore: SidebarStore
        }
      }
    });

    Object.defineProperty(Vue.prototype, '$sidebar', {
      get() {
        return this.$root.sidebarStore
      }
    });
    Vue.component('side-bar', Sidebar)
  }
};

export default SidebarPlugin
