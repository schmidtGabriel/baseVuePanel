<template>
  <div class="card">
    <div class="content">
      <div class="row">
        <div class="col-xs-12">
          <slot name="content"/>
        </div>
      </div>
     
    </div>
  
  </div>
</template>
<script>
  export default {
    name: 'statistic-card'
  }

</script>
<style lang="scss" scoped>

.card{
  padding: 8.5px 16px;
  width: 100%;

  .title{
    font-size: 16px;
    text-align: left;
    font-weight: 300;
    color: #5e707e;

  }
  .value{
    font-size: 30px;
    text-align: center;
    color: #246ba7;
    font-weight: 900;
    margin-top: 10px; 
  }

}
  
</style>
