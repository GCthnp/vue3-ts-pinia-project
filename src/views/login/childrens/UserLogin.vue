<template>
  <el-form ref="userFormRef" :model="userForm" :rules="rules" label-width="70px">
    <el-form-item label="用户名" prop="name">
      <el-input v-model="userForm.name" clearable />
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input v-model="userForm.password" show-password type="password" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive, getCurrentInstance } from "vue"
import { useRoute, useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import type { userFormType } from "./LoginType"
import { login } from "@/serves/api";

const router = useRouter()
const instance = getCurrentInstance()
const userFormRef = ref<FormInstance>()
const userForm = reactive<userFormType>({
  name: "admin",
  password: "123456"
})

const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 8, message: 'Length should be 3 to 8', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 18, message: 'Length should be 6 to 18', trigger: 'blur' },
  ]
})


const userFormValidate = async () => {
  await userFormRef.value?.validate((valid, fields) => {
    if (valid) {
      nowLogin()
    }
  })
}

const nowLogin = async () => {
  try {
    const res = await login(userForm)
    if (res.code == 200) {
      // instance.appContext.config.globalProperties.$message.success(res.message)
      instance?.proxy?.$message.success(res.message)
      localStorage.setItem("testToken", res.token)
      localStorage.setItem("testUser", JSON.stringify(userForm))
      router.replace("/main")
    } else {
      instance?.proxy?.$message.error(res.message)
    }
  } catch (error) {
    instance?.proxy?.$message.error(error)
  }
}

defineExpose({
  userFormValidate
})


</script>

<style scoped lang="less">
</style>
