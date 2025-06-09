import {LeftOutlined} from "@ant-design/icons";
import {Button} from "antd";
import useQuery from "../../hooks/useQuery.tsx";

const BackTo = () => {
  const { goBackAndClearQuery} = useQuery();
  return <Button onClick={goBackAndClearQuery} icon={<LeftOutlined />}>Orqaga qaytish</Button>
 }
 export default BackTo;