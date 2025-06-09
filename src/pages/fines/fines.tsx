import type React from "react"
import {Avatar, Button, DatePicker, Input, Select, Table, Typography} from "antd"
import {ExportOutlined, FilterOutlined, RightOutlined, SearchOutlined} from "@ant-design/icons"
import type {ColumnsType} from "antd/es/table"
import dayjs from "dayjs"
import useQuery from "../../hooks/useQuery.tsx";

const {RangePicker} = DatePicker
const {Option} = Select
const {Title, Text} = Typography

interface DataType {
  key: string
  name: string
  avatar: string
  position: string
  violation: string
  date: string
  status: string
}

const FinesPage: React.FC = () => {

  const data: DataType[] = [
    {
      key: "1",
      name: "Jenny Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      position: "Shifokorlar",
      violation: "Bosh kiymisiz keldi",
      date: "30.01.2025 17:37",
      status: "Jarima qo'llanildi",
    },
    {
      key: "2",
      name: "Darrell Steward",
      avatar: "/placeholder.svg?height=40&width=40",
      position: "Shifokorlar",
      violation: "Bosh kiymisiz keldi",
      date: "30.01.2025 17:37",
      status: "Jarima qo'llanildi",
    },
    {
      key: "3",
      name: "Wade Warren",
      avatar: "/placeholder.svg?height=40&width=40",
      position: "Shifokorlar",
      violation: "Bosh kiymisiz keldi",
      date: "30.01.2025 17:37",
      status: "Jarima qo'llanildi",
    },
    {
      key: "4",
      name: "Eleanor Pena",
      avatar: "/placeholder.svg?height=40&width=40",
      position: "Shifokorlar",
      violation: "Bosh kiymisiz keldi",
      date: "30.01.2025 17:37",
      status: "Jarima qo'llanildi",
    },
    {
      key: "5",
      name: "Kristin Watson",
      avatar: "/placeholder.svg?height=40&width=40",
      position: "Shifokorlar",
      violation: "Bosh kiymisiz keldi",
      date: "30.01.2025 17:37",
      status: "Jarima qo'llanildi",
    },
    {
      key: "6",
      name: "Theresa Webb",
      avatar: "/placeholder.svg?height=40&width=40",
      position: "Shifokorlar",
      violation: "Bosh kiymisiz keldi",
      date: "30.01.2025 17:37",
      status: "Jarima qo'llanildi",
    },
    {
      key: "7",
      name: "Brooklyn Simmons",
      avatar: "/placeholder.svg?height=40&width=40",
      position: "Shifokorlar",
      violation: "Bosh kiymisiz keldi",
      date: "30.01.2025 17:37",
      status: "Jarima qo'llanildi",
    },
    {
      key: "8",
      name: "Ronald Richards",
      avatar: "/placeholder.svg?height=40&width=40",
      position: "Shifokorlar",
      violation: "Bosh kiymisiz keldi",
      date: "30.01.2025 17:37",
      status: "Jarima qo'llanildi",
    },
    {
      key: "9",
      name: "Savannah Nguyen",
      avatar: "/placeholder.svg?height=40&width=40",
      position: "Shifokorlar",
      violation: "Bosh kiymisiz keldi",
      date: "30.01.2025 17:37",
      status: "Jarima qo'llanildi",
    },
    {
      key: "10",
      name: "Jerome Bell",
      avatar: "/placeholder.svg?height=40&width=40",
      position: "Shifokorlar",
      violation: "Bosh kiymisiz keldi",
      date: "30.01.2025 17:37",
      status: "Jarima qo'llanildi",
    },
  ]
  const {navigate} = useQuery()
  const columns: ColumnsType<DataType> = [
    {
      title: "Ism va Familiya",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <Avatar src={record.avatar}/>
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Bo'lim",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Lavozim",
      dataIndex: "position",
      key: "position",
      render: (_, record) => {
        const positions: Record<string, string> = {
          "1": "Pediatr",
          "2": "Terapevt",
          "3": "Xirurg",
          "4": "Xirurg",
          "5": "Xirurg",
          "6": "Xirurg",
          "7": "Xirurg",
          "8": "Xirurg",
          "9": "Xirurg",
          "10": "Xirurg",
        }
        return positions[record.key] || "Xirurg"
      },
    },
    {
      title: "Jarima turi",
      dataIndex: "violation",
      key: "violation",
    },
    {
      title: "Jarima vaqti",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Jarima holati",
      key: "status",
      dataIndex: "status",
      render: (text) => <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">{text}</span>,
    },
    {
      title: "Jarima holati",
      key: "action",
      render: (item) => <Button  onClick={() => navigate(`/fines/${item?.id}`)} type="primary" icon={<RightOutlined/>}/>,
    },
  ]

  return (
    <div className=" min-h-screen w-full">
      <div className=" shadow-sm">
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
        <div className={'bg-white border !w-full rounded-2xl mt-4  px-4 pt-4'}>
        <div
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4  pb-2 mb-2 border-b !w-full  ">
          <div className=" gap-2 w-full md:w-auto">
            <Button type="default" icon={<ExportOutlined/>}  className="flex items-center">
              Eksport qilish
            </Button>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Input
              placeholder="Qidirish"
              prefix={<SearchOutlined className="text-gray-400"/>}
              className="w-full md:w-[300px]"
            />
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            position: ["bottomCenter"],
            showSizeChanger: true,
            showQuickJumper: true,
            total: 100,
            showTotal: (total) => `${total} ta`,
            defaultPageSize: 10,
          }}

        />
        </div>
      </div>
    </div>
  )
}

export default FinesPage
