import { useState } from "react"
import type { UploadFile } from "antd"
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Steps,
  Upload
} from "antd"
import {
  UserIcon,
  FileIcon,
  PlusIcon,
  ImageIcon,
  ArrowLeftIcon,
  ArrowRightIcon
} from "lucide-react"
import { useApiMutateMutation } from "../../service/Api.tsx"
import dayjs from "dayjs"

interface EmployeeAddModalProps {
  open: boolean
  onCancel: () => void
}

const { Step } = Steps

export default function EmployeeAddModal({ open, onCancel }: EmployeeAddModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [basicForm] = Form.useForm()
  const [fileList, setFileList] = useState<{
    front: UploadFile[]
    left: UploadFile[]
    right: UploadFile[]
  }>({ front: [], left: [], right: [] })

  const [positions, setPositions] = useState<any[]>([{}])

  const [mutate] = useApiMutateMutation("employee/add")

  const handleNext = async () => {
    if (currentStep === 0) {
      try {
        await basicForm.validateFields()
        setCurrentStep(currentStep + 1)
      } catch (error) {
        message.error("Iltimos, barcha majburiy maydonlarni to'ldiring")
      }
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleUploadChange = (info: any, type: "front" | "left" | "right") => {
    let newFileList = [...info.fileList].slice(-1)
    setFileList({ ...fileList, [type]: newFileList })
  }

  const addPosition = () => {
    setPositions([...positions, {}])
  }

  const handlePositionChange = (index: number, key: string, value: any) => {
    const updated = [...positions]
    updated[index] = { ...updated[index], [key]: value }
    setPositions(updated)
  }

  const handleSubmit = async () => {
    try {
      const basicInfo = await basicForm.validateFields()

      const finalData = {
        basicInfo,
        education: positions,
        files: fileList,
      }

      console.log("Yuborilayotgan ma'lumot:", finalData)
      await mutate(finalData)

      message.success("Xodim muvaffaqiyatli qo‘shildi")
      onCancel()
    } catch (error) {
      console.error("Yuborish xatosi:", error)
      message.error("Xatolik yuz berdi")
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Form form={basicForm} layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Ism"
                  name="firstName"
                  rules={[{ required: true, message: "Iltimos, ismni kiriting" }]}
                >
                  <Input placeholder="Ism" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Familiya"
                  name="lastName"
                  rules={[{ required: true, message: "Iltimos, familiyani kiriting" }]}
                >
                  <Input placeholder="Familiya" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Otasining ismi" name="middleName">
              <Input placeholder="Otasining ismi" />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Tug'ilgan sana" name="birthDate">
                  <DatePicker format="DD.MM.YYYY" style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Telefon raqami" name="phoneNumber">
                  <Input addonBefore="+998" placeholder="90 123 45 67" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Jinsi" name="gender">
              <Select placeholder="Tanlang">
                <Select.Option value="male">Erkak</Select.Option>
                <Select.Option value="female">Ayol</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        )

      case 1:
        return (
          <>
            {positions.map((position, index) => (
              <Card key={index} style={{ marginBottom: 16 }} title={`Ma'lumot #${index + 1}`}>
                <Form layout="vertical">
                  <Form.Item label="O‘quv nomi">
                    <Input
                      value={position.educationName}
                      onChange={(e) =>
                        handlePositionChange(index, "educationName", e.target.value)
                      }
                      placeholder="Masalan, Toshkent Davlat Universiteti"
                    />
                  </Form.Item>

                  <Form.Item label="Ma'lumot turi">
                    <Select
                      value={position.educationType}
                      onChange={(value) =>
                        handlePositionChange(index, "educationType", value)
                      }
                      placeholder="Tanlang"
                    >
                      <Select.Option value="higher">Oliy</Select.Option>
                      <Select.Option value="secondary">O'rta</Select.Option>
                      <Select.Option value="special">Maxsus</Select.Option>
                    </Select>
                  </Form.Item>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="Boshlangan sana">
                        <DatePicker
                          style={{ width: "100%" }}
                          format="DD.MM.YYYY"
                          value={position.startDate ? dayjs(position.startDate) : undefined}
                          onChange={(date, dateString) =>
                            handlePositionChange(index, "startDate", dateString)
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Yakunlangan sana">
                        <DatePicker
                          style={{ width: "100%" }}
                          format="DD.MM.YYYY"
                          value={position.endDate ? dayjs(position.endDate) : undefined}
                          onChange={(date, dateString) =>
                            handlePositionChange(index, "endDate", dateString)
                          }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Card>
            ))}
            <Button
              type="primary"
              icon={<PlusIcon />}
              onClick={addPosition}
              block
              style={{ marginTop: 8 }}
            >
              Yana qo‘shish
            </Button>
          </>
        )

      case 2:
        return (
          <Row gutter={16}>
            {["front", "left", "right"].map((type) => (
              <Col span={8} key={type}>
                <Card
                  style={{ textAlign: "center", height: 200 }}
                  bodyStyle={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Upload
                    name={type}
                    listType="picture-card"
                    showUploadList={false}
                    fileList={fileList[type as keyof typeof fileList]}
                    onChange={(info) =>
                      handleUploadChange(info, type as "front" | "left" | "right")
                    }
                    beforeUpload={() => false}
                  >
                    <div>
                      <ImageIcon />
                      <div style={{ marginTop: 8 }}>Rasm qo‘shish</div>
                    </div>
                  </Upload>
                  <div style={{ marginTop: "auto" }}>
                    {type === "front"
                      ? "To‘g‘ri"
                      : type === "left"
                        ? "Chap"
                        : "O‘ng"} rasmi
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )

      default:
        return null
    }
  }

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      width={1000}
      title="Xodim qo‘shish"
    >
      <>
      <div className={'grid grid-cols-4 gap-6'}>
        <Steps
          direction="vertical"
          className={'col-span-1 mt-10 border-r'}
          current={currentStep}
          size="small"
          style={{marginBottom: 0, flex: 1}}
        >
            <Step title="Asosiy ma'lumotlar" icon={<UserIcon />} />
            <Step title="Ma'lumoti" icon={<FileIcon />} />
            <Step title="Rasmlar" icon={<ImageIcon />} />
        </Steps>

        <div style={{marginTop: 24}} className={'col-span-3 '}>{renderStepContent()}</div>
      </div>

      <div style={{ marginTop: 24, textAlign: "right" }}>
        {currentStep > 0 && (
          <Button
            onClick={handlePrev}
            style={{ marginRight: 8 }}
            icon={<ArrowLeftIcon />}
          >
            Orqaga
          </Button>
        )}
        {currentStep < 2 ? (
          <Button type="primary" onClick={handleNext} icon={<ArrowRightIcon />}>
            Keyingi
          </Button>
        ) : (
          <Button type="primary" onClick={handleSubmit}>
            Saqlash
          </Button>
        )}
      </div>
      </>
    </Modal>
  )
}
