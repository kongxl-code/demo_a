<template>
    <div class="block">
        <!-- <span class="demonstration"></span> -->
        <el-date-picker v-model="value" type="datetimerange" :shortcuts="shortcuts" range-separator="To"
            start-placeholder="Start date" end-placeholder="End date" />
    </div>

</template>

<script lang="js" setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios';
import store from '@/store';

const value = ref('')
const shortcuts = [
    {
        text: 'Last week',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setDate(start.getDate() - 7)
            return [start, end]
        },
    },
    {
        text: 'Last month',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setMonth(start.getMonth() - 1)
            return [start, end]
        },
    },
    {
        text: 'Last 3 months',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setMonth(start.getMonth() - 3)
            return [start, end]
        },
    },
]

onMounted(() => {
    value.value = [new Date(), new Date()]
})

watch(value, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        store.commit('set_times', newValue);
    }
    let pipeline_alias = store.state.pipelineInfo.pipeline_alias;
    let start_time = store.state.pipelineInfo.start_time;
    let end_time = store.state.pipelineInfo.end_time;
    if (newValue !== oldValue && pipeline_alias && start_time && end_time) {
        let data = {
            'pipeline_alias': pipeline_alias,
            'start_time': start_time,
            'end_time': end_time,
        };
        query_run_number_list(data);

    }
})

const query_run_number_list = (data) => {
    axios.post('http://127.0.0.1:5000/api/pipeline_run_number_list', data).then((response) => {
        store.commit('set_run_number_list', response.data)
    })
}
</script>
<style scoped>
.block {
    padding: 30px 0;
    text-align: center;
    border-right: solid 1px var(--el-border-color);
    flex: 1;
}

.block:last-child {
    border-right: none;
}

.block .demonstration {
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
}
</style>