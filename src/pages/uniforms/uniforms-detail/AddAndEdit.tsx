import React, { useEffect, useState } from "react";
import { Button, Drawer, Form, Input, message, Select, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useApiMutateMutation, useApiRequestQuery } from "../../../service/Api.tsx";
import { categories, types, uniforms } from "../../../service/URLs.ts";

const { Option } = Select;

interface Type {
  id: number;
  name: string;
  order: number;
  is_active: number | null;
  created_at: string;
}

interface Category {
  id: number;
  name: string;
  order: number;
  is_active: number | null;
  created_at: string;
}

interface FormValues {
  name: string;
  category: number;
  type: number;
}

interface AddUniformDrawerProps {
  open: boolean;
  onClose: () => void;
  editData?: { id: number; name: string; order: number; type: Type; category: Category; image: string } | null;
  refetch?: () => void;
}

const AddAndEdit: React.FC<AddUniformDrawerProps> = ({ open, onClose, editData, refetch }) => {
  const [form] = Form.useForm();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const { data: category, isLoading: categoryLoading } = useApiRequestQuery({
    url: categories,
    method: "GET",
    params: { page_size: 100 },
  });

  const { data: type, isLoading: typeLoading } = useApiRequestQuery({
    url: types,
    method: "GET",
    params: { page_size: 100 },
  });

  const [mutate, { isLoading, isError }] = useApiMutateMutation();

  useEffect(() => {
    if (editData) {
      form.setFieldsValue({
        ...editData,
        type: editData.type?.id,
        category: editData?.category?.id,
      });
      setPreviewUrl(editData?.image);
    } else {
      form.resetFields();
      setPreviewUrl(null);
      setImage(null);
    }
  }, [editData, form, open]);

  const handleBeforeUpload = (file: File) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Faqat rasm fayllarini yuklash mumkin!");
      return false;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };

    reader.readAsDataURL(file);
    setImage(file);
    return false; // Prevent upload
  };

  const handleFinish = async (values: FormValues) => {
    const body = new FormData();
    body.append("name", values.name);
    body.append("category_id", values.category.toString());
    body.append("type_id", values.type.toString());
    if (image) body.append("image", image);
    if (editData) body.append("_method", "PUT");

    const res = await mutate({
      url: editData ? `${uniforms}/${editData.id}` : uniforms,
      method: "POST",
      body,
    });

    if (res?.data) {
      form.resetFields();
      refetch?.();
      onClose();
      setPreviewUrl(null);
      setImage(null);
    } else if (isError) {
      message.error("Xatolik yuz berdi!");
    }
  };

  return (
    <Drawer
      title={<span className="font-semibold text-lg">{editData ? "Tahrirlash" : "Yangi uniforma"}</span>}
      placement="right"
      onClose={onClose}
      open={open}
      width={420}
      className="overflow-y-auto"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="flex flex-col gap-4"
      >
        <Form.Item
          name="image"
          label="Rasm"
          rules={[{ required: true, message: "Iltimos, rasmni yuklang" }]}
        >
          <Upload
            accept="image/*"
            listType="picture-card"
            showUploadList={false}
            beforeUpload={handleBeforeUpload}
            className="!w-full h-[300px]"
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }}
              />
            ) : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Rasm qo‘shish</div>
              </div>
            )}
          </Upload>

          {previewUrl && (
            <Button
              className="mt-2"
              danger
              block
              onClick={() => {
                setPreviewUrl(null);
                setImage(null);
              }}
            >
              Rasmni o‘chirish
            </Button>
          )}
        </Form.Item>

        <Form.Item
          label="Nomi"
          name="name"
          rules={[{ required: true, message: "Iltimos, nomini kiriting" }]}
        >
          <Input size="large" placeholder="Kiriting..." />
        </Form.Item>

        <Form.Item
          label="Kategoriya"
          name="category"
          rules={[{ required: true, message: "Kategoriya tanlang" }]}
        >
          <Select size="large" placeholder="Tanlang" loading={categoryLoading}>
            {category?.data?.map((item: Category) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Turi"
          name="type"
          rules={[{ required: true, message: "Turini tanlang" }]}
        >
          <Select size="large" placeholder="Tanlang" loading={typeLoading}>
            {type?.data?.map((item: Type) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            block
            loading={isLoading}
            className="bg-teal-500"
          >
            {editData ? "Tahrirlash" : "Qo‘shish"}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AddAndEdit;
