import React, {useEffect} from "react";
import {Button, Drawer, Form, Input, message, Radio} from "antd";
import {useApiMutateMutation} from "../../service/Api.tsx";
import {departments, rooms} from "../../service/URLs.ts";

interface AddSectionDrawerProps {
  open: boolean,
  onClose: () => void,
  editData?: { id:number; name: string; order: number; is_active: number | null } | null,
  refetch?: never
}

const AddAndEdit: React.FC<AddSectionDrawerProps> = ({
                                                       open,
                                                       onClose,
                                                       editData,
                                                       refetch
                                                     }) => {
  const [form] = Form.useForm();
  const [mutate, {isLoading, isError, isSuccess}] = useApiMutateMutation()
  useEffect(() => {
    if (editData) {
      const body = {...editData, is_active: editData?.is_active ? true : false};
      console.log(editData?.is_active)
      form.setFieldsValue(body);
    } else {
      form.resetFields();
    }
  }, [editData, form]);

  const handleFinish  = async (values: {id:number; name: string; order: number; is_active: boolean }) =>  {
  const res = await  mutate({
      url: editData ? `${departments}/${editData.id}` : departments,
      method: editData ? 'PUT' : 'POST',
      body: {...values, is_active: values.is_active ? 1 : 0},
    })
    if (res?.data) {
      form.resetFields();
      // @ts-ignore
      refetch();
      onClose();
    } else if (isError) {
      message.error("Xatolik yuz berdi!");
    }
  };

  return (
    <Drawer
      title={
        <span className="font-semibold text-lg">
          {editData ? "Bo‘limni tahrirlash" : "Yangi bo‘lim qo‘shish"}
        </span>
      }
      placement="right"
      closable
      onClose={onClose}
      open={open}
      width={400}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleFinish}
        initialValues={{status: true}}
      >
        <Form.Item
          label="Bo‘lim nomi"
          name="name"
          rules={[{required: true, message: "Iltimos, bo‘lim nomini kiriting!"}]}
        >
          <Input size={'large'} placeholder="Kiriting..."/>
        </Form.Item>

        <Form.Item
          label="Tartib raqami"
          name="order"
          rules={[{required: true, message: "Iltimos, tartib raqamini kiriting!"}]}
        >
          <Input size={'large'} type="number" placeholder="Kiriting..."/>
        </Form.Item>

        <Form.Item
          label="Holati"
          name="is_active"
          rules={[{required: true}]}
        >
          <Radio.Group size={'large'} className="w-full">
            <div className="flex gap-2">
              <Radio.Button value={true} className="w-full text-center">
                Faol
              </Radio.Button>
              <Radio.Button value={false} className="w-full text-center">
                Faol emas
              </Radio.Button>
            </div>
          </Radio.Group>
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
