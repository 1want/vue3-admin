import axios from 'axios'

const pending = new Map()

const addPending = config => {
  const url = [config.method, config.url, JSON.stringify(config.data)].join('&')
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken(cancel => {
      if (!pending.has(url)) {
        // 如果 pending 中不存在当前请求，则添加进去
        pending.set(url, cancel)
      }
    })
}

const removePending = config => {
  const url = [config.method, config.url].join('&')
  if (pending.has(url)) {
    // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
    const cancel = pending.get(url)
    cancel(url)
    pending.delete(url)
  }
}

function request(option) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: import.meta.env.VITE_BASE_API,
      method: option.methods || 'POST',
      timeout: 1000000
    })

    instance.interceptors.request.use(
      res => {
        removePending(res)
        addPending(res)
        return res
      },
      err => {
        return err
      }
    )

    instance.interceptors.response.use(response => {
      removePending(option)
      return response
    })

    instance(option)
      .then(
        res => {
          if (res.status === 200) {
            resolve(res.data)
          }
        },
        err => {
          reject(err)
        }
      )
      .catch(err => {
        console.log(err)
      })
  })
}
export default request
