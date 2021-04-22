  <template>
  <div>
    <form  autocomplete="off">
      <!-- ///responsável -->
      
       
       


       <div class="row">

         <!-- <div
          class="col-md-6"
          v-if="data.id"
        >
          <form-group-image
            :url="url+'user/app/car/image/'+data.id"
            :value="data.ImageURL"
            img-type="square"
          />
        </div> -->
         <div
          class="col-md-12"></div>
        <div class="col-md-6">
          <fg-input
            class="clean"
            type="text"
            label="Id"
            placeholder="Id"
            v-model="data.id"
            
          />
        </div>
        <div class="col-md-12">
          <fg-input
            class="clean"
            type="text"
            label="Mensagem"
            placeholder="Mensagem"
            v-model="data.msg"
            v-bind:readonly="readonly"

          />
        </div>
      
        
      </div>
    </form>

 
  </div>
</template>
<script>
  import {mapActions, mapState, mapGetters} from "vuex";
  import moment from 'moment';
    import formGroupImage from 'src/components/UIComponents/Inputs/formGroupImage.vue';
    import {NAMES} from '../../../config';


  export default {
    name: "service-form",
     components: {
       formGroupImage
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
        // modelList: ({model}) => model.list.map((obj) => {
        //   return {name: obj.name+"-"+obj.Brand.name+", "+obj.Transmission.name, value: obj.id}
        // }),

      })
    },

    methods: {
      ...mapActions([]),
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
       format: function (sValue) {
        this.data.formattedValue = parseInt(("" + sValue).onlyNumber()).int2Money();
        this.data.valueCentavos = this
          .data
          .formattedValue
          .replace("R$", "")
          .replace(",", "")
          .replace(".", "")
          .replace(" ", "");
        this.$nextTick(() => {
        });
      
      },
      
      initData(){
        // this.getModelList();

      }
    
    },

    created() {
      this.initData();

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
