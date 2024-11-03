<template>
  <div class="flex flex-wrap gap-4 items-center">
    <el-select v-model="value" placeholder="Select" style="width: 240px">
      <el-option v-for="item in options" :key="item.pipeline_alias" :label="item.pipeline_name"
        :value="item.pipeline_alias" />
    </el-select>
  </div>
</template>

<script lang="js" setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios';
import store from '@/store'

const options = ref([]);
const value = ref('');

onMounted(() => {
  axios.get('http://127.0.0.1:5000/api/pipelines_info').then((response) => {
    options.value = response.data
    value.value = response.data[0].pipeline_alias
  })
})

watch(value, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    store.commit('set_pipeline_alias', newValue);
  }
  let pipeline_alias = store.state.pipelineInfo.pipeline_alias
  let start_time = store.state.pipelineInfo.start_time
  let end_time = store.state.pipelineInfo.end_time
  if (newValue !== oldValue && pipeline_alias && start_time && end_time) {
    let data = {
      pipeline_alias: pipeline_alias,
      start_time: start_time,
      end_time: end_time,
    };
    query_run_number_list(data);
  }
})

const query_run_number_list = (data) => {
  axios.post('http://127.0.0.1:5000/api/pipeline_run_number_list', data).then((response) => {
    store.commit('set_run_number_list', response.data);
  })
}
</script>