interface RootObject {
  id: string
  path?: string
  name: string
  icon?: string
  children?: Array<RootObject>
}

const navMenu: Array<RootObject> = [
  {
    id: '/main/home',
    path: '/main/home',
    name: '首页',
    icon: 'House',
  },
  {
    id: 'student',
    path: 'student',
    name: '学生管理',
    icon: 'Monitor',
    children: [
      {
        id: '/main/student',
        path: '/main/student',
        name: '学生信息',
      },
      {
        id: '/main/grade',
        path: '/main/grade',
        name: '学生成绩',
      },
    ],
  },
  {
    id: '/main/test',
    path: '/main/test',
    name: '测试',
    icon: 'Monitor',
  },
]

export default navMenu
