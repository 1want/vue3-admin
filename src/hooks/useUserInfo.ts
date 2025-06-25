import { reactive, toRefs } from 'vue'

const state = reactive({
  isCollapse: false
})

const useUserInfo = () => {
  const toggleCollapse = () => {
    state.isCollapse = !state.isCollapse
  }
  return {
    ...toRefs(state),
    toggleCollapse
  }
}

export default useUserInfo
