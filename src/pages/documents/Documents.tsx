import React, {useState} from "react";
import {Button, Dropdown, message, Modal, Table,} from "antd";
import {DeleteOutlined, EditOutlined, MoreOutlined, RightOutlined,} from "@ant-design/icons";
import type {ColumnsType, SorterResult, TablePaginationConfig} from "antd/es/table";
import dayjs from "dayjs";
import useQuery from "../../hooks/useQuery.tsx";
import AddAndEdit from "./AddAndEdit.tsx";
import {useApiMutateMutation, useApiRequestQuery,} from "../../service/Api.tsx";
import {departments, documents, rooms} from "../../service/URLs.ts";
import {ArrowLeft} from "lucide-react";

interface DataType {
  id?: string | number;
  key: string;
  name: string;
  avatar: string;
  position: string;
  violation: string;
  date: string;
  status: string;
}

const Documents: React.FC = () => {
  const {navigate} = useQuery();
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string | null>(null);
  const [mutate] = useApiMutateMutation();

  const {data, isLoading, refetch, isFetching} = useApiRequestQuery({
    url: documents,
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
      title: "Haqiqatan ham ushbu bo‘limni o‘chirmoqchimisiz?",
      content: `${item.name}  o‘chiriladi.`,
      okText: "Ha, o‘chirish",
      cancelText: "Bekor qilish",
      okButtonProps: {danger: true},
      onOk: async () => {
        try {
          await mutate({
            url: `${departments}/${item?.id}/`,
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
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width:'3%',
    },
    {
      title: "Sarlavha",
      dataIndex: "name",
      key: "name",
      sorter: true,
      width: '25%',
        render: (text, record) => (
            <span className={'line-clamp-2'}>{text}</span>
        ),

    },
    {
      title: "Xona raqami",
      dataIndex: "description",
      key: "description",
      sorter: true,
      width: '50%',
        render: (text, record) => (
            <span dangerouslySetInnerHTML={{__html:text}} className={'line-clamp-2'}></span>
        ),
    },
    {
      title: "Qo'shilgan vaqti",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => <span>{dayjs(text).format("DD.MM.YYYY HH:mm")}</span>,
      sorter: true,
      width: '15%',
    },
    {
      title: "Amallar",
      key: "actions",
      width: '7%',
      render: (item) => (
        <Button onClick={()=>navigate(`/documents-and-guides/${item?.id}`)} type={'primary'}><RightOutlined/></Button>
      ),
    },
  ];

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
    <div className="min-h-screen w-full">
      <div className="shadow-sm">
        <div className="bg-white border w-full rounded-2xl mt-4 px-4 pt-4">
          <div
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-2 mb-2 border-b w-full">
            <div>
              {/*<Button type="default" icon={<ExportOutlined/>}>*/}
              {/*  Eksport qilish*/}
              {/*</Button>*/}
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              {/*<Input*/}
              {/*  placeholder="Qidirish"*/}
              {/*  prefix={<SearchOutlined className="text-gray-400"/>}*/}
              {/*  className="w-full md:w-[300px]"*/}
              {/*  onChange={(e) => setSearch(e.target.value)}*/}
              {/*/>*/}
              <Button onClick={() => setOpen(true)} type="primary">
                Yoriqnoma qo‘shish
              </Button>
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
            editData={null}
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
  );
};

export default Documents;
