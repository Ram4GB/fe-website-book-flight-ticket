// Remember item has key[required],name[required],icon[required],children[optional]
const menu = {
  admin: [
    {
      key: "admin/dashboard",
      name: "Bảng điều khiển",
      icon: "safety-certificate",
      children: []
    },
    {
      key: "admin/staff",
      name: "Nhân viên",
      icon: "user",
      children: []
    },
    {
      key: "admin/customer",
      name: "Khách hàng",
      icon: "user",
      children: []
    },
    {
      key: "admin/order",
      name: "Hóa đơn",
      icon: "file-text",
      children: []
    }
  ]
};
export default menu;
