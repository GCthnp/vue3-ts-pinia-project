interface RootObject {
  id: string
  path?: string
  name: string
  icon?: string
  children?: Array<RootObject>
  meta: MenuMeta
}
interface MenuMeta {
  name: string
}
const navMenu: Array<RootObject> = [
  {
    id: '/main/home',
    path: '/main/home',
    name: '首页',
    icon: 'House',
    meta: {
      name: '首页',
    },
  },
  {
    id: 'student',
    path: 'student',
    name: '学生管理',
    icon: 'Monitor',
    meta: {
      name: '学生管理',
    },
    children: [
      {
        id: '/main/student',
        path: '/main/student',
        name: '学生信息',
        meta: {
          name: '学生信息',
        },
      },
      {
        id: '/main/grade',
        path: '/main/grade',
        name: '学生成绩',
        meta: {
          name: '学生成绩',
        },
      },
    ],
  },
  {
    id: '/main/test',
    path: '/main/test',
    name: '测试',
    icon: 'Monitor',
    meta: {
      name: '测试',
    },
  },
]

export default navMenu
