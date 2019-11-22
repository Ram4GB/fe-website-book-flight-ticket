// Remember item has key[required],name[required],icon[required],children[optional]
const menu = {
  admin: [
    {
      key: 'admin/dashboard',
      name: 'Bảng điều khiển',
      icon: 'safety-certificate',
      children: [],
    },
    {
      key: 'admin/staff',
      name: 'Nhân viên',
      icon: 'user',
      children: [],
    },
    {
      key: 'admin/customer',
      name: 'Khách hàng',
      icon: 'user',
      children: [],
    },
    {
      key: 'admin/flight',
      name: 'Chuyến bay',
      icon: 'rocket',
      children: [],
    },
    {
      key: 'admin/seat',
      name: 'Loại vé',
      icon: 'credit-card',
      children: [],
    },
    {
      key: 'admin/airline',
      name: 'Hãng hàng không',
      icon: 'rocket',
      children: [],
    },
    {
      key: 'admin/airport',
      name: 'Sân bay',
      icon: 'bank',
      children: [],
    },

    {
      key: 'admin/location',
      name: 'Địa điểm',
      icon: 'bank',
      children: [],
    },
    {
      key: 'admin/order',
      name: 'Hóa đơn',
      icon: 'file-text',
      children: [],
    },
  ],
  staff: [
    {
      key: 'admin/dashboard',
      name: 'Bảng điều khiển',
      icon: 'safety-certificate',
      children: [],
    },
    {
      key: 'admin/customer',
      name: 'Khách hàng',
      icon: 'user',
      children: [],
    },
    {
      key: 'admin/order',
      name: 'Hóa đơn',
      icon: 'file-text',
      children: [],
    },
  ],
  customer: [
    {
      key: 'admin/order',
      name: 'Hóa đơn',
      icon: 'file-text',
      children: [],
    },
  ],
}
export default menu
