<template>
  <div>
    <el-col>
      <searchBar />

    </el-col>
    <el-col>
      <pipelineInfo />
    </el-col>
    <br>
    <p></p>
    <el-col>
      <pipelinedetail />
    </el-col>


  </div>
</template>

<script setup>
import searchBar from './components/searchBar.vue'
import pipelineInfo from './components/pipelineInfo.vue';
import pipelinedetail from './components/pipelinedetail.vue';

</script>

<style></style>
