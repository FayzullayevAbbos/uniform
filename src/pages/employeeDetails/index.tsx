import {Badge, message, Modal, Tabs} from "antd";
import EmployeeDetailsTop from "./EmployeeDetailsTop.tsx";
import {FileTextOutlined, IdcardOutlined, PictureOutlined, ToolOutlined,} from "@ant-design/icons";
import PersonalInfoCard from "./PersonalInfoCard.tsx";
import EmployeeAddModal from "../employee/AddEmpl.tsx";
import React from "react";
import {useApiMutateMutation, useApiRequestQuery} from "../../service/Api.tsx";
import {employees} from "../../service/URLs.ts";
import useQuery from "../../hooks/useQuery.tsx";
import VehicleCheck from "../vehicle-check/VehicleCheck.tsx";
import EmpImages from "./EmpImages.tsx";

export default function EmployeeDetails() {
  const {location} = useQuery();
  const id = location?.pathname?.split("/").pop() || "";
  const [showModal, setShowModal] = React.useState(false);
  const [mutate] = useApiMutateMutation();
  const {data, isLoading, refetch, isFetching} = useApiRequestQuery({
    url: `${employees}/${id}`,
    method: "GET",

  });
  const tabItems = [
    {
      key: "info",
      label: (
        <span>
        <IdcardOutlined /> Hodim ma'lumotlari
      </span>
      ),
      children: <PersonalInfoCard loading={isLoading || isFetching} data={data?.data} />,
    },
    {
      key: "tech",
      label: (
        <span>
        <ToolOutlined /> Texnik ko'riklari
      </span>
      ),
      children: <VehicleCheck emp_id={data?.data?.id} />,
    },
    {
      key: "penalty",

      label: (
        <div className={'relative'}>
          <Badge className={'absolute -top-2 -right-5'}  count={3} />
          <FileTextOutlined /> Jarimalari
        </div>
      ),
      children: <div>Jarimalari</div>,
    },
    {
      key: "images",
      label: (
        <span>
        <PictureOutlined /> Rasmlar
      </span>
      ),
      children: <EmpImages data={data?.data} />,
    },
  ];

  const handleDelete = () => {
    Modal.confirm({
      title: "Haqiqatan ham ushbu xodimni o‘chirmoqchimisiz?",
      content: `${data?.data?.first_name} o‘chiriladi.`,
      okText: "Ha, o‘chirish",
      cancelText: "Bekor qilish",
      okButtonProps: {danger: true},
      onOk: async () => {
        try {
          await mutate({
            url: `${employees}/${data?.data?.id}/`,
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
  return (
    <div className={"h-full"}>
      <EmployeeAddModal refetch={refetch} open={showModal} editData={data?.data} onCancel={() => setShowModal(false)}/>
      <EmployeeDetailsTop  handleDelete={handleDelete}   setOpen={setShowModal} data={data?.data} />
      <div className="bg-main rounded-2xl w-full min-h-screen bg-white mt-2 p-4">
        <Tabs type="card" items={tabItems} />
      </div>
    </div>
  );
}
