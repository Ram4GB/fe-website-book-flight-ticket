// Remember item has key[required],name[required],icon[required],children[optional]
const menu = {
  admin: [
    {
      key: 'dashboard',
      name: 'Dashboard',
      icon: 'safety-certificate',
      children: []
    },
    {
      key: 'user',
      name: 'User',
      icon: 'user',
      children: [
        {
          key: 'user',
          name: 'User 1',
          icon: 'user'
        },
        {
          key: 'user-2',
          name: 'User 2',
          icon: 'user'
        }
      ]
    },
    {
      key: 'food',
      name: 'Food',
      icon: 'setting',
      children: []
    },
    {
      key: 'setting',
      name: 'Setting',
      icon: 'setting',
      children: []
    }
  ]
}
export default menu
