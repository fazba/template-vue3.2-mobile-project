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
  .title {
    font-size: 32px;
    display: flex;
    flex-direction: column;
    color: #fff;
    span:last-child {
      margin-top: 20px;
    }
  }
  .form {
    display: flex;
    flex-direction: column;
    input:first-child {
      margin-top: 50px;
    }
    input {
      width: 100%;
      height: 49px;
      border-radius: 5px;
      background-color: #000410;
      margin-top: 24px;
      font-size: 16px;
      padding-left: 10px;
      box-sizing: border-box;
      border: 1px solid #999999;
      color: #fff;
      // outline: medium;
    }
  }
  .bg {
    width: 100%;
    height: 200px;
    position: fixed;
    bottom: 0;
    left: 0;
    img {
      width: 100%;
    }
  }
  .login-btn {
    width: 100%;
    height: 49px;
    background-color: #56a4ff;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    margin-top: 150px;
    border-radius: 5px;
  }
}
</style>
