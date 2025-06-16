import { useState } from "react";
import type { UploadFile } from "antd";
import {
  Button,
  DatePicker,
  Form,
  message,
  Modal,
  Select,
  Typography,
  Upload,
} from "antd";
import { employees, techical } from "../../service/URLs.ts";
import {
  useApiMutateMutation,
  useApiRequestQuery,
} from "../../service/Api.tsx";

const { Title, Text } = Typography;
const { Dragger } = Upload;

interface TechnicalInspectionModalProps {
  open: boolean;
  onCancel: () => void;
    refetch: () => void;
}

export default function TechnicalInspectionModal({
                                                   open,
                                                   onCancel,
                                                    refetch,
                                                 }: TechnicalInspectionModalProps) {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [mutate] = useApiMutateMutation();

  const { data: employees_data } = useApiRequestQuery({
    url: employees,
    method: "GET",
    params: {
      page_size: 1000,
    },
  });

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const formData = new FormData();
        formData.append("employee_id", values.status);
        formData.append(
          "start_date",
          values.inspectionDate.format("YYYY-MM-DD")
        );
        formData.append(
          "end_date",
          values.expirationDate.format("YYYY-MM-DD")
        );

        if (fileList.length > 0) {
          // formData.append("files", fileList);
          fileList.forEach((file ,index) => {
            formData.append(`files[${index}]`, file);
          })
        }

        mutate({
          url: techical,
          method: "POST",
          body: formData,
        });

        onCancel();
        form.resetFields();
        setFileList([]);
        refetch();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const uploadProps = {
    beforeUpload: (file: UploadFile) => {
      setFileList([file]);
      return false; // faylni avtomatik yuklash emas
    },
    onRemove: () => {
      setFileList([]);
    },
    multiple: true,
    fileList,

  };

  return (
    <Modal
      title="Yangi texnik ko'rik"
      open={open}
      onCancel={onCancel}
      footer={[
        <Button
          key="submit"
          type="primary"
          onClick={handleSubmit}
          style={{ backgroundColor: "#14b8a6" }}
        >
          Yuborish
        </Button>,
      ]}
      width={500}
    >
      <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
        <Form.Item
          label="Hodimni tanlang"
          name="status"
          rules={[{ required: true, message: "Iltimos, xodimni tanlang" }]}
        >
          <Select size={"large"} placeholder="Tanlang">
            {employees_data?.data?.map((employee) => (
              <Select.Option key={employee.id} value={employee.id}>
                {employee.first_name} {employee.last_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Texnik ko'rikdan o'tgan sana"
          name="inspectionDate"
          rules={[{ required: true, message: "Iltimos, sanani tanlang" }]}
        >
          <DatePicker
            size={"large"}
            style={{ width: "100%" }}
            format="DD.MM.YYYY"
            placeholder="31.01.2025"
          />
        </Form.Item>

        <Form.Item
          label="Texnik ko'rik amal qilish muddati"
          name="expirationDate"
          rules={[{ required: true, message: "Iltimos, sanani tanlang" }]}
        >
          <DatePicker
            size={"large"}
            style={{ width: "100%" }}
            format="DD.MM.YYYY"
            placeholder="31.01.2025"
          />
        </Form.Item>

        <div style={{ marginBottom: 16 }}>
          <Title level={5} style={{ marginBottom: 8 }}>
            Biriktirilgan fayl
          </Title>
          <Form.Item
            name="files"
            rules={[
              {
                required: true,
                message: "Iltimos, fayl yuklang",
              },
            ]}
          >
            <Dragger
              accept={"application/pdf"}
              {...uploadProps}
              style={{ padding: "16px 0" }}
            >
              <p className="ant-upload-text">
                Faylni bu yerga tashlang yoki{" "}
                <Text style={{ color: "#14b8a6" }}>kompyuterdan yuklang</Text>
              </p>
            </Dragger>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
}
