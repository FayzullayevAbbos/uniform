import React, {useState} from "react";
import {Avatar, Button, DatePicker, Input, message, Modal, Table} from "antd";
import {FilePdfOutlined, SearchOutlined} from "@ant-design/icons";
import type {ColumnsType} from "antd/es/table";
import dayjs from "dayjs";
import TechnicalInspectionModal from "./AddCheck.tsx";
import {techical} from "../../service/URLs.ts";
import {useApiMutateMutation, useApiRequestQuery} from "../../service/Api.tsx";
import TechinkFilter from "../../components/Filter/TechinkFilter.tsx";
import useQuery from "../../hooks/useQuery.tsx";
import Export from "../../components/export/Export.tsx";

const {RangePicker} = DatePicker;

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
  files: Array<{
    path: string;
    full_name: string;
    size: string;
  }>;
};

interface VehicleCheckProps {
  emp_id: number | undefined;
}

const VehicleCheck: React.FC<VehicleCheckProps> = ({emp_id}) => {
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string | null>(null);
  const [mutate] = useApiMutateMutation();
  const {QueryParams} = useQuery()

  const {data, isLoading, refetch, isFetching} = useApiRequestQuery({
    url: techical,
    method: "GET",
    params: {
      page,
      page_size: pageSize,
      search,
      ...QueryParams,
      ...(emp_id ? {employee_id: emp_id} : {}),
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
      width: "15%",
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <Avatar src={record?.employee?.image}/>
          <span>
          {record?.employee?.first_name} {record?.employee?.last_name}
        </span>
        </div>
      ),
    },
    ...(emp_id
      ? []
      : [
        {
          title: "Bo'lim",
          dataIndex: "position",
          key: "position",
          width: "15%",
          render: (text, record) => <span>{record?.employee?.department?.name}</span>,
        },
        {
          title: "Lavozim",
          dataIndex: "position",
          key: "position",
          width: "13%",
          render: (_, record) => <span>{record?.employee?.position?.name}</span>,
        },
      ]),
    {
      title: "Oxirgi texnik ko'rik",
      dataIndex: "",
      key: "violation",
      width: "10%",
      render: (record) => (
        <span className="line-clamp-2">
        {dayjs(record?.end_date).format("YYYY-MM-DD HH:mm")}
      </span>
      ),
    },
    {
      title: "Kiyingi texnik ko'rik",
      dataIndex: "",
      key: "date",
      width: "10%",
      render: (record) => (
        <span className="line-clamp-2">
        {dayjs(record?.start_date).format("YYYY-MM-DD HH:mm")}
      </span>
      ),
    },
    {
      title: "Holati",
      key: "status",
      dataIndex: "status",
      width: "12%",
      render: (text) =>
        text === 1 ? (
          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
          Ko’rikdan o’tilgan
        </span>
        ) : (
          <span className="bg-red-200 text-red-600 px-3 py-1 rounded-full text-sm">
          Ko’rikdan o’tilmagan
        </span>
        ),
    },
    {
      title: "Fayllar",
      key: "files",
      dataIndex: "files",
      width: "20%",
      render: (files) =>
        files?.map((file, index) => (
          <a className="pdf-link" target={"_blank"} href={file?.path} key={index}>
            <div className="flex items-center rounded-md">
              <div className="border p-2 text-red-600 text-xl rounded-md mr-2 flex items-center justify-center">
                <FilePdfOutlined/>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {file?.full_name.length > 50
                    ? file.full_name.slice(0, 47) + "...pdf"
                    : file.full_name}
                </p>
                <p className="text-xs text-gray-500">{file?.size}</p>
              </div>
            </div>
          </a>
        )),
    },
  ];

  return (
    <div className="min-h-screen w-full">
      <div className="shadow-sm">
        {!emp_id && <TechinkFilter/>}
        <div className="bg-white border !w-full rounded-2xl mt-4 px-4 pt-4">
          <div
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-2 mb-2 border-b !w-full">
            <div className="gap-2 w-full md:w-auto">
              {/*<Button type="default" icon={<ExportOutlined />} className="flex items-center">*/}
              {/*  Eksport qilish*/}
              {/*</Button>*/}
              {
                emp_id ? <Export url={`/employee-technical-export/${emp_id}/`}/> :
                  <Export url={'/technical-inspection-export'}/>
              }
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Input
                placeholder="Qidirish"
                prefix={<SearchOutlined className="text-gray-400"/>}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full md:w-[300px]"
              />
              <Button type="primary" onClick={() => setShowModal(true)}>
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
          <TechnicalInspectionModal
            refetch={refetch}
            open={showModal}
            onCancel={() => {
              setShowModal(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleCheck;