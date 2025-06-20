import React, { useState } from "react";
import {
  Button,
  Dropdown,
  Input,
  message,
  Modal,
  Table,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
  MoreOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import type { ColumnsType, TablePaginationConfig, SorterResult } from "antd/es/table";
import dayjs from "dayjs";
import AddAndEdit from "./AddAndEdit.tsx";
import {
  useApiMutateMutation,
  useApiRequestQuery,
} from "../../service/Api.tsx";
import { departments } from "../../service/URLs.ts";
import Export from "../../components/export/Export.tsx";

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

const Departments: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string | null>(null);
  const [mutate] = useApiMutateMutation();

  const { data, isLoading, refetch, isFetching } = useApiRequestQuery({
    url: departments,
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
      content: `${item.name} bo‘limi o‘chiriladi.`,
      okText: "Ha, o‘chirish",
      cancelText: "Bekor qilish",
      okButtonProps: { danger: true },
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
      title: "Bo'lim nomi",
      dataIndex: "name",
      key: "name",
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
      title: "Tartib raqami",
      dataIndex: "order",
      key: "order",
      sorter: true,
      width:200
    },
    {
      title: "Holati",
      dataIndex: "is_active",
      key: "is_active",
      width:200,
      sorter: true,
      render: (text) =>
        text ? (
          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
            Faol
          </span>
        ) : (
          <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
            Faol emas
          </span>
        ),
    },
    {
      title: "Amallar",
      key: "actions",
      width:200,
      render: (item) => (
        <Dropdown
          overlayClassName="!w-[170px]"
          trigger={["click"]}
          menu={{
            items: [
              {
                key: "1",
                label: (
                  <Button
                    onClick={() => {
                      setEditData(item);
                      setOpen(true);
                    }}
                    className="flex items-center gap-2 !w-full !px-4"
                  >
                    <EditOutlined />
                    <span className="text-gray-500">Tahrirlash</span>
                  </Button>
                ),
              },
              {
                key: "2",
                label: (
                  <Button
                    onClick={() => handleDelete(item)}
                    danger
                    className="flex items-center gap-2 !w-full !px-4"
                  >
                    <DeleteOutlined />
                    <span className="text-gray-500">O‘chirish</span>
                  </Button>
                ),
              },
            ],
          }}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-2 mb-2 border-b w-full">
            <div>
              <Export url={'/department-export'}/>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Input
                placeholder="Qidirish"
                prefix={<SearchOutlined className="text-gray-400" />}
                className="w-full md:w-[300px]"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={() => setOpen(true)} type="primary">
                Bo‘lim qo‘shish
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
  );
};

export default Departments;
