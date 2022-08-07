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
    id: '/home',
    path: '/home',
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
        id: '/student',
        path: '/student',
        name: '学生信息',
        meta: {
          name: '学生信息',
        },
      },
      {
        id: '/grade',
        path: '/grade',
        name: '学生成绩',
        meta: {
          name: '学生成绩',
        },
      },
    ],
  },
]

export default navMenu
