import { Drawer, Form, Input, Button, message } from "antd";
import React from "react";
import {useApiMutateMutation} from "../../service/Api.tsx";

interface UpdatePasswordDrawerProps {
  open: boolean;
  onClose: () => void;
}

const UpdatePassword: React.FC<UpdatePasswordDrawerProps> = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const [mutate] = useApiMutateMutation()

  const handleFinish = async (values: any) => {
    const formData = new FormData();
    formData.append('old_password', values.old_password);
    formData.append('new_password', values.new_password);
    formData.append('new_password_confirmation', values.new_password_confirmation);
    formData.append('_method', 'PUT');
    const res = await mutate({
        url: '/change-password',
        method: 'POST',
        body: formData,
    })
    if (res?.data){
        message.success("Parol muvaffaqiyatli yangilandi");
       form.resetFields();
      onClose();
    }else {
        message.error("Parolni yangilashda xatolik yuz berdi");
        form.resetFields();
        form.validateFields()
    }
  };

  return (
    <Drawer
      title={<span className="font-semibold text-lg">Parolni yangilash</span>}
      placement="right"
      onClose={onClose}
      open={open}
      width={400}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleFinish}
        className="p-4 space-y-4"
      >
        <Form.Item
          label="Eski parol"
          name="old_password"
          rules={[{ required: true, message: "Eski parolni kiriting" }]}
        >
          <Input.Password size={'large'} placeholder="Eski parolni kiriting" />
        </Form.Item>

        <Form.Item
          label="Yangi parol"
          name="new_password"
          rules={[
            { required: true, message: "Yangi parolni kiriting" },
            { min: 6, message: "Parol kamida 6 ta belgidan iborat bo‘lishi kerak" },
          ]}
          hasFeedback
        >
          <Input.Password size={'large'} placeholder="Yangi parolni kiriting" />
        </Form.Item>

        <Form.Item
          label="Yangi parolni tasdiqlash"
          name="new_password_confirmation"
          dependencies={['new_password']}
          hasFeedback
          rules={[
            { required: true, message: "Parolni qayta kiriting" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('new_password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Parollar mos emas"));
              },
            }),
          ]}
        >
          <Input.Password size={'large'} placeholder="Yangi parolni qaytadan kiriting" />
        </Form.Item>

        <Form.Item>
          <Button size={'large'} type="primary" htmlType="submit" block>
            Yangilash
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default UpdatePassword;
