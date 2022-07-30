<template>
  <div class="login">
    <div class="content">
      <h1>后台管理系统</h1>
      <el-tabs type="border-card" stretch class="el-tabs" v-model="tabsName">
        <el-tab-pane name="name">
          <template #label>
            <span><i class="el-icon-s-custom"></i> 用户名登陆</span>
          </template>
          <UserLogin ref="loginUserRef"></UserLogin>
        </el-tab-pane>
        <el-tab-pane name="userphone">
          <template #label>
            <span><i class="el-icon-mobile-phone"></i> 手机号登陆</span>
          </template>
          <PhoneLogin ref="loginPhoneRef"></PhoneLogin>
        </el-tab-pane>
      </el-tabs>
      <div class="login-select">
        <el-checkbox v-model="rememberPassword">记住密码</el-checkbox>
        <el-link type="primary">忘记密码</el-link>
      </div>
      <el-button type="primary" class="login-commit" @click="logInNow">立即登陆</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import type { Ref } from "vue"
import UserLogin from "./childrens/UserLogin.vue";
import PhoneLogin from "./childrens/PhoneLogin.vue";

let tabsName: Ref<string> = ref("name")
let rememberPassword = ref<boolean>(true)
const loginUserRef = ref<InstanceType<typeof UserLogin>>()
const loginPhoneRef = ref<InstanceType<typeof PhoneLogin>>()

const logInNow = () => {
  loginUserRef.value?.userFormValidate()
}

</script>

<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;
  background: url(../../assets/background_img.jpg) center center no-repeat;
  background-size: 100% 100%;

  .content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin-top: -100px;

    h1 {
      text-align: center;
    }

    .el-tabs {
      width: 320px;
    }

    .login-select {
      display: flex;
      margin-top: 5px;
      color: yellowgreen;
      justify-content: space-between;
    }

    .login-commit {
      margin-top: 10px;
      width: 100%;
    }
  }
}
</style>
