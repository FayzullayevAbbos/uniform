import {Tabs} from "antd";
import {AppstoreOutlined, TagsOutlined, UnorderedListOutlined} from "@ant-design/icons";
import UniformsDetail from "./uniforms-detail/UniformsDetail.tsx";
import UniformsType from "./uniforms-type/UniformsType.tsx";
import UniformsCategories from "./uniforms-categories/UniformsCategories.tsx";

const Uniforms = () => {

  const tabItems = [
    {
      key: "uniforms",
      label: "Uniformalar",
      icon: <AppstoreOutlined/>,
      children: <UniformsDetail/>
    },
    {
      key: "types",
      label: "Turlari",
      icon: <UnorderedListOutlined/>,
      children: <UniformsType/>
    },
    {
      key: "categories",
      label: "Kategoriyalar",
      icon: <TagsOutlined/>,
      children: <UniformsCategories/>
    },
  ];

  return (
    <div className={"h-full"}>
      <div className="bg-main rounded-2xl w-full min-h-screen bg-white mt-2 p-4 ">
        <Tabs type="card" items={tabItems}/>
      </div>
    </div>
  );
}
export default Uniforms;
