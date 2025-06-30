<template>
  <CustomTable
    :tableData="tableData"
    :columns="columns"
    :total="total"
    v-model:currentPage="currentPage"
    v-model:pageSize="pageSize"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
    :operations="operations"
  />
  <el-dialog v-model="dialogVisible" title="编辑" width="500" draggable>
    <el-form :model="form" label-width="80px">
      <el-form-item label="公司">
        <el-input v-model="form.company" />
      </el-form-item>
      <el-form-item label="横坐标">
        <el-input v-model="form.latitude" />
      </el-form-item>
      <el-form-item label="纵坐标">
        <el-input v-model="form.longitude" />
      </el-form-item>
      <el-form-item label="是否拍照">
        <el-switch v-model="form.isPhoto"></el-switch>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { columns } from './index.ts'
import CustomTable from '@/components/custom-table.vue'

const total = ref(1000)
const form = reactive({
  company: '',
  latitude: '',
  longitude: '',
  isPhoto: false
})
const dialogVisible = ref(false)
const operations = ref([
  {
    label: '编辑',
    type: 'primary',
    onClick: (row: any) => {
      dialogVisible.value = true
      Object.keys(form).forEach(value => {
        ;(form as any)[value] = (row as any)[value]
      })
    }
  }
])
const currentPage = ref(1)
const pageSize = ref(10)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
const tableData = [
  {
    company: 'huli',
    latitude: 12.32,
    longitude: 121.3131,
    isPhoto: false
  },
  {
    company: 'lius',
    latitude: 32.32,
    longitude: 1.739,
    isPhoto: true
  },
  {
    company: 'wuli',
    latitude: 112.32,
    longitude: 1.81,
    isPhoto: false
  }
]
</script>

<style lang="scss" scoped></style>
