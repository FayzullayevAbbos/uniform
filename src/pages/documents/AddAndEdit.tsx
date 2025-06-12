import React, {useEffect, useRef, useState} from "react";
import {Button, Drawer, Form, Input, message} from "antd";
import {useApiMutateMutation} from "../../service/Api.tsx";
import {documents, rooms} from "../../service/URLs.ts";
import { Editor } from "@tinymce/tinymce-react";

interface AddSectionDrawerProps {
  open: boolean,
  onClose: () => void,
  editData?: { id:number; name: string; room_number:number; order: number; is_active: number | null, description?: string } | null,
  refetch?: never
}

const AddAndEdit: React.FC<AddSectionDrawerProps> = ({
                                                       open,
                                                       onClose,
                                                       editData,
                                                       refetch
                                                     }) => {
  const [form] = Form.useForm();
  const [description, setDescription] = useState("");

  const [mutate, {isLoading, isError, isSuccess}] = useApiMutateMutation()

  useEffect(() => {
    if (editData) {
      const body = {
        ...editData,
        is_active: editData?.is_active ? true : false,
        description: editData?.description || ""
      };
      form.setFieldsValue(body);
    } else {
      form.resetFields();
    }
  }, [editData, form]);

  const handleFinish = async (values: any) => {
    const formData = new FormData();

    for (const key in values) {
      formData.append(key, values[key]);
    }

    // TinyMCE description qo‘shiladi (agar formda bo‘lmasa)
    formData.append("description", description);
    if(editData) formData.append("_method", "PUT");
    const res = await mutate({
      url: editData ? `${documents}/${editData.id}` : documents,
      method:  "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (isSuccess) {
      form.resetFields();
      // @ts-ignore
      refetch();
      onClose();
        message.success(editData ? "Yo'riqnoma muvaffaqiyatli tahrirlandi!" : "Yo'riqnoma muvaffaqiyatli qo‘shildi!");
    } else if (isError) {
      message.error("Xatolik yuz berdi!");
    }
  };


  return (
    <Drawer
      title={<span className="font-semibold text-lg">{editData ? "Yo'riqnoma tahrirlash" : "Yangi yo'riqnoma qo‘shish"}</span>}
      placement="right"
      closable
      onClose={onClose}
      open={open}
      width={1100}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleFinish}
        initialValues={{status: true}}
      >
        <Form.Item
          label="Sarlavha"
          name="name"
          rules={[{required: true, message: "Iltimos, Xona nomini kiriting!"}]}
        >
          <Input size={'large'} placeholder="Kiriting..." />
        </Form.Item>

        <Form.Item name={'discription'} rules={[{required: !editData?.description , message:'Iltimos toldiring'}]} label="Tavsif (yo‘riqnoma)">
          <Editor
            apiKey="u0a8wrb907hkcshd3eb8p3qh3osvudouxp6hz44b7poei0x5"
            onEditorChange={(_newValue, editor) => setDescription(editor?.getContent({ format: "html" }))}
            initialValue={editData?.description || "<p></p>"}
            init={{
              height: 500,
              menubar: true,
              branding: false,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
                'textcolor', 'fontsize'
              ],
              toolbar:
                'undo redo | formatselect fontsizeselect | ' + // 👈 'fontsizeselect' qo‘shildi
                'bold italic underline strikethrough | ' +
                'forecolor backcolor | alignleft aligncenter alignright alignjustify | ' +
                'bullist numlist outdent indent | removeformat | link image media | ' +
                'table | code fullscreen preview | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              fontsize_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt' // 👈 O‘lchamlar
            }}
          />
        </Form.Item>

        <Form.Item>
          <Button loading={isLoading} size={'large'} type="primary" htmlType="submit" className="bg-teal-500" block>
            {editData ? "Saqlash" : "Qo‘shish"}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AddAndEdit;
