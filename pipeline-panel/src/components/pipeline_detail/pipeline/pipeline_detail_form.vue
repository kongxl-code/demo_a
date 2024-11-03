<template>
    <el-button @click="resetFilters">重置所有过滤器</el-button>
    <el-table :data="tableData" :default-sort="{ prop: 'run_number', order: 'descending' }"
        style="width: 100%; height: 50%">
        <el-table-column prop="run_number" label="编号" sortable width="180" :filters="generateRunNumberFilters()"
            :filter-method="filterRunNumber" filter-placement="bottom-end" />
        <el-table-column prop="start_time" label="开始时间" width="180" />
        <el-table-column prop="end_time" label="结束时间" width="180" />
        <!-- <el-table-column prop="run_time" label="执行时长" width="180" -->
        <el-table-column prop="status" label="执行状态" width="180" :filters="generateStatusFilters()"
            :filter-method="filterStatus" filter-placement="bottom-end" />
        <el-table-column prop="group_name" label="团队" width="180" :filters="generateGroupNameFilters()"
            :filter-method="filterGroup" filter-placement="bottom-end" />
        <!-- <el-table-column prop="address" label="Address" :formatter="formatter" /> -->
    </el-table>
    <el-button type="primary" @click="openColumnConfigDialog">配置列</el-button>
    <el-dialog title="配置列显示" :visible.sync="columnConfigDialogVisible" width="30%">
        <el-checkbox-group v-model="selectedColumns">
            <el-checkbox label="run_number">编号</el-checkbox>
            <el-checkbox label="start_time">开始时间</el-checkbox>
            <el-checkbox label="end_time">结束时间</el-checkbox>
            <el-checkbox label="status">执行状态</el-checkbox>
            <el-checkbox label="group_name">团队</el-checkbox>
            <!-- 根据实际列名添加更多的checkbox -->
        </el-checkbox-group>
        <span slot="footer" class="dialog-footer">
            <el-button @click="columnConfigDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="saveColumnConfig">保存</el-button>
        </span>
    </el-dialog>
</template>

<script lang="js" setup>
import { onMounted, ref, watch } from 'vue';
import axios from 'axios';
import store from '@/store';

// 创建ref时传入初始值
const pipelineInfo = store.state.pipelineInfo;
const tableData = ref([]);

// 用于存储各列的原始数据备份，以便重置过滤器时恢复数据
const originalTableData = ref([]);

// 定义formatter函数，目前address列被注释掉，可按需修改
const formatter = (row, column) => {
    return row.address;
};

// 新增：用于控制配置列对话框显示状态的响应式数据
const columnConfigDialogVisible = ref(false);

// 新增：用于存储用户选择要显示的列的数组
const selectedColumns = ref([]);

onMounted(() => {
    query_run_number_list(pipelineInfo);
})

watch(pipelineInfo, (newValue, oldValue) => {
    query_run_number_list(pipelineInfo);
})

const query_run_number_list = (data) => {
    axios.post('http://127.00.1:5000/api/pipeline_detail_list', data).then((response) => {
        tableData.value = response.data;
        // 当获取到新数据时，同时更新原始数据备份
        originalTableData.value = response.data;
    })
}

// 定义run_number列的过滤方法
const filterRunNumber = (value, row) => {
    return row.run_number === value;
}

// 定义status列的过滤方法，已存在可直接使用
const filterStatus = (value, row) => {
    return row.status === value;
}

// 定义group_name列的过滤方法，已存在可直接使用
const filterGroup = (date, row) => {
    return row.group_name === date;
}

// 生成run_number列的过滤器数组
const generateRunNumberFilters = () => {
    const uniqueRunNumbers = [...new Set(tableData.value.map(row => row.run_number))];
    return uniqueRunNumbers.map(runNumber => ({
        text: runNumber,
        value: runNumber
    }));
}

// 生成status列的过滤器数组
const generateStatusFilters = () => {
    const uniqueStatuses = [...new Set(tableData.value.map(row => row.status))];
    return uniqueStatuses.map(status => ({
        text: status,
        value: status
    }));
}

// 生成group_name列的过滤器数组
const generateGroupNameFilters = () => {
    const uniqueGroupNames = [...new Set(tableData.value.map(row => row.group_name))];
    return uniqueGroupNames.map(groupName => ({
        text: groupName,
        value: groupName
    }));
}

// 重置所有过滤器的函数
const resetFilters = () => {
    tableData.value = originalTableData.value;
}

// 新增：打开配置列对话框的函数
const openColumnConfigDialog = () => {
    // 初始化选择要显示的列为当前所有列
    if (tableData.value.length > 0) {
        selectedColumns.value = Object.keys(tableData.value[0]);
    } else {
        selectedColumns.value = [];
    }
    columnConfigDialogVisible.value = true;
    // 确保Vue能够正确更新DOM，强制更新一次
    nextTick(() => {
        columnConfigDialogVisible.value = true;
    });
}

// 新增：保存配置列设置的函数
const saveColumnConfig = () => {
    const columnsToShow = selectedColumns.value;
    // 隐藏不在选择范围内的列
    tableData.value.forEach(row => {
        for (const key in row) {
            if (!columnsToShow.includes(key)) {
                row[key] = undefined;
            }
        }
    });
    columnConfigDialogVisible.value = false;
}

// 引入nextTick函数
import { nextTick } from 'vue';
</script>