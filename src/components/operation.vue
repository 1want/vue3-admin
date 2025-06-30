<template>
  <div class="operation-bar">
    <div class="button-area">
      <template v-for="(button, index) in buttons" :key="index">
        <el-button
          v-if="!button.hidden"
          :type="button.type || 'default'"
          :icon="button.icon"
          :disabled="button.disabled"
          @click="handleButtonClick(button)"
        >
          {{ button.label }}
        </el-button>
      </template>
      <slot name="buttons"></slot>
    </div>

    <div class="search-area">
      <el-form :model="formData" :inline="true" class="search-form">
        <template v-for="(item, index) in formItems" :key="index">
          <el-form-item v-if="item.type === 'input'">
            <el-input
              v-model="formData[item.prop]"
              :placeholder="item.placeholder"
              clearable
              @keyup.enter="handleSearch"
            />
          </el-form-item>

          <el-form-item v-else-if="item.type === 'select'">
            <el-select
              v-model="formData[item.prop]"
              :placeholder="item.placeholder"
              clearable
            >
              <el-option
                v-for="(option, i) in item.options"
                :key="i"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item v-else-if="item.type === 'date'">
            <el-date-picker
              v-model="formData[item.prop]"
              :type="item.dateType || 'date'"
              :placeholder="item.placeholder"
              clearable
            />
          </el-form-item>

          <el-form-item v-else-if="item.type === 'daterange'">
            <el-date-picker
              v-model="formData[item.prop]"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              clearable
            />
          </el-form-item>
        </template>

        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">
            查询
          </el-button>
          <el-button :icon="Refresh" @click="handleReset">重置</el-button>
        </el-form-item>

        <slot name="form-items"></slot>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, defineProps, defineEmits } from 'vue'
import { Search, Refresh } from '@element-plus/icons-vue'

interface ButtonItem {
  label: string
  type?:
    | 'primary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'default'
    | 'text'
  icon?: any
  disabled?: boolean
  hidden?: boolean
  handler?: () => void
  key: string
}

interface FormItem {
  type: 'input' | 'select' | 'date' | 'daterange'
  prop: string
  placeholder?: string
  options?: { label: string; value: any }[] // 仅用于select类型
  dateType?: 'date' | 'datetime' | 'month' | 'year' // 仅用于date类型
}

const props = defineProps({
  buttons: {
    type: Array as () => ButtonItem[],
    default: () => []
  },
  formItems: {
    type: Array as () => FormItem[],
    default: () => []
  },
  initialFormData: {
    type: Object,
    default: () => ({})
  }
})

const emits = defineEmits([
  'button-click',
  'search',
  'reset',
  'update:formData'
])

// 创建表单数据对象
const formData = reactive({ ...props.initialFormData })

// 按钮点击处理
const handleButtonClick = (button: ButtonItem) => {
  if (button.handler) {
    button.handler()
  }
  emits('button-click', button.key, button)
}

// 查询操作
const handleSearch = () => {
  emits('search', formData)
  emits('update:formData', formData)
}

// 重置操作
const handleReset = () => {
  Object.keys(formData).forEach(key => {
    formData[key] = props.initialFormData[key] || undefined
  })
  emits('reset', formData)
  emits('update:formData', formData)
}
</script>

<style lang="scss" scoped>
.operation-bar {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .button-area {
    display: flex;
    align-items: center;
  }

  .search-area {
    flex: 1;
    .search-form {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-end;

      .el-form-item {
        margin-right: 10px;
        margin-bottom: 0;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .operation-bar {
    flex-direction: column;

    .button-area,
    .search-area {
      width: 100%;
    }
  }
}
</style>
