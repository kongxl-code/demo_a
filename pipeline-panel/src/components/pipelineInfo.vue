<template>
    <div>
        <el-col>

            <el-row>
                <statusPie />
                <statusBar />
            </el-row>
        </el-col>
        


    </div>
</template>
<script lang="js" setup>
import statusPie from './pipeline_info/statusPie.vue';
import statusBar from './pipeline_info/statusBar.vue';
</script>