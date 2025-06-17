import { FilterOutlined } from "@ant-design/icons";
import { Select, Typography } from "antd";
import { useApiRequestQuery } from "../../service/Api";
import { categories, types } from "../../service/URLs.ts";
import useQuery from "../../hooks/useQuery.tsx";

const { Option } = Select;
const { Title, Text } = Typography;

const UniformFilter = () => {
  const { MergeQueryParams } = useQuery();

  const { data: categoryData } = useApiRequestQuery({
    url: categories,
    params: { page_size: 100 },
    method: "GET",
  });

  const { data: typesData } = useApiRequestQuery({
    url: types,
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <Text className="block mb-2 text-gray-500">BO'LIMLAR BO'YICHA</Text>
          <Select
            onChange={(e) =>
              MergeQueryParams({ category_id: e === "all" ? undefined : e })
            }
            placeholder="Barchasi"
            className="w-full"
            allowClear
          >
            <Option value="all">Barchasi</Option>
            {categoryData?.data?.map((item: any) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </div>
        <div>
          <Text className="block mb-2 text-gray-500">TURI BO'YICHA</Text>
          <Select
            onChange={(e) =>
              MergeQueryParams({ type: e === "all" ? undefined : e })
            }
            placeholder="Barchasi"
            className="w-full"
            allowClear
          >
            <Option value="all">Barchasi</Option>
            {typesData?.data?.map((item: any) => (
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

export default UniformFilter;