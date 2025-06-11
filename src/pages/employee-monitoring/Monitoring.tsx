import React, {useState} from "react";
import {Avatar, Button, Dropdown, Input, message, Modal, Table,} from "antd";
import {DeleteOutlined, EditOutlined, ExportOutlined, MoreOutlined, SearchOutlined,} from "@ant-design/icons";
import type {ColumnsType, SorterResult, TablePaginationConfig} from "antd/es/table";
import dayjs from "dayjs";
import useQuery from "../../hooks/useQuery.tsx";
import AddAndEdit from "../rooms/AddAndEdit.tsx";
import {useApiMutateMutation, useApiRequestQuery,} from "../../service/Api.tsx";
import {departments, reports, rooms} from "../../service/URLs.ts";
import FilterTop from "../../components/Filter/FilterTop.tsx";

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

type ScheduleItem = {
  id: number;
  employee: Employee;
  dt: string;
};


const Monitoring: React.FC = () => {
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
    url: reports,
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

  const columns: ColumnsType<ScheduleItem> = [
    {
      title: "Ism va Familiya",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Avatar src={record?.employee?.image}/>
          <span>{record?.employee?.first_name} {record?.employee?.last_name}</span>
        </div>
      ),
      width: '18%',
    },
    {
      title: "Bo'lim",
      dataIndex: "",
      key: "number",
      sorter: true,
        render: (item) => item?.employee?.department?.name,
      width: 200
    },
    {
      title: "Lavozim",
      dataIndex: "",
      key: "order",
      sorter: true,
        render: (item) => item?.employee?.position?.name,
      width: 200
    },
    {
      title: "Tashrif buyurgan kun",
      dataIndex: "",
      key: "is_active",
      width: 200,
      sorter: true,
      render: (item) => (
        <span className={'border rounded-2xl px-3 py-1'}>{dayjs(item?.visit_time).format("YYYY-MM-DD")}</span>
      )
    },
    {
      title: "Tashrif buyurgan soat",
      key: "visit_time",
      width: 200,
      render: (item) => (
        <span className={'border rounded-2xl px-3 py-1'}>{dayjs(item?.visit_time).format("HH:mm")}</span>
      )
    },
  ];

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: any,
    sorter: SorterResult<ScheduleItem> | SorterResult<ScheduleItem>[]
  ) => {
    const singleSorter = sorter as SorterResult<ScheduleItem>;
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
      <FilterTop/>
      <div className="shadow-sm">
        <div className="bg-white border w-full rounded-2xl mt-4 px-4 pt-4">
          <div
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-2 mb-2 border-b w-full">
            <div>
              <Button type="default" icon={<ExportOutlined/>}>
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

        </div>
      </div>
    </div>
  );
};

export default Monitoring;
