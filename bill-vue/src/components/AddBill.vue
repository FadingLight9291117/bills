<template>
    <el-form :model="billData" label-width="100px" class="bill-form">
        <el-form-item label="日期" prop="date">
            <el-date-picker v-model="billData.date" type="date" />
        </el-form-item>
        <el-form-item label="金额" prop="money" required>
            <el-input-number v-model.number="billData.money" :precision="2" :step="0.2" />
        </el-form-item>
        <el-form-item label="类别">
            <el-col :span="10">
                <el-form-item prop="cls" required>
                    <el-select v-model="billData.cls">
                        <el-option v-for="item in cls2labelMap.keys()" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="4" class="text-center"> <span>-</span></el-col>
            <el-col :span="10">
                <el-form-item prop="label">
                    <el-select v-model="billData.label">
                        <el-option v-for="item in cls2labelMap.get(billData.cls)" :key="item" :label="item"
                            :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-form-item>
        <el-form-item label="备注" prop="label">
            <el-input type="textarea" v-model="billData.options" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
        </el-form-item>
    </el-form>

</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import cls2label from '../data/clsAndLabel'

interface IBill {
    date: string
    money: string | number
    cls: string
    label: string
    options?: string
}
// 选项数据

const cls2labelMap = new Map(Object.entries(cls2label));

const formateDate = (number: string) => number.length === 1 ? '0' + number : number

function nowDate() {
    const now = new Date();
    let year = now.getFullYear().toString();
    let month = (now.getMonth() + 1).toString();
    let day = now.getDate().toString();
    return `${year}-${formateDate(month)}-${formateDate(day)}`;
}

const billData = reactive<IBill>({
    date: nowDate(),
    money: '',
    cls: '',
    label: '',
})


// 按钮事件
function clear() {
    billData.money = ''
    billData.cls = ''
    billData.label = ''
    billData.options = ''
}
function submitForm() {
    if (billData.money != '' && billData.cls != '') {
        console.log(JSON.stringify(billData))
        fetch("/api/addBill", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }, // 必须添加，否则后端接收不到json
            body: JSON.stringify(billData)
        })
            .then(res => res.json())
            .then(console.log)
        clear()
    } else {
        alert("请填写完整")
    }
}
function resetForm() {
    billData.date = nowDate();
    clear();
}
</script>
<style lang="less" scoped>
* {
    text-align: left;
}

.bill-form {
    width: 50%;
}

.el-row {
    margin-bottom: 20px;

    &:last-child {
        margin-bottom: 0;
    }
}

.text-center {
    text-align: center;
    margin: 0 10px;
}
</style>