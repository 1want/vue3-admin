export default [
  {
    name: 'attendance-settings',
    path: 'attendance-settings',
    component: () => import('@/views/attendance-settings/index.vue'),
    meta: {
      title: '考勤设置'
    },
    children: [
      {
        name: 'positioning-management',
        path: 'positioning-management',
        component: () =>
          import(
            '@/views/attendance-settings/positioning-management/index.vue'
          ),
        meta: {
          title: '打卡设置'
        }
      }
    ]
  },
  {
    name: 'work-management',
    path: 'work-management',
    component: () => import('@/views/work-management/index.vue'),
    meta: {
      title: '工作管理'
    },
    children: [
      {
        name: 'approval-management',
        path: 'approval-management',
        component: () =>
          import('@/views/work-management/approval-management/index.vue'),
        meta: {
          title: '审批管理'
        }
      },
      {
        name: 'attendance-management',
        path: 'attendance-management',
        component: () =>
          import('@/views/work-management/attendance-management/index.vue'),
        meta: {
          title: '考勤管理'
        }
      },
      {
        name: 'daily-report-management',
        path: 'daily-report-management',
        component: () =>
          import('@/views/work-management/daily-report-management/index.vue'),
        meta: {
          title: '日报管理'
        }
      },
      {
        name: 'leave-management',
        path: 'leave-management',
        component: () =>
          import('@/views/work-management/leave-management/index.vue'),
        meta: {
          title: '请假管理'
        }
      },
      {
        name: 'overtime-management',
        path: 'overtime-management',
        component: () =>
          import('@/views/work-management/overtime-management/index.vue'),
        meta: {
          title: '加班管理'
        }
      }
    ]
  }
]
