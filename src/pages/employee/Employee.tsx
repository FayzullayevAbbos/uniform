import React, {useState} from "react"
import {Avatar, Button, DatePicker, Dropdown, Input, message, Modal, Select, Table, Typography} from "antd"
import {
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
  EyeOutlined,
  FilterOutlined,
  MoreOutlined,
  SearchOutlined
} from "@ant-design/icons"
import type {ColumnsType} from "antd/es/table"
import dayjs from "dayjs"
import useQuery from "../../hooks/useQuery.tsx";
import EmployeeAddModal from "./AddEmpl.tsx";
import {useApiMutateMutation, useApiRequestQuery} from "../../service/Api.tsx";
import {employees} from "../../service/URLs.ts";
import FilterTop from "../../components/Filter/FilterTop.tsx";

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

const Employee: React.FC = () => {
  const {navigate , QueryParams} = useQuery()
  const [showModal, setShowModal] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [search, setSearch] = useState("")
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<string | null>(null)
  const [editData, setEditData] = useState(null);
  const [mutate] = useApiMutateMutation();
  const {data, isLoading, refetch, isFetching} = useApiRequestQuery({
    url: employees,
    method: "GET",
    params: {
      page,
      ...QueryParams,
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
      content: `${item.first_name} o‘chiriladi.`,
      okText: "Ha, o‘chirish",
      cancelText: "Bekor qilish",
      okButtonProps: {danger: true},
      onOk: async () => {
        try {
          await mutate({
            url: `${employees}/${item?.id}/`,
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

  const columns: ColumnsType<any> = [
    {
      title: "Ism va Familiya",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Avatar src={record.image}/>
          <span>{record.first_name} {record.last_name}</span>
        </div>
      ),
      width: '18%',
    },
    {
      title: "Bo'lim",
      dataIndex: "department",
      key: "department",
      render: (department) => department?.name,
      width: '13%',
    },
    {
      title: "Lavozim",
      dataIndex: "position",
      key: "position",
      render: (position) => position?.name,
      width: '10%',
    },
    {
      title: "Xona",
      dataIndex: "room",
      key: "room",
      render: (room) => <div className="line-clamp-2">{room?.name}</div>,
      width: '17%',

    },
    {
      title: "Tug‘ilgan sana",
      dataIndex: "birth_date",
      key: "birth_date",
      width: '8%',
    },
    {
      title: "Telefon",
      dataIndex: "phone",
      key: "phone",
      width: '9%',
    },
    {
      title: "PINFL",
      dataIndex: "pin",
      key: "pin",
      width: '10%',
    },
    {
      title: "Amallar",
      key: "action",
      width: '5%',
      render: (item) => {
        return (
          <Dropdown
            overlayClassName="!w-[170px]"
            trigger={["click"]}
            menu={{
              items: [
                {
                  key: "1",
                  label: (
                    <Button onClick={() => navigate(`/employees/${item?.id}`)}
                            className="flex items-center gap-2 !mx-0 !w-full !px-4">
                      <EyeOutlined/>
                      <span className="text-gray-500">Ko'rish</span>
                    </Button>
                  ),
                },
                {
                  key: "2",
                  label: (
                    <Button
                      onClick={() => {
                        setEditData(item);
                        setShowModal(true);
                      }}
                      className="flex items-center gap-2 !mx-0 !w-full !px-4">
                      <EditOutlined/>
                      <span className="text-gray-500">Tahrirlash</span>
                    </Button>
                  ),
                },
                {
                  key: "3",
                  label: (
                    <Button onClick={() => handleDelete(item)} danger
                            className="flex items-center gap-2 !mx-0 !w-full !px-4">
                      <DeleteOutlined/>
                      <span className="text-gray-500">O'chirish</span>
                    </Button>
                  ),
                },
              ],
            }}
          >
            <Button type="text" icon={<MoreOutlined/>}/>
          </Dropdown>
        );
      },
    },
  ];


  return (
    <div className=" min-h-screen w-full">
      <div className=" shadow-sm">
        <FilterTop/>
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Qidirish"
                prefix={<SearchOutlined className="text-gray-400"/>}
                className="w-full md:w-[300px]"
              />

              <Button
                type="primary"
                onClick={() => setShowModal(true)}
                style={{backgroundColor: "#00ABA9", borderColor: "transparent"}}
              >
                Yangi hodim qo'shish
              </Button>

              <EmployeeAddModal refetch={refetch} open={showModal} editData={editData} onCancel={() => setShowModal(false)}/>

            </div>
          </div>

          <Table
            columns={columns}
            loading={isLoading || isFetching}
            dataSource={Array.isArray(data?.data) ? data.data : []}
            pagination={{
              position: ["bottomCenter"],
              current: page,
              pageSize: pageSize,
              total: data?.total ?? 0,
              onChange: (p, ps) => {
                setPage(p)
                setPageSize(ps)
              },
              showTotal: (total) => `${total} ta`,
              showSizeChanger: true,
              showQuickJumper: true,
            }}
            scroll={{x: '100%'}}
            rowKey="id"
          />

        </div>
      </div>
    </div>
  )
}

export default Employee
