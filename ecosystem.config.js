module.exports = {

  apps : [
    {
      name      : 'Sindsep',
      script    : 'app.js',
      env: {
        COMMON_VARIABLE: 'true'
      }
    }
  ],

  deploy : {
    production : {
      user : 'root',
      host : 'painel.sindsep-es.com',
      ref  : 'origin/master', 
      repo : 'git@bitbucket.org:sindsep/painel.git',
      path : '/tmp',
      'post-deploy' : 'rm -rf /srv/painel/* && npm install && mv /tmp/source/dist/* /srv/painel',
      key: '../../keys/artmark',
      env  : {
        NODE_ENV: 'production'
      }
    },  
  }
};
 