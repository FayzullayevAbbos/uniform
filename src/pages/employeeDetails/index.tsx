import { Badge, Tabs } from "antd";
import EmployeeDetailsTop from "./EmployeeDetailsTop.tsx";
import {
  FileTextOutlined,
  IdcardOutlined,
  PictureOutlined,
  ToolOutlined,
} from "@ant-design/icons";

const tabItems = [
  {
    key: "info",
    label: (
      <span>
        <IdcardOutlined /> Hodim ma'lumotlari
      </span>
    ),
    children: <div>Hodim ma'lumotlari</div>,
  },
  {
    key: "tech",
    label: (
      <span>
        <ToolOutlined /> Texnik ko'riklari
      </span>
    ),
    children: <div>Texnik ko'riklari</div>,
  },
  {
    key: "penalty",

    label: (
        <div className={'relative'}>
          <Badge className={'absolute -top-2 -right-5'}  count={3} />
          <FileTextOutlined /> Jarimalari
        </div>
    ),
    children: <div>Jarimalari</div>,
  },
  {
    key: "images",
    label: (
      <span>
        <PictureOutlined /> Rasmlar
      </span>
    ),
    children: <div>Rasmlar</div>,
  },
];

export default function EmployeeDetails() {
  return (
    <div className={"h-full"}>
      <EmployeeDetailsTop />
      <div className="bg-main rounded-2xl w-full min-h-screen bg-white mt-2 p-4">
        <Tabs type="card" items={tabItems} />
      </div>
    </div>
  );
}
