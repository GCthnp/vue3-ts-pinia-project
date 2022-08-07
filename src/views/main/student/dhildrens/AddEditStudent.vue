<template>
  <el-form ref="AddEditStudentRef" :model="AddEditStudentForm" label-width="70px">
    <el-form-item label="学号" prop="id">
      <el-input v-model="AddEditStudentForm.id" clearable />
    </el-form-item>
    <el-form-item label="姓名" prop="name">
      <el-input v-model="AddEditStudentForm.name" clearable />
    </el-form-item>
    <el-form-item label="性别">
      <el-select v-model="AddEditStudentForm.sex" style="width: 100%;">
        <el-option label="男" value="男" />
        <el-option label="女" value="女" />
      </el-select>
    </el-form-item>
    <el-form-item label="电话" prop="phone">
      <el-input v-model="AddEditStudentForm.phone" clearable />
    </el-form-item>
    <el-form-item label="地址" prop="address">
      <el-input v-model="AddEditStudentForm.address" clearable />
    </el-form-item>
    <el-form-item label="班级" prop="className">
      <el-cascader v-model="AddEditStudentForm.className" :options="options" @change="classChange"
        :show-all-levels="false" style="width: 100%;" clearable />
    </el-form-item>

  </el-form>
</template>
<script setup lang='ts'>
import { ref, watchEffect, nextTick, type Ref } from "vue"
import type { FormInstance } from 'element-plus'
import type { AddEditStudentFormType } from "../type"

interface Props {
  editStudent?: AddEditStudentFormType,
}
const props = defineProps<Props>()

watchEffect(async () => {
  if (props.editStudent?.id) {
    await nextTick()
    AddEditStudentForm.value = JSON.parse(JSON.stringify(props.editStudent))
  }
})


const AddEditStudentRef = ref<FormInstance>()
const AddEditStudentForm = ref<AddEditStudentFormType>({
  id: '',
  name: '',
  sex: '男',
  phone: null,
  address: '',
  className: ''
})

const options = [
  {
    value: 'xx大学',
    label: 'xx大学',
    children: [
      {
        value: '信息工程学院',
        label: '信息工程学院',
        children: [
          {
            value: '18本软件1班',
            label: '18本软件1班',
          },
          {
            value: '18本软件2班',
            label: '18本软件2班',
          },
          {
            value: '17专计网1班',
            label: '17专计网1班',
          }
        ],
      },
      {
        value: '管理学院',
        label: '管理学院',
        children: [
          {
            value: '19本会计1班',
            label: '19本会计1班',
          },
          {
            value: '19本会计2班',
            label: '19本会计2班',
          },
        ],
      },
    ],
  }
]

const classChange = (value: Array<string>) => {
  AddEditStudentForm.value.className = value[2]
}

const reset = (res = AddEditStudentRef) => {
  res.value?.resetFields()
}
const getsss = () => {
  console.log(AddEditStudentForm);

}

// const AddEditStudentFormValidate = async () => {
//   await AddEditStudentRef.value?.validate((valid, fields) => {
//     if (valid) {
//       // nowLogin()
//     }
//   })
// }
defineExpose({
  // AddEditStudentFormValidate,
  AddEditStudentForm,
  reset,
  getsss
})

</script>
<style scoped>
</style>