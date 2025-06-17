import { FilterOutlined } from "@ant-design/icons";
import { Select, Typography } from "antd";
import { useApiRequestQuery } from "../../service/Api";
import { departments, positions } from "../../service/URLs.ts";
import useQuery from "../../hooks/useQuery.tsx";

const { Option } = Select;
const { Title, Text } = Typography;

const FilterTop = () => {
  const { MergeQueryParams } = useQuery();

  const { data: positionsData } = useApiRequestQuery({
    url: positions,
    params: { page_size: 100 },
    method: "GET",
  });

  const { data: departmentsData } = useApiRequestQuery({
    url: departments,
    params: { page_size: 100 },
    method: "GET",
  });

  const { data: regionsData } = useApiRequestQuery({
    url: "/regions",
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div>
          <Text className="block mb-2 text-gray-500">LAVOZIM BO'YICHA</Text>
          <Select
            onChange={(e) =>
              MergeQueryParams({ position_id: e === "all" ? undefined : e })
            }
            placeholder="Barcha hodimlar"
            className="w-full"
            allowClear
          >
            <Option value="all">Barchasi</Option>
            {positionsData?.data?.map((item: any) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </div>
        <div>
          <Text className="block mb-2 text-gray-500">BO'LIMLAR BO'YICHA</Text>
          <Select
            allowClear
            onChange={(e) =>
              MergeQueryParams({ department_id: e === "all" ? undefined : e })
            }
            placeholder="Barchasi"
            className="w-full"
          >
            <Option value="all">Barchasi</Option>
            {departmentsData?.data?.map((item: any) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </div>
        <div>
          <Text className="block mb-2 text-gray-500">VILOYAT BO'YICHA</Text>
          <Select
            allowClear
            onChange={(e) =>
              MergeQueryParams({ region_id: e === "all" ? undefined : e })
            }
            placeholder="Barchasi"
            className="w-full"
          >
            <Option value="all">Barchasi</Option>
            {regionsData?.data?.map((item: any) => (
              <Option key={item.id} value={item.id}>
                {item.oz}
              </Option>
            ))}
          </Select>
        </div>
        <div>
          <Text className="block mb-2 text-gray-500">JINS BO'YICHA</Text>
          <Select
            allowClear
            onChange={(e) =>
              MergeQueryParams({ gender: e === "all" ? undefined : e })
            }
            placeholder="Barchasi"
            className="w-full"
          >
            <Option value="all">Barchasi</Option>
            <Option value="Male">Erkak</Option>
            <Option value="Female">Ayol</Option>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default FilterTop;