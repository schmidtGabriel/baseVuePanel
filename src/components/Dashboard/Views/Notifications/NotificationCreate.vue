<template>
  <div>

    <div class="row">
      <div class="text-right">
      <btn-rounded
        label="VOLTAR"
        event="cancelProduct"
      />
    </div>
      <div class="col-md-12">
        <notification-form
          :data='data'
        />
      </div>

    <div class="text-right">
      <btn-rounded
      activeColor="success"
        label="ENVIAR"
        event="save"
      />
    </div>
        <div class="col-md-12" style="margin-top: 20px">
        <div class="card">
          <component-table
            eventName="selectItem"
            :title="table.title"
            :sub-title="table.subTitle"
            :data="userList"
            :columns="table.columns"
            :headers="table.headers"
            :checkOn= true
          />
        </div>
      </div>
    </div>
 

  </div>
</template>
<script>
  import NotificationForm from "components/UIComponents/Forms/NotificationForm.vue";
  import {mapActions, mapState} from "vuex";
  import ComponentTable from "components/UIComponents/Lists/ComponentTable.vue";
  import moment from 'moment';

  const headers = ["Nome","Email", "Telefone","CPF","Data Cadastro", "Status"];
  const tableColumns = [
    "name", "email", "formattedPhone","cpf",
    {
      columnName: "createdAt",
      logic: function (data, columnData) {
        if (!data) {
          return ''
        }
        return moment.utc(data).utcOffset(-180).format('D/M/YYYY H:mm:ss');
      }
    },
    {
      columnName: "isActive",
      logic: function (data) {
        let className = 'text-danger';
        let val = 'Suspenso';
        if (data) {
          className = 'text-success';
          val = 'Ativo';
        }
        let prefix = `<span class="${className}" style="font-size:large">&bullet;</span>`;

        return `${prefix} ${val}`
      }
    }
  ];

  export default {
    components: {
      NotificationForm,
      ComponentTable
    },
    props: {
      list: {
        type: Array,
        default: () => {
          return null;
        }
      }
    },
    /**
     * Chart data used to render stats, charts. Should be replaced with server data
     */
    data() {
      return {
      localReadonly: false,

      data: {
        title: "",
        body: "",
        Users: []
      },
      readonly: true,
       table: {
          title: "Usuários",
          subTitle: "Marque os usuários para receber a notificação",
          headers: [...headers],
          columns: [...tableColumns],
        },
     
    };
    },
    created() {
      this.initData();

      this.$on("save", item => {
        var userArray = [];
          for(var i=0;i<this.userList.length; i++){
            if(this.userList[i].checked == true){
              userArray.push({UserId: this.userList[i].id})
            }
          }
          this.data.Users = JSON.stringify(userArray)
          this.createNotification(this.data)
            .then(res => {
              this.$notify({
                group: "foo",
                title: "Sucesso",
                text: "Notificação enviada com sucesso!",
                position: "top center",
                type: "success"
              });
            })
            .catch(res => {
               this.$notify({
                group: "foo",
                title: "Erro",
                text: "Não foi possível enviar a notificação! Verifique o log da mensagem para mais informações.",
                position: "top center",
                type: "success"
              });
            });
       
      });

      
    },

    mounted() {
      this.store = !this.$route.params.store ? {} : this.$route.params.store;
    },
    computed: {
    ...mapState({
      userList: ({user}) => user.list,
      
    })
  },
    methods: {
      ...mapActions(["createNotification", "getUserList"]),

    initData() {
      this.getUserList();
      
    },
    }
  };
</script>
<style lang="scss" scoped>

</style>