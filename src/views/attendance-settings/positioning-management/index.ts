export interface ColumnConfig {
  prop: string
  label: string
  minWidth?: string | number
  type?: string
}

export const columns: ColumnConfig[] = [
  {
    prop: 'company',
    label: '公司',
    minWidth: 180
  },
  {
    prop: 'latitude',
    label: '横坐标',
    minWidth: 180
  },
  {
    prop: 'longitude',
    label: '纵坐标',
    minWidth: 180
  },
  {
    prop: 'isPhoto',
    label: '是否拍照',
    type: 'switch',
    minWidth: 180
  }
]
