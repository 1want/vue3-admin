export interface ColumnConfig {
  prop: string
  label: string
  minWidth?: string | number
  type?: string
}

export const columns: ColumnConfig[] = [
  {
    prop: 'date',
    label: '公司',
    minWidth: 180
  },
  {
    prop: 'date',
    label: '坐标',
    minWidth: 180
  },
  {
    prop: 'date',
    label: '时间',
    minWidth: 180
  },
  {
    prop: 'name',
    label: 'Name',
    minWidth: 180
  },
  {
    prop: 'photo',
    label: '是否拍照',
    type: 'switch',
    minWidth: 180
  }
]
