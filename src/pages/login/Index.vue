<template>
  <div class="login">
    <div class="login-btn" @click="login">登录</div>
  </div>
</template>
<script setup lang="ts">
import { getLogin } from '@/apis/login'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const username = ref('')
const password = ref('')

function deCode(str: string) {
  const encode = encodeURI(str)
  const base64 = btoa(encode)
  return base64
}
/** 登录 */
async function login() {
  if (username.value && password.value) {
    const res = await getLogin(username.value, deCode(password.value))
    if (res) {
      sessionStorage.setItem('userType', JSON.stringify(res))
      router.push('./')
      username.value = ''
      password.value = ''
    } else {
      sessionStorage.removeItem('userType')
    }
  }
}
</script>
<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #000410;
  box-sizing: border-box;
  padding: 70px 17px 0 17px;
}
</style>
