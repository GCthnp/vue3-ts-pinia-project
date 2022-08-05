<template>
  <el-card class="student-card">
    <div class="student-search">
      <el-input v-model="input3" placeholder="请输入关键字" clearable>
        <template #prepend>
          <el-select v-model="select" style="width: 115px">
            <el-option label="按学号" value="id" />
            <el-option label="按姓名" value="name" />
          </el-select>
        </template>
        <template #append>
          <el-button :icon="Search" @click="searchStudent" />
        </template>
      </el-input>
      <el-button type="primary" @click="addStduent">添加学生</el-button>
    </div>
    <el-table :data="paginationData" border style="width: 100%" height="70vh" :row-style="stuRowStyle">
      <el-table-column prop="id" label="学号" width="180" />
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="sex" label="性别" width="180" />
      <el-table-column prop="phone" label="联系方式" />
      <el-table-column prop="address" label="家庭地址" />
      <el-table-column prop="className" label="班级" />
      <el-table-column label="Operations">
        <template #default="scope">
          <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination @current-change="handleCurrentChange" small background layout="prev, pager, next"
      v-model:current-page="pageNum" :total="studentTableData?.length" :page-size="pageSize"
      class="mt-4 stu-pagination" />
  </el-card>

  <Dialog ref="addStudentDialog" title="添加学生" @dialog-confirm="AddDialogConfirm">
    <AddEditStudent ref="addStudentRef"></AddEditStudent>
  </Dialog>
  <Dialog ref="EditStudentDialog" title="编辑学生" @dialog-confirm="EditDialogConfirm">
    <AddEditStudent ref="editStudentRef" :editStudent="editStudent"></AddEditStudent>
  </Dialog>

</template>
<script setup lang='ts'>
import { reactive, ref, onBeforeMount } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { getStudentList } from "@/serves/api";
import Dialog from '@/components/dialog/Dialog.vue';
import AddEditStudent from "./dhildrens/AddEditStudent.vue"
import type { AddEditStudentFormType } from "./type"

const input3 = ref('')
const select = ref('按学号')
const pageSize = ref(8)
const pageNum = ref(1)

const editStudent = ref<AddEditStudentFormType>()
const studentTableData = ref<AddEditStudentFormType[]>()
const paginationData = ref<AddEditStudentFormType[]>()
const addStudentDialog = ref<InstanceType<typeof Dialog>>()
const addStudentRef = ref<InstanceType<typeof AddEditStudent>>()
const EditStudentDialog = ref<InstanceType<typeof Dialog>>()
const editStudentRef = ref<InstanceType<typeof AddEditStudent>>()

const stuRowStyle = {
  height: '10vh'
}
onBeforeMount(() => {
  initStudentTable()
})
const searchStudent = () => {
  console.log(input3.value);
}
// 切换分页
const handleCurrentChange = (val: number) => {
  console.log(val);
  paginationData.value = studentTableData.value?.slice((val - 1) * pageSize.value, pageSize.value * val)
}
const addStduent = (): void => {
  addStudentDialog.value?.showDoalog()
}
/**添加学生信息确认 */
const AddDialogConfirm = async () => {
  let stuForm = addStudentRef.value?.AddEditStudentForm as AddEditStudentFormType
  stuForm = JSON.parse(JSON.stringify(stuForm))
  studentTableData.value?.unshift(stuForm)
  console.log(studentTableData.value);

  pageNum.value = 1
  paginationData.value = studentTableData.value?.slice(0, pageSize.value)
  addStudentRef.value?.reset()
}

/**初始化学生信息 */
const initStudentTable = async () => {
  try {
    let res = await getStudentList()
    // console.log(res, "student--------");
    if (res.code == "200") {
      studentTableData.value = res.data
      // studentTableData.value = res.data
      paginationData.value = studentTableData.value?.slice((pageNum.value - 1) * pageSize.value, pageSize.value)
      console.log(studentTableData.value?.length);
      console.log(paginationData.value?.length);
    }

  } catch (error) {
  }
}
const handleDelete = (index: number, row: AddEditStudentFormType) => {
  studentTableData.value?.splice(index, 1)
}
const handleEdit = (index: number, row: AddEditStudentFormType) => {
  editStudent.value = row
  EditStudentDialog.value?.showDoalog()
}
const EditDialogConfirm = () => {
  let stuForm = editStudentRef.value?.AddEditStudentForm
  let stuItme = studentTableData.value?.find((item, i) => item.id == stuForm?.id)
  if (!stuForm || !stuItme) return
  Object.keys(stuItme).forEach((key, i) => {
    stuItme[key] = stuForm[key]
  })
}

</script>
<style scoped lang="less">
.student-card {
  height: 100%;

  .student-search {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    :deep(.el-input-group) {
      width: 500px;
    }
  }

  .stu-pagination {
    margin: 15px auto;
    /* height: 100%; */
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>