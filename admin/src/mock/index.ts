import Mock from 'mockjs'
import './demo'
import './dict'
Mock.setup({
  timeout: 500,
})

Mock.mock('/api/auth/menu', 'get', {
  code: 200,
  data: [
    {
      icon: 'HomeOutlined',
      title: '首页',
      path: '/home/index',
    },
    {
      icon: 'SettingOutlined',
      title: '示例',
      path: '/demo',
      children: [
        {
          icon: 'SettingOutlined',
          path: '/demo/crud-demo',
          title: '基本示例',
        },
      ],
    },
    {
      icon: 'ProfileOutlined',
      title: '菜单嵌套',
      path: '/menu',
      children: [
        {
          icon: 'AppstoreOutlined',
          path: '/menu/menu1',
          title: '菜单1',
        },
        {
          icon: 'AppstoreOutlined',
          path: '/menu/menu2',
          title: '菜单2',
          children: [
            {
              icon: 'AppstoreOutlined',
              path: '/menu/menu2/menu21',
              title: '菜单2-1',
            },
            {
              icon: 'AppstoreOutlined',
              path: '/menu/menu2/menu22',
              title: '菜单2-2',
              children: [
                {
                  icon: 'AppstoreOutlined',
                  path: '/menu/menu2/menu22/menu221',
                  title: '菜单2-2-1',
                },
                {
                  icon: 'AppstoreOutlined',
                  path: '/menu/menu2/menu22/menu222',
                  title: '菜单2-2-2',
                },
              ],
            },
            {
              icon: 'AppstoreOutlined',
              path: '/menu/menu2/menu23',
              title: '菜单2-3',
            },
          ],
        },
        {
          icon: 'AppstoreOutlined',
          path: '/menu/menu3',
          title: '菜单3',
        },
      ],
    },
  ],
  msg: '成功',
})

Mock.mock('/api/auth/login', 'post', {
  code: 200,
  data: {
    token: 'bqddxxwqmfncffacvbpkuxvwvqrhln',
  },
  msg: '成功',
})
