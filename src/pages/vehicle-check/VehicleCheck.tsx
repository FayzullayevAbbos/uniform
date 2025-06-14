import React, {useState} from "react"
import {Avatar, Button, DatePicker, Input, message, Modal, Select, Table, Typography} from "antd"
import {ExportOutlined, FilePdfOutlined, FilterOutlined, SearchOutlined} from "@ant-design/icons"
import type {ColumnsType} from "antd/es/table"
import dayjs from "dayjs"
import TechnicalInspectionModal from "./AddCheck.tsx";
import {techical} from "../../service/URLs.ts";
import {useApiMutateMutation, useApiRequestQuery} from "../../service/Api.tsx";

const {RangePicker} = DatePicker
const {Option} = Select
const {Title, Text} = Typography

type Department = {
  id: number;
  name: string;
  order: number;
  is_active: number;
  created_at: string;
};

type Position = {
  id: number;
  name: string;
  order: number;
  is_active: number;
  created_at: string;
};

type Employee = {
  id: number;
  department: Department;
  position: Position;
  last_name: string;
  first_name: string;
  middle_name: string;
  image: string;
};

type DataType = {
  id: number;
  employee: Employee;
  end_date: string;
  start_date: string;
  status: string;
  files: []
};


const VehicleCheck: React.FC = () => {
  const [showModal, setShowModal] = useState(false)
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string | null>(null);
  const [mutate] = useApiMutateMutation();


  const {data, isLoading, refetch, isFetching} = useApiRequestQuery({
    url: techical,
    method: "GET",
    params: {
      page,
      page_size: pageSize,
      search,
      sort_by: sortField
        ? sortOrder === "desc"
          ? `-${sortField}`
          : sortField
        : undefined,
    },
  });

  const handleDelete = (item: DataType) => {
    Modal.confirm({
      title: "Haqiqatan ham ushbu xodimni o‘chirmoqchimisiz?",
      content: `${item?.employee?.first_name} o‘chiriladi.`,
      okText: "Ha, o‘chirish",
      cancelText: "Bekor qilish",
      okButtonProps: {danger: true},
      onOk: async () => {
        try {
          await mutate({
            url: `${techical}/${item?.id}/`,
            method: "DELETE",
          });
          message.success("Muvaffaqiyatli o‘chirildi");
          refetch();
        } catch (error) {
          message.error("O‘chirishda xatolik yuz berdi");
        }
      },
    });
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "Ism va Familiya",
      dataIndex: "name",
      key: "name",
      width: '15%',
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <Avatar src={record?.employee?.image}/>
          <span>{record?.employee?.first_name} {record?.employee?.last_name}</span>
        </div>
      ),
    },
    {
      title: "Bo'lim",
      dataIndex: "position",
      key: "position",
      width: '15%',
      render: (text, record) => (
        <span>{record?.employee?.department?.name}</span>
      ),
    },
    {
      title: "Lavozim",
      dataIndex: "position",
      key: "position",
      width: '13%',
      render: (_, record) => {
        return (
          <span>{record?.employee?.position?.name}</span>
        )
      },
    },
    {
      title: "Oxirgi texnik ko'rik",
      dataIndex: "",
      key: "violation",
      width: '10%',
      render: (record) => (
        <span className="line-clamp-2">{dayjs(record?.employee?.end_date).format('YYYY-MM-DD HH:mm')}</span>
      )
    },
    {
      title: "Kiyingi texnik ko'rik",
      dataIndex: "",
      key: "date",
      width: '10%',
      render: (record) => (
        <span className="line-clamp-2">{dayjs(record?.employee?.start_date).format('YYYY-MM-DD HH:mm')}</span>
      )
    },
    {
      title: "Holati",
      key: "status",
      dataIndex: "status",
      width: '12%',
      render: (text) => text === '1' ?
        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">Ko’rikdan o’tilgan</span>
        : <span className="bg-red-200 text-red-600 px-3 py-1 rounded-full text-sm">Ko’rikdan o’tilmagan</span>,
    },
    {
      title: "Fayllar",
      key: "files",
      dataIndex: "files",
      width: '20%',
      render: (files) =>
        (
          files?.map((file, index) => (
            <a className="pdf-link" href={file?.path}>
              <div className="flex items-center rounded-md">
                <div className="border p-2 text-red-600  text-xl rounded-md mr-2 flex items-center justify-center">
                  <FilePdfOutlined />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {file?.full_name.length > 50
                      ? file.full_name.slice(0, 47) + '...pdf'
                      : file.full_name}
                  </p>
                  <p className="text-xs text-gray-500">{file?.size}</p>
                </div>
              </div>
            </a>
          ))
        ),
    }
  ]

  return (
    <div className=" min-h-screen w-full">
      <div className=" shadow-sm">
        <div className="flex flex-col bg-white border !w-full rounded-2xl   px-4 pt-4">
          <div className={'flex items-center  gap-4  pb-3 !text-3xl   !w-full  '}>
            <FilterOutlined className={'!text-3xl '}/>
            <Title className=" text-gray-500 align-text-bottom !m-0 !text-3xl ">
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
              <Select placeholder="Barchasi" className="w-full">
                <Option value="all">Barchasi</Option>
              </Select>
            </div>
            <div>
              <Text className="block mb-2 text-gray-500">HOLATI BO'YICHA</Text>
              <Select placeholder="Barchasi" className="w-full">
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
              <Button type="default" icon={<ExportOutlined/>} className="flex items-center">
                Eksport qilish
              </Button>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Input
                placeholder="Qidirish"
                prefix={<SearchOutlined className="text-gray-400"/>}

                className="w-full md:w-[300px]"
              />
              <Button
                type="primary"

                onClick={() => setShowModal(true)}
              >
                Yangi texnik ko'rik
              </Button>
            </div>
          </div>

          <Table
            loading={isLoading || isFetching}
            columns={columns}
            dataSource={Array.isArray(data?.data) ? data.data : []}
            rowKey="id"
            pagination={{
              position: ["bottomCenter"],
              showSizeChanger: true,
              current: page,
              pageSize: pageSize,
              total: data?.total ?? 0,
              showQuickJumper: true,
              showTotal: (total) => `${total} ta`,
            }}
          />
          <TechnicalInspectionModal refetch={refetch} open={showModal} onCancel={() => {
            setShowModal(false)
          }}/>
        </div>
      </div>
    </div>
  )
}

export default VehicleCheck
