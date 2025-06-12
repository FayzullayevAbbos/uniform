import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {Button, message, Modal} from "antd";
import BackTo from "../../components/shared/BackTo.tsx";
import useQuery from "../../hooks/useQuery.tsx";
import {useApiMutateMutation, useApiRequestQuery} from "../../service/Api.tsx";
import {departments, documents} from "../../service/URLs.ts";
import AddAndEdit from "./AddAndEdit.tsx";
import React, {useState} from "react";

const DocumentDetail = () => {
  const {navigate, location} = useQuery();
  const [mutate] = useApiMutateMutation();
  const [open, setOpen] = useState(false);
  const {data, isLoading, refetch, isFetching} = useApiRequestQuery({
    url: `${documents}/${location?.pathname.split('/')[2]}`,
    method: "GET",
  })
  const handleDelete = (item: any) => {
    Modal.confirm({
      title: "Haqiqatan ham ushbu yo'riqnomani o‘chirmoqchimisiz?",
      content: `${item.name}  o‘chiriladi.`,
      okText: "Ha, o‘chirish",
      cancelText: "Bekor qilish",
      okButtonProps: {danger: true},
      onOk: async () => {
        try {
          await mutate({
            url: `${documents}/${location?.pathname.split('/')[2]}`,
            method: "DELETE",
          });
          message.success("Muvaffaqiyatli o‘chirildi");
          navigate('/documents-and-guides');
        } catch (error) {
          message.error("O‘chirishda xatolik yuz berdi");
        }
      },
    });
  };
  return (
    <div>
      <AddAndEdit
        editData={data?.data}
        open={open}
        onClose={() => {
          setOpen(false)
        }}
        refetch={refetch}
        setEditData={data}
      />
      <div className={'flex justify-between items-center mb-4'}>
        <BackTo/>
        <div className={'flex gap-2'}>
          <Button onClick={handleDelete} danger={true} className={''}>
            <DeleteOutlined/> O'chirish
          </Button>
          <Button onClick={()=> setOpen(true)} className={''}><EditOutlined/> Tahrirlash</Button>
        </div>
      </div>
      <div className={'bg-white min-h-screen w-full p-4 rounded-2xl '}>
        <div className={'flex items-center '}>
          <h2 className={'text-2xl font-semibold'}>{data?.data?.name}</h2>
        </div>
        <div dangerouslySetInnerHTML={{__html: data?.data?.description}} className={'mt-4'}>

        </div>

      </div>
    </div>
  );
}
export default DocumentDetail;