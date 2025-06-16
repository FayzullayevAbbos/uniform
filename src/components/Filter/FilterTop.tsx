import {FilterOutlined} from "@ant-design/icons";
import {DatePicker, Select, Typography} from "antd";
import dayjs from "dayjs";
import {useApiRequestQuery} from "../../service/Api";
import {departments, positions} from "../../service/URLs.ts";
import {useState} from "react";
import useQuery from "../../hooks/useQuery.tsx";

const {RangePicker} = DatePicker
const {Option} = Select
const {Title, Text} = Typography


const FilterTop = () => {
  const {MergeQueryParams, QueryParams} = useQuery()
  const [position, setPosition] = useState<string | null>(null);
  const [department, setDepartment] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null]>([null, null]);

  const {data: positionsData, isLoading, refetch, isFetching} = useApiRequestQuery({
    url: positions,
    params: {page_size: 100},
    method: "GET",
  });
  const {data: departmentsData, isLoading: isDepartmentsLoading} = useApiRequestQuery({
    url: departments,
    params: {page_size: 100},
    method: "GET",
  });



  return(
    <div className="flex flex-col bg-white border !w-full rounded-2xl   px-4 pt-4">
      <div className={'flex items-center  gap-4  pb-3 !text-3xl   !w-full  ' }>
        <FilterOutlined className={'!text-3xl '}  />
        <Title  className=" text-gray-500 align-text-bottom !m-0 !text-3xl ">
          Filter
        </Title>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 ">
        <div>
          <Text className="block mb-2 text-gray-500">LAVOZIM BO'YICHA</Text>
          <Select
            onChange={(e) => MergeQueryParams({position_id: e === 'all' ? undefined : e})}
            placeholder="Barcha hodimlar"
            className="w-full"
            allowClear
          >
            <Option value="all">Barchasi</Option> {/* Barchasi optioni */}
            {
              positionsData?.data?.map((item: any) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))
            }
          </Select>

        </div>
        <div>
          <Text className="block mb-2 text-gray-500">BO'LIMLAR BO'YICHA</Text>
          <Select allowClear={true} onChange={(e)=> MergeQueryParams({department_id:e === 'all' ? undefined : e })} placeholder="Barchasi" className="w-full" >
            <Option value="all">Barchasi</Option>
            {
              departmentsData?.data?.map((item: any) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))
            }
          </Select>
        </div>
        <div>
          <Text className="block mb-2 text-gray-500">HOLATI BO'YICHA</Text>
          <Select onChange={(e)=>MergeQueryParams({status:e === 'all' ? undefined : e})} placeholder="Barchasi" className="w-full" >
            <Option value="all">Barchasi</Option>
            <Option value={'0'}>Ko’rikdan o’tilgan</Option>
            <Option value={'1'}>Ko’rikdan o’tilmagan</Option>
          </Select>
        </div>
        <div className="!w-full">
          <Text className="block mb-2 text-gray-500">SANA</Text>
          <RangePicker
            onChange={(dates, dateStrings) => {
              const [start, end] = dates || [];
              setDateRange([start, end]);
              MergeQueryParams({
                start_date: start ? start.format('YYYY-MM-DD') : undefined,
                end_date: end ? end.format('YYYY-MM-DD') : undefined,
              });
            }}
            className="w-full"
            defaultValue={[dayjs("2025-01-30"), dayjs("2025-01-30")]}
            format="DD.MM.YYYY"
          />
        </div>
      </div>
    </div>
  )
 }
 export default FilterTop