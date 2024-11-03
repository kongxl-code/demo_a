<template>
    <div>
        <div ref="chartContainer" style="width: 600px; height: 400px;"></div>
    </div>
</template>

<script lang="js" setup>
import { ref, onMounted, watch, computed } from 'vue';
import * as echarts from 'echarts';
import axios from 'axios';
import store from '@/store';

const data = store.state.pipelineInfo;
const chartContainer = ref(null);
const myChart = ref();
const chartData = ref([]);

onMounted(() => {
    createChart();
})

watch(data, (newValue, oldValue) => {
    createChart();
})

const createChart = () => {
    axios.post('http://127.0.0.1:5000/api/pipeline_status_count_list', data).then((response) => {

        chartData.value = response.data;
        console.log(chartData.value);

        // 在获取到数据后，初始化ECharts实例
        myChart.value = echarts.init(chartContainer.value);

        const option = {
            title: {
                text: 'Referer of a Website',
                subtext: 'Fake Data',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data: chartData.value,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        myChart.value.setOption(option);
    });
};

</script>