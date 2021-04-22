<template>
  <div class="card card-user">
    <div class="image" style="background-color: dimgray;">
      <img :src="getBackground()" alt="...">
    </div>
    <div class="content">
      <div class="author" v-viewer>
        <img class="avatar border-primary" :src="data.imageURL" v-if="data.imageURL" >
        <img class="avatar border-primary" src="static/img/logo.png" v-if="!data.imageURL" >
        <h4 class="title">{{data.fullName}}
          <br>
        </h4>
      </div>

      <p class="description text-center" style="font-size: 14px">
        <span
            class="input-group-title"
        >
          <b>Email</b>: {{data.email}}
      </span><br/>
      </p>
      <p class="description text-center" style="font-size: 14px">
        <span
            class="input-group-title"
        >
          <b>Telefone</b>: {{data.formattedPhone}}
      </span><br/>
      </p>
      <p class="description text-center" style="font-size: 14px">
        <span
            class="input-group-title"
        >
          <b>CPF</b>: {{data.cpf}}
      </span><br/>
      </p>
      <p class="description text-center" style="font-size: 14px">
        <span
            class="input-group-title"
        >
          <b>Data Nascimento</b>: {{data.birthday}}
      </span><br/>
      </p>
    </div>
    <hr>
  </div>
</template>
<script>
  import moment from 'moment'

  export default {
    props: {
      data: {
        type: Object,
      },
    },
    data () {
      return {}
    },
    methods: {
      formatDate (date) {
        return moment.utc(date).utcOffset(-180).format('D/M/YYYY')
      },
      getInvitedByURL (invited) {
        if (!invited) return ''
        let path = window.location.pathname === '/' ? '' : window.location.pathname
        return `${path}/?#/admin/usuarios/editar/${invited}`
      },
      getBackground () {
        let galleries = this.data && this.data.MissionLives && this.data.MissionLives[0] && this.data.MissionLives[0].Galleries
        if (Array.isArray(galleries) && galleries.length > 0) {
          let i = Math.floor(Math.random() * galleries.length)
          return galleries[i].imageOriginal
        } else {
          return 'static/img/logo-login.png'
        }
      },
     
    }
  }

</script>
<style>
  .galleryBox {
    border: 1px solid red;
    border-radius: 5px;
    height: 50px;
  }
</style>
