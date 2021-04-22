  <template>
  <div>
    <form  autocomplete="off">
      <!-- ///responsável -->
      <div class="">
        <!-- EDIT USER -->
       
       


       <div class="row">

        <div class="col-md-12">
          <fg-input
            class="clean"
            type="password"
            label="Senha Atual"
            placeholder="Senha Atual"
            v-model="data.oldPassword"
          />
        </div>

        <div class="col-md-12">
          <fg-input
            class="clean"
            type="password"
            label="Nova Senha"
            placeholder="Nova senha"
            v-model="data.password"

          />
        </div>
       <div class="col-md-12">
          <fg-input
            class="clean"
            type="password"
            label="Confirmar nova senha"
            placeholder="Confirmar nova senha"
            v-model="data.confirmPass"

          />
        </div>
      </div>
      </div>
    </form>

 
  </div>
</template>
<script>
  import {mapActions, mapState, mapGetters} from "vuex";
  import moment from 'moment';
  import {NAMES} from '../../../config';


  export default {
    name: "password-form",
     components: {
    },

    props: {
      data: {
        type: Object,
      },
      readonly: {
        type: Boolean,
        default: false
      },
      event: {
        type: String,
        default: ''
      },
      url: {
        type: String,
        default: NAMES.fullUrl
      }

    },

    computed: {
      ...mapState({
        operatorList: ({operator}) => operator.list.map((obj) => {
          return {name: obj.name, value: obj.id}
        })
      })
    },

    methods: {
      ...mapActions([""]),
      ...mapGetters({
        sidebarFlag: 'sidebarFlag'
      }),
      unlock() {
        if (this.sidebarFlag() === 'ADMIN') {
          this.localReadonly = !this.localReadonly
        } else {
          this.localReadonly = true;
        }
      },
      
    
    
    },

    created() {
        this.$on("execute", () => {
        this.$parent.$emit(this.event, this.data);
        
      });

    },
    data() {
      return {
        localReadonly: false,
      };
    },

  };
</script>
<style scoped lang="scss">
  label.stronger {
    font-weight: bold;
    color: black;
  }

  .stronger {
    font-weight: bold;
    color: black;
    margin: 15px 0 0 0 !important;
  }

  p.subject {
    color: #9c9c9c;
  }

</style>
