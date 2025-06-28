<template>
  <el-table
    border
    ref="tableRef"
    v-bind="$attrs"
    :data="tableData"
    v-loading="loading"
    height="calc(100vh - 172px)"
    style="width: 100%"
  >
    <el-table-column v-if="showSelection" type="selection" width="55" />
    <template v-for="column in columns" :key="column.prop">
      <el-table-column
        :prop="column.prop"
        :label="column.label"
        :min-width="column.minWidth"
        :sortable="column.sortable"
        :align="column.align || 'center'"
      >
        <template #default="scope">
          <template v-if="column.type === 'tag'">
            <el-tag :type="getTagType(scope.row, column)">
              {{ scope.row[column.prop] }}
            </el-tag>
          </template>

          <template v-else-if="column.type === 'switch'">
            <el-switch v-model="scope.row[column.prop]" />
          </template>

          <template v-else-if="column.type === 'image'">
            <el-image
              :src="scope.row[column.prop]"
              :preview-src-list="[scope.row[column.prop]]"
              fit="cover"
            />
          </template>

          <template v-else>
            {{ scope.row[column.prop] }}
          </template>
        </template>
      </el-table-column>
    </template>

    <!-- 操作列 -->
    <el-table-column
      v-if="operations?.length"
      label="操作"
      :width="operations.length * 75"
      fixed="right"
      align="center"
    >
      <template #default="scope">
        <template v-for="operation in operations" :key="opIndex">
          <el-button
            :type="operation.type || 'primary'"
            size="small"
            :disabled="operation.disabled?.(scope.row) || false"
            @click="operation.onClick(scope.row, scope.$index)"
          >
            {{ operation.label }}
          </el-button>
        </template>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination
    v-if="showPagination"
    :current-page="currentPage"
    :page-size="pageSize"
    :page-sizes="pageSizes"
    :total="total"
    :layout="paginationLayout"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { PropType } from 'vue'

interface TableColumnConfig {
  prop: string
  label: string
  minWidth?: number
  sortable?: boolean
  align?: 'left' | 'center' | 'right'
  type?: 'tag' | 'switch' | 'image' | string
}

// 操作按钮配置类型
interface TableOperation {
  label: string
  type?: string
  disabled?: (row: any) => boolean
  onClick: (row: any, index: number) => void
}

defineProps({
  // 表格数据
  tableData: {
    type: Array,
    required: true,
    default: () => []
  },
  // 列配置
  columns: {
    type: Array as PropType<TableColumnConfig[]>,
    required: true,
    default: () => []
  },
  // 是否显示加载状态
  loading: {
    type: Boolean,
    default: false
  },
  // 是否显示选择列
  showSelection: {
    type: Boolean,
    default: true
  },
  // 操作按钮配置
  operations: {
    type: Array as PropType<TableOperation[]>,
    default: () => []
  },
  // 分页相关配置
  showPagination: {
    type: Boolean,
    default: true
  },
  // 总条数
  total: {
    type: Number,
    default: 0
  },
  // 当前页码
  currentPage: {
    type: Number,
    default: 1
  },
  // 每页条数
  pageSize: {
    type: Number,
    default: 10
  },
  // 可选的每页条数
  pageSizes: {
    type: Array,
    default: () => [10, 20, 50, 100]
  },
  // 分页器布局
  paginationLayout: {
    type: String,
    default: 'prev, pager, next,total, sizes'
  }
})

// 定义事件
const emit = defineEmits([
  'update:currentPage',
  'update:pageSize',
  'size-change',
  'current-change',
  'selection-change'
])

// 表格实例引用
const tableRef = ref(null)

// 处理分页事件
const handleSizeChange = (val: number) => {
  emit('update:pageSize', val)
  emit('size-change', val)
}

const handleCurrentChange = (val: number) => {
  emit('update:currentPage', val)
  emit('current-change', val)
}

// 获取标签类型方法
const getTagType = (row: any, column: any) => {
  if (typeof column.tagType === 'function') {
    return column.tagType(row)
  }
  return column.tagType || ''
}

// 暴露表格方法
defineExpose({
  // 获取表格实例
  getTableRef: () => tableRef.value,
  // 清除所选行
  clearSelection: () => tableRef.value?.clearSelection(),
  // 切换行选中状态
  toggleRowSelection: (row: any, selected?: boolean) => {
    tableRef.value?.toggleRowSelection(row, selected)
  },
  // 切换全选状态
  toggleAllSelection: () => tableRef.value?.toggleAllSelection(),
  // 获取选中行数据
  getSelectionRows: () => tableRef.value?.getSelectionRows?.() || []
})
</script>

<style lang="scss" scoped>
.el-pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
