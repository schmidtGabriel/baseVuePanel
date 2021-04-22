<template>
  <div>
    <div class="header">
      <slot name="header">
        <h4 class="title">{{title}}</h4>
        <p class="category">{{subTitle}}</p>
        <p class="category">Qnt: {{this.dataAux ? this.dataAux.length : 0}}</p>
      </slot>
    </div>
        <div class="content col-md-6">
              <fg-input class="clean" type="text" label="Pesquisa rápida" placeholder="Pesquisar por Nome da obra, Ano, Descrição..." v-model="search"  />
        </div>
    <div class="content table-responsive table-full-width">
      <table class="table" :class="tableClass">
        <thead>
          <tr>
            <th v-if="checkOn">
              <input type="checkbox" v-model="checkAll" @click="toggleSelect(checkAll)">
            </th>
            <th v-for="header in headers"  v-on:click="getNamebyIndex(headers.indexOf(header))" :class="[{'headerSelectAsc': headerOrder == header && tipoOrder == 'Asc'}, {'headerSelectDesc': headerOrder == header && tipoOrder == 'Desc'}]" >
             {{header}} 
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in searchList" :class="selectId == item.id?'selectRow':''">
            <td v-if="checkOn">
              <input type="checkbox" v-model="item.checked" v-on:click="SelectOne(item)">
            </td>

            <td v-for="column in columns" v-if="hasValue(item, column)" v-on:click="sendEvent(item)" v-html="itemValue(item, column)" >
              
            </td>
          
            <td align="left" v-if="buttons.length > 0" >
             
              <img v-for="buttom in buttons" :src="buttom.icon" v-on:click="execute(buttom.event, item)" style="margin: 5px" />
            </td>

            <td v-for="ctrl in control" align="right">

              <button v-on:click="execute(ctrl.event, item)" :class="ctrl.class">
                {{ctrl.texto}}
              </button>

            </td>

          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>
<script>
  import {mapActions, mapState, mapGetters} from "vuex";
  import Vue from "vue";
  import _ from 'lodash';

  export default {
    name: "component-table",
    props: {
      headers: Array,
      columns: Array,
      data: Array,
      type: {
        type: String, // striped | hover
        default: "striped"
      },
      title: {
        type: String,
        default: ''
      },
      eventName: {
        type: String,
        default: ''
      },

      subTitle: {
        type: String,
        default: ""
      },
       control: {
        type: Array,
        default: function () {
          return [];
        }
      },
       buttons: {
        type: Array,
        default: function () {
          return [];
        }
      },
    
      checkOn: {
        type: Boolean,
      }
    },
    data() {
      return {
        checkAll: false,
        columnOrder: '',
        headerOrder: '',
        tipoOrder: 'Desc',
        search: "",
        selectId: '',
        dataAux: []

      };
    },
    computed: {
      tableClass() {
        return `table-${this.type}`;
      },

      searchList(){ 
        if(this.dataAux.length != this.data.length){
          this.dataAux = this.data
        }

        if(this.search){
            return this.dataAux.filter((item)=>{

            return this.ignoringAccent(this.search).toLowerCase().split(' ').every(v => 
            this.ignoringAccent(item.name).toLowerCase().includes(v) || 
            item.year.toLowerCase().includes(v) || 
            item.publicDescription.toLowerCase().includes(v))
            })
            }else{
              return this.dataAux;
            }
        },
    
        },

    methods: {
        ignoringAccent(str){
          
          return  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        },
        orderArray(){
        if(this.columnOrder != ""){
          if(this.tipoOrder == "Desc"){
            this.tipoOrder = "Asc"
            this.dataAux =  _.sortBy(this.data, this.columnOrder)
          }else{
            this.tipoOrder = "Desc"
            this.dataAux = _.sortBy(this.data, this.columnOrder).reverse()
        }
         }
      },
      getNamebyIndex(columnIndex){
        this.columnOrder = this.columns[columnIndex]
        this.headerOrder = this.headers[columnIndex]
        this.orderArray()
      },
      hasValue(item, column) {
        return item[column] !== "undefined";
      },
      itemValue(item, column) {
        if (!column) return '';
        return this.getValue(item, column)
      },
      sendEvent(data) {
        if (this.eventName) {
          this.selectId = data.id
          this.$parent.$emit(this.eventName, data);
        }
      },
     
      SelectOne(data){
        if(!data.checked){
            data.checked = true;
        }else{
            data.checked = false;
        }
      },
      
     
      
      toggleSelect: function (checkall) {
        if (!checkall) {
          this.data.forEach(function (user) {
            Vue.set(user, "checked", true);
          });
        } else {
          this.data.forEach(function (user) {
            Vue.set(user, "checked", false);
          });
        }
      },
      
      getColumnName(obj) {
        if(typeof obj === 'string') return obj;
        return obj.columnName;
      },
      getValue(item, column) {
        let columnName = this.getColumnName(column);
        let colList = columnName.split(".");
        let value = item;
        for(let i of colList){
          if((typeof value === 'undefined' || value === null)){
            return null;
          }
          let idx = parseInt(i);
          idx = isNaN(idx) ? i : idx;
          value = value[idx];
        }
        if((typeof value === 'undefined' || value === null)){
          return null;
        }

        return this.configValue(value, column);
      },
      configValue(value, columnData){
        if(typeof columnData === 'string') {
          // if(columnData.toUpperCase().indexOf('IMEI') !== -1){
          //   let path = window.location.pathname === '/' ? '' : window.location.pathname;
          //   return `<a href="${path}/?#/admin/blacklist/imei/${value}">${value}</a>`
          // }
          return value;
        }
        if(columnData.prefix){
          value = `${columnData.prefix} ${value}`;
        }
        if(columnData.logic && typeof columnData.logic === 'function'){
          value = columnData.logic(value, columnData);
        }
        return value;
      },
      execute(event, data) {
        if (event) {
          this.$parent.$emit(event, data);
        }
      },
    },
    
  };
</script>
<style scoped lang="scss">
  .table-striped tbody > tr  {
    cursor: pointer;
  }
.table-striped thead > tr  {
    cursor: pointer;

   :hover{
      background-color: #c2d4da57;
    }

  }
  .selectRow{
      background-color: #68b3c857 !important;
  }

   .headerSelectAsc{
      background-color: #c2d4da57;
    }
    .headerSelectDesc{
      background-color: #9cb2b957;
    }

  .table-striped tbody > tr:nth-of-type(2n + 1):hover {
    background-color: #68b3c857;
  }

  .table-striped tbody > tr:nth-of-type(2n) {
    background-color: #f0f0f0;
  }

  .table-striped tbody > tr:nth-of-type(2n):hover {
    background-color: #68b3c857;
  }

  td,
  th {
    padding: 5px 8px;
  }


  @media only screen and (max-width: 991px) {
    .card .content {
      padding: 15px 0px;
    }

    .table-responsive {
      border: none !important

    }
  }

  .tooltip {
  z-index: 9999 !important;

  .tooltip-inner {
    background: black;
    color: white;
    border-radius: 16px;
    padding: 5px 10px 4px;
  }

  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: black;
    z-index: 1;
  }

  &[x-placement^="top"] {
    margin-bottom: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="bottom"] {
    margin-top: 5px;

    .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="right"] {
    margin-left: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[x-placement^="left"] {
    margin-right: 5px;

    .tooltip-arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity .15s, visibility .15s;
  }

  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity .15s;
  }
}


</style>
