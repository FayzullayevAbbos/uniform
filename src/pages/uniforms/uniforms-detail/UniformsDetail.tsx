import React, {useState} from "react"
import {Button, Dropdown, Input, message, Modal, Table,} from "antd"
import {DeleteOutlined, EditOutlined, ExportOutlined, MoreOutlined, SearchOutlined} from "@ant-design/icons"
import type {ColumnsType, SorterResult, TablePaginationConfig} from "antd/es/table"
import AddAndEdit from "./AddAndEdit.tsx";
import {PlusIcon} from "lucide-react";
import {useApiMutateMutation, useApiRequestQuery} from "../../../service/Api.tsx";
import dayjs from "dayjs";
import {uniforms} from "../../../service/URLs.ts";
import UniformFilter from "../../../components/Filter/UniformFilter.tsx";
import useQuery from "../../../hooks/useQuery.tsx";

interface DataType {
  id: string | number
  name: string
  avatar: string
  position: string
  violation: string
  date: string
  status: string
}

const UniformsDetail: React.FC = () => {
  const {QueryParams} = useQuery();
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string | null>(null);

  const [mutate] = useApiMutateMutation();

  const {data, isLoading, isFetching , refetch} = useApiRequestQuery({
    url: "/uniforms",
    method: "GET",
    params: {
      page,
      page_size: pageSize,
      ...QueryParams,
      search,
      sort_by: sortField
        ? sortOrder === "desc"
          ? `-${sortField}`
          : sortField
        : undefined,

    },
  })


  const handleDelete = (item: DataType) => {
    Modal.confirm({
      title: "Haqiqatan ham ushbu bo‘limni o‘chirmoqchimisiz?",
      content: `${item.name} bo‘limi o‘chiriladi.`,
      okText: "Ha, o‘chirish",
      cancelText: "Bekor qilish",
      okButtonProps: { danger: true },
      onOk: async () => {
        try {
          await mutate({
            url: `${uniforms}/${item?.id}/`,
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
      title: "Nomi",
      key: "name",

      render: (text) => (
        <div className="flex items-center gap-2">
          <img
            src={text?.image}
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="text-gray-800">{text?.name}</span>
        </div>
      ),
      // sorter: true,
    },
    {
      title: "Turi",
      key: "type",
      dataIndex: "type",
      render: (text) => <span className="">{text?.name}</span>,
        sorter: true,
    },
    {
      title: "Kategoriyasi",
      key: "category",
      dataIndex: "category",
      render: (text) => <span className="">{text?.name}</span>,
      sorter: true,
    },
    {
      title: "Qo'shilgan vaqti",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => <span>{dayjs(text).format("DD.MM.YYYY HH:mm")}</span>,
      sorter: true,
      width:200
    },
    {
      title: "Amallar",
      key: "action",
      render: (item) => {
        return (
          <Dropdown
            overlayClassName="!w-[170px] "
            trigger={["click"]}
            menu={{
              items: [
                {
                  key: "1",
                  label: (
                    <Button onClick={()=> {
                      setOpen(true)
                      setEditData(item)
                    }} className="flex items-center gap-2 !mx-0 !w-full !px-4">
                      <EditOutlined/>
                      <span className="text-gray-500">Tahrirlash</span>
                    </Button>
                  ),
                },
                {
                  key: "2",
                  label: (
                    <Button onClick={() => handleDelete(item)} danger={true} className="flex items-center gap-2 !mx-0 !w-full !px-4">
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
        )
      },
    },
  ]
  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: any,
    sorter: SorterResult<DataType> | SorterResult<DataType>[]
  ) => {
    const singleSorter = sorter as SorterResult<DataType>;
    setPage(pagination.current || 1);
    setPageSize(pagination.pageSize || 10);

    if (singleSorter?.order) {
      setSortField(singleSorter.field as string);
      setSortOrder(singleSorter.order === "ascend" ? "asc" : "desc");
    } else {
      setSortField(null);
      setSortOrder(null);
    }
  };

  return (
    <div className=" min-h-screen w-full">
      <div className=" shadow-sm">
        <UniformFilter/>
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
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button icon={<PlusIcon size={20}/>} onClick={() => setOpen(true)} type="primary">Yangi qo‘shish</Button>
            </div>
          </div>

          <Table
            loading={isLoading || isFetching}
            columns={columns}
            dataSource={Array.isArray(data?.data) ? data.data : []}
            rowKey="id"
            onChange={handleTableChange}
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
          <AddAndEdit
            editData={editData}
            open={open}
            onClose={() => {
              setOpen(false)
              setEditData(null);
            }}
            refetch={refetch}
            setEditData={setEditData}
          />
        </div>
      </div>
    </div>
  )
}

export default UniformsDetail
