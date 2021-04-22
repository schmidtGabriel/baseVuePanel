<template>
  <div class="card">
    <div class="content">
      <div class="row" text-center>
      
        <div class="col-xs-12">
          <slot name="content"></slot>
        </div>
      </div>
     
    </div>
  
  </div>
</template>
<script>
  export default {
    name: 'stats-card'
  }

</script>
<style lang="scss" scoped>

.card{
  padding: 8.5px 8px;
  width: 100%;

  .title{
    font-size: 14px;
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
