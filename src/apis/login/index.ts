import { server } from '@/plugins/axios'

/**登录 */
export const getLogin = async (username: string, password: string) => {
  const res = await server.post('/user/login', { username, password })
  return res
}
