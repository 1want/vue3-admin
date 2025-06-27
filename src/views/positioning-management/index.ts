export interface ColumnConfig {
  prop: string
  label: string
  width?: string | number
}

export const columns: ColumnConfig[] = [
  {
    prop: 'date',
    label: '公司',
    width: 180
  },
  {
    prop: 'date',
    label: '坐标',
    width: 180
  },
  {
    prop: 'date',
    label: '时间',
    width: 180
  },
  {
    prop: 'name',
    label: 'Name',
    width: 180
  },
  {
    prop: 'photo',
    label: '是否拍照'
  }
]
