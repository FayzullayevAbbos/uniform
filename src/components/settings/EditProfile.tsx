import React, { useState } from 'react';
import {Drawer, Form, Input, Button, Upload, message, Image, Radio, DatePicker} from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';

interface EditProfileDrawerProps {
  open: boolean;
  onClose: () => void;
  userData: {
    fullName: string;
    phone: string;
    email: string;
    avatar: string;
  };
  onSubmit: (values: any) => void;
}

const EditProfileDrawer: React.FC<EditProfileDrawerProps> = ({
                                                               open,
                                                               onClose,
                                                               userData,
                                                               onSubmit,
                                                             }) => {
  const [form] = Form.useForm();
  const [preview, setPreview] = useState(userData.avatar);
  const [fileList, setFileList] = useState<any[]>([]);

  const handleFinish = (values: any) => {
    onSubmit({
      ...values,
      avatar: preview || '', // rasm bo'lmasa bo'sh string
    });
    message.success("Ma'lumotlar muvaffaqiyatli yangilandi");
    onClose();
  };

  const handleUploadChange = (info: any) => {
    const file = info.file;
    console.log(info)
    if (file.status === 'done' || file.status === 'uploading') {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file.originFileObj);
    }
    setFileList(info.fileList.slice(-1));
  };

  const handleRemoveImage = () => {
    setPreview('');
    setFileList([]);
    message.info('Rasm o‘chirildi');
  };

  return (
    <Drawer
      title={<span className="font-semibold text-lg ">Maʼlumotlarni tahrirlash</span>}
      width={400}
      onClose={onClose}
      open={open}
    >
      <div className="text-center mb-4">
        {preview ? (
          <div className="relative w-fit mx-auto settings">
            <Image
              src={preview}
              alt="Avatar"
              width={150}
                height={150}
              className="w-32 h-32 rounded-full object-cover border border-gray-300"
            />
            <Button
              type="text"
              icon={<DeleteOutlined />}
              onClick={handleRemoveImage}
              className="absolute top-0 right-0 text-red-600 hover:text-red-800"
            />
          </div>
        ) : (
          <div className="mb-2 text-sm text-gray-500">Rasm tanlanmagan</div>
        )}
        <Upload
          accept="image/*"
          beforeUpload={() => true}
          onChange={handleUploadChange}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />} className="mt-2">
            Rasmni yuklash
          </Button>
        </Upload>
      </div>

      <Form
        layout="vertical"
        form={form}
        initialValues={userData}
        onFinish={handleFinish}
        className="mt-4"
      >
        <Form.Item
          label="F.I.Sh"
          name="fullName"
          rules={[{ required: true, message: 'Ism va familyangizni kiriting' }]}
        >
          <Input size="large" className="!rounded-md" />
        </Form.Item>

        <Form.Item
          label="Telefon raqami"
          name="phone"
          rules={[{ required: true, message: 'Telefon raqami majburiy' }]}
        >
          <Input size="large" className="!rounded-md" />
        </Form.Item>

        <Form.Item
          label="Email manzili"
          name="email"
          rules={[
            { required: true, message: 'Email manzilini kiriting' },
            { type: 'email', message: 'Email noto‘g‘ri formatda' },
          ]}
        >
          <Input size="large" className="!rounded-md" />
        </Form.Item>
        <Form.Item label={"Tug'ilgan sana"} name={"birthday"} rules={[{ required: true, message: 'Tug‘ilgan sanani tanlang' }]}>
            <DatePicker
                className="w-full !rounded-md"
                type="date"
                size="large"
                placeholder="Tug'ilgan sanani tanlang"
            />
        </Form.Item>
        <Form.Item
          label="Jins"
          name="gender"
          rules={[{required: true}]}
        >
          <Radio.Group size={'large'} className="w-full">
            <div className="flex gap-2">
              <Radio.Button value={true} className="w-full text-center">
                Erkak
              </Radio.Button>
              <Radio.Button value={false} className="w-full text-center">
                Ayol
              </Radio.Button>
            </div>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full   !rounded-md"
          >
            Saqlash
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default EditProfileDrawer;
