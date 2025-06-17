import { FilterOutlined } from "@ant-design/icons";
import { Select, Typography } from "antd";
import { useApiRequestQuery } from "../../service/Api";
import { departments, employees } from "../../service/URLs.ts";
import useQuery from "../../hooks/useQuery.tsx";

const { Option } = Select;
const { Title, Text } = Typography;

const TechinkFilter = () => {
  const { MergeQueryParams } = useQuery();

  const { data: employeesData } = useApiRequestQuery({
    url: employees,
    params: { page_size: 100 },
    method: "GET",
  });

  const { data: departmentsData } = useApiRequestQuery({
    url: departments,
    params: { page_size: 100 },
    method: "GET",
  });

  return (
    <div className="flex flex-col bg-white border !w-full rounded-2xl px-4 pt-4">
      <div className="flex items-center gap-4 pb-3 !text-3xl !w-full">
        <FilterOutlined className="!text-3xl" />
        <Title className="text-gray-500 align-text-bottom !m-0 !text-3xl">
          Filter
        </Title>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <Text className="block mb-2 text-gray-500">HOLATI BO'YICHA</Text>
          <Select
            onChange={(e) =>
              MergeQueryParams({ status: e === "all" ? undefined : e })
            }
            placeholder="Barchasi"
            className="w-full"
            allowClear
          >
            <Option value="all">Barchasi</Option>
            <Option value="0">Ko’rikdan o’tilgan</Option>
            <Option value="1">Ko’rikdan o’tilmagan</Option>
          </Select>
        </div>
        <div>
          <Text className="block mb-2 text-gray-500">HODIMLAR BO'YICHA</Text>
          <Select
            onChange={(e) =>
              MergeQueryParams({ employee_id: e === "all" ? undefined : e })
            }
            placeholder="Barchasi"
            className="w-full"
            allowClear
          >
            <Option value="all">Barchasi</Option>
            {employeesData?.data?.map((item: any) => (
              <Option key={item.id} value={item.id}>
                {item.first_name} {item.last_name}
              </Option>
            ))}
          </Select>
        </div>
        <div>
          <Text className="block mb-2 text-gray-500">BO'LIMLAR BO'YICHA</Text>
          <Select
            onChange={(e) =>
              MergeQueryParams({ department_id: e === "all" ? undefined : e })
            }
            placeholder="Barchasi"
            className="w-full"
            allowClear
          >
            <Option value="all">Barchasi</Option>
            {departmentsData?.data?.map((item: any) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default TechinkFilter;