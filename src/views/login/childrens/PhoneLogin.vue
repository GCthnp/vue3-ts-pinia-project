<template>
  <div class="login-phone">
    <el-form label-width="70px" :model="account" :rules="loginPhoneRules" ref="elFormRef" class="el-form">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="account.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="code">
        <div class="password-btn">
          <el-input v-model="account.code" type="password"></el-input>
          <el-button type="primary" class="el-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang='ts'>
import { ref, reactive } from "vue"
import type { FormInstance, FormRules } from 'element-plus'
import type { phoneFormType } from "./LoginType"

const elFormRef = ref<FormInstance>()
const account = reactive<phoneFormType>({
  phone: "",
  code: "",
})
const loginPhoneRules = reactive<FormRules>({
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    {
      pattern: /^\w{0,11}$/,
      message: "请输入正确的手机号~",
      trigger: "blur"
    },
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
  ]
})

</script>
<style scoped lang="less">
.el-form {
  // padding-top: 10px;

  .password-btn {
    display: flex;

    .el-btn {
      margin-left: 5px;
      padding-left: 5px;
      padding-right: 5px;
    }
  }
}
</style>