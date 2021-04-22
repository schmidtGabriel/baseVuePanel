const SIDEBAR = {
  ADMIN: "ADMIN",
  SUPPORT: "SUPPORT",
  NONE: "NONE",
};

const validAdmin = [
  'pedro@artmark.com.br',
  'pedrocosta@artmark.com.br',
  'gabriel@artmark.com.br',
  'russo@artmark.com.br',
  'eduardo@artmark.com.br'
];

const getters = {
  sidebarFlag: state => {
    if (!state.auth.user) return SIDEBAR.NONE;
    //if (validAdmin.indexOf(state.auth.user.email) !== -1)
    if(state.auth.user.isAdmin)
      return SIDEBAR.ADMIN;

    return SIDEBAR.SUPPORT;
  },

  getUser: state => {
    // console.log(state.auth.user);
    if (!state.auth.user) return null;
    if(state.auth.user)
      return state.auth.user;

  }
};

export default getters
