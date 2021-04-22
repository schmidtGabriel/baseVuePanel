<template>
  <div class="card"   v-on:click="execute(event, params)">
    <div class="content">
      <div class="row">
        <div class="col-md-12 col-xs-12">
          <slot name="header"></slot>
        </div>
        <div class="col-md-12 col-xs-12" >
          <slot name="content"></slot>
        </div>
      </div>
    
    </div>
  
  </div>
</template>
<script>
  export default {
    name: 'home-card',
    methods: {
      execute(event, data) {
        if(!event) return null;
        this.$parent.$emit(event, data);
      },
  
    },
      props: {
      params: {
        validator: (value) => value,
        default: null
      },
      event: String,
    },
  }
</script>
<style lang="scss" scoped>
  .card{
    cursor: pointer;
    height: 200px;
   background: #00b7ea; /* Old browsers */
background: -moz-linear-gradient(top, #00b7ea 0%, #009ec3 100%); /* FF3.6-15 */
background: -webkit-linear-gradient(top, #00b7ea 0%,#009ec3 100%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(to bottom, #00b7ea 0%,#009ec3 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00b7ea', endColorstr='#009ec3',GradientType=0 ); /* IE6-9 */
    .content{
      height: 100%;
    }
  }

  @media only screen and (max-width: 750px) {
    .card{
    cursor: pointer;
    height: 100px;

    .content{
      height: 100%;
    }
  }
}

</style>
