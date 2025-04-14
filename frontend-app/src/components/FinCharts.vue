<template>
    <br>
    <div class="row">
        <div class="col-sm-6 mb-3 mb-sm-0">
            <div class="card">
                <div id="pie-chart" class="echarts" ref="chart_pie"></div>
            </div>
        </div>

        <div class="col-sm-6">
            <div class="card">
                <div id="bar-chart" class="echarts" ref="chart_bar"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

let chart_bar = ref();
let chart_pie = ref();
</script>

<style lang="scss" src="../assets/additional.scss" scoped></style>
<style lang="scss" src="../assets/bootstrap-icons/font/bootstrap-icons.scss" scoped></style>

