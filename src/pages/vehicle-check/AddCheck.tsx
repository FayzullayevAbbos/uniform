import { useState } from "react"
import { Modal, Form, Select, DatePicker, Button, Typography, Upload } from "antd"
import type { UploadFile } from "antd"

const { Title, Text } = Typography
const { Dragger } = Upload

interface TechnicalInspectionModalProps {
  open: boolean
  onCancel: () => void
}

export default function TechnicalInspectionModal({ open, onCancel }: TechnicalInspectionModalProps) {
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Form values:", values)
        onCancel()
      })
      .catch((info) => {
        console.log("Validate Failed:", info)
      })
  }

  const uploadProps = {
    onRemove: (file: UploadFile) => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
    },
    beforeUpload: (file: UploadFile) => {
      setFileList([...fileList, file])
      return false
    },
    fileList,
  }

  return (
    <Modal
      title="Yangi texnik ko'rik"
      open={open}
      onCancel={onCancel}
      footer={[
        <Button key="submit" type="primary" onClick={handleSubmit} style={{ backgroundColor: "#14b8a6" }}>
          Yuborish
        </Button>,
      ]}
      width={500}
    >
      <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
        <Form.Item label="Holatini tanlang" name="status">
          <Select size={'large'} placeholder="Tanlang">
            <Select.Option value="option1">Option 1</Select.Option>
            <Select.Option value="option2">Option 2</Select.Option>
            <Select.Option value="option3">Option 3</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Texnik ko'rikdan o'tgan sana" name="inspectionDate">
          <DatePicker size={'large'} style={{ width: "100%" }} format="DD.MM.YYYY" placeholder="31.01.2025" />
        </Form.Item>

        <Form.Item label="Texnik ko'rik amal qilish muddati" name="expirationDate">
          <DatePicker size={'large'} style={{ width: "100%" }} format="DD.MM.YYYY" placeholder="31.01.2025" />
        </Form.Item>

        <div style={{ marginBottom: 16 }}>
          <Title level={5} style={{ marginBottom: 8 }}>
            Biriktirilgan fayllar
          </Title>
          <Form.Item name="files">
            <Dragger {...uploadProps} className={' '} style={{ padding: "16px 0" }}>
              <p className="ant-upload-text">
                Faylni bu yerga tashlang yoki <Text style={{ color: "#14b8a6" }}>kompyuterdan yuklang</Text>
              </p>
            </Dragger>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  )
}
