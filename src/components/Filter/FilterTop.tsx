import {FilterOutlined} from "@ant-design/icons";
import {DatePicker, Select, Typography} from "antd";
import dayjs from "dayjs";

const {RangePicker} = DatePicker
const {Option} = Select
const {Title, Text} = Typography


const FilterTop = () => {
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
          <Text className="block mb-2 text-gray-500">HODIMLAR BO'YICHA</Text>
          <Select placeholder="Barcha hodimlar" className="w-full">
            <Option value="all">Barcha hodimlar</Option>
          </Select>
        </div>
        <div>
          <Text className="block mb-2 text-gray-500">BO'LIMLAR BO'YICHA</Text>
          <Select placeholder="Barchasi" className="w-full" >
            <Option value="all">Barchasi</Option>
          </Select>
        </div>
        <div>
          <Text className="block mb-2 text-gray-500">HOLATI BO'YICHA</Text>
          <Select placeholder="Barchasi" className="w-full" >
            <Option value="all">Barchasi</Option>
          </Select>
        </div>
        <div className="!w-full">
          <Text className="block mb-2 text-gray-500">SANA</Text>
          <RangePicker

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