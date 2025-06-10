import {useState} from "react"
import type {UploadFile} from "antd"
import {Button, Card, Col, DatePicker, Form, Input, message, Modal, Row, Select, Steps, Upload} from "antd"
import {ArrowLeftIcon, ArrowRightIcon, FileIcon, ImageIcon, PlusIcon, SaveIcon, UserIcon} from "lucide-react"
import {useApiMutateMutation, useApiRequestQuery} from "../../service/Api.tsx"
import dayjs from "dayjs"

interface EmployeeAddModalProps {
  open: boolean
  onCancel: () => void
}

const { Step } = Steps

export default function EmployeeAddModal({ open, onCancel }: EmployeeAddModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [basicForm] = Form.useForm()
    const [positionForm] = Form.useForm()
  const [fileList, setFileList] = useState<{
    front: UploadFile[]
    left: UploadFile[]
    right: UploadFile[]
  }>({ front: [], left: [], right: [] })

  const [positions, setPositions] = useState<any[]>([{}])


  const [mutate, {isError, isLoading}] = useApiMutateMutation()
  const regions = useApiRequestQuery({
    url: '/regions',
    method: 'GET',
  })

  const {data: districts, refetch} = useApiRequestQuery({
    url: `/region/${basicForm.getFieldValue('region_id')}/districts`,
    method: 'GET',
  })
  const {data: positionType} = useApiRequestQuery({
    url: '/positions',
    method: 'GET',
  })
  const {data: rooms} = useApiRequestQuery({
    url: '/rooms',
    method: 'GET',
  })
  const {data: departments} = useApiRequestQuery({
    url: '/departments',
    method: 'GET',
  })
  const selectRegion = basicForm.getFieldValue('region_id')

  const handleNext = async () => {
    if (currentStep === 0) {
      try {
        await basicForm.validateFields()
        setCurrentStep(currentStep + 1)
      } catch (error) {
        message.error("Iltimos, barcha majburiy maydonlarni to'ldiring")
      }
    } else if (currentStep === 1) {
      try {
        await positionForm.validateFields()
        setCurrentStep(currentStep + 1)
      } catch (error) {
        message.error("Iltimos, barcha majburiy maydonlarni to'ldiring")
      }
    }else {
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
  const removePosition = (index: number) => {
    const updated = positions.filter((_, i) => i !== index);
    setPositions(updated);
  };
  // console.log("Positions:", positions)

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
                  name="first_name"
                  rules={[{ required: true, message: "Iltimos, ismni kiriting" }]}
                >
                  <Input placeholder="Ism" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Familiya"
                  name="last_name"
                  rules={[{ required: true, message: "Iltimos, familiyani kiriting" }]}
                >
                  <Input placeholder="Familiya" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Otasining ismi" name="middle_name">
              <Input placeholder="Otasining ismi" />
            </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="PIN"
                  name="pin"
                  rules={[
                    {required: true, message: "Iltimos, PIN kiriting"},
                    {pattern: /^[0-9]{14}$/, message: "PIN  14 ta raqamdan iborat bo'lishi kerak"},
                  ]}
                >
                  <Input placeholder="12345678901234" maxLength={14}/>
                </Form.Item>

              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item rules={[{required: true, message: "Iltimos, tug'ilgan sanasini kiriting"}]}
                           label="Tug'ilgan sana" name="birth_date">
                  <DatePicker format="DD.MM.YYYY" style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item rules={[{required: true, message: "Iltimos, tel raqam  kiriting"}]} label="Telefon raqami"
                           name="phone">
                  <Input addonBefore="+998" placeholder="90 123 45 67" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item rules={[{required: true, message: "Iltimos,jinsini kiriting"}]} label="Jinsi" name="gender">
              <Select placeholder="Tanlang">
                <Select.Option value="male">Erkak</Select.Option>
                <Select.Option value="female">Ayol</Select.Option>
              </Select>
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Viloyat" name="region_id"
                           rules={[{required: true, message: "Iltimos, viloyatni tanlang"}]}>
                  <Select onChange={() => refetch()} placeholder="Viloyatni tanlang">
                    {regions?.data?.data?.map((region) => (
                      <Select.Option key={region.id} value={region.id}>
                        {region.oz}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Tuman" name="district_id"
                           rules={[{required: true, message: "Iltimos, tumanni tanlang"}]}>
                  <Select disabled={!selectRegion} placeholder="Tumanni tanlang">
                    {districts?.data?.map((district) => (
                      <Select.Option key={district.id} value={district.id}>
                        {district.oz}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label="Xonasi" name="room_id"
                           rules={[{required: true, message: "Iltimos, xonani tanlang"}]}>
                  <Select placeholder="Xonani tanlang">
                    {rooms?.data?.map((room) => (
                      <Select.Option key={room.id} value={room.id}>
                        {room.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Bo‘lim" name="department_id"
                           rules={[{required: true, message: "Iltimos, bo‘limni tanlang"}]}>
                  <Select placeholder="Bo‘limni tanlang">
                    {departments?.data?.map((department) => (
                      <Select.Option key={department.id} value={department.id}>
                        {department.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Lavozim" name="position_id"
                           rules={[{required: true, message: "Iltimos, lavozimni tanlang"}]}>
                  <Select placeholder="Lavozimni tanlang">
                    {positionType?.data?.map((position) => (
                      <Select.Option key={position.id} value={position.id}>
                        {position.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )

      case 1:
        return (
          <div className={'h-[80vh] overflow-y-auto pb-3'}>
            {positions.map((position, index) => (
              <Card
                extra={
                  positions.length > 1 && (
                    <Button
                      danger
                      type="text"
                      onClick={() => removePosition(index)}
                    >
                      O‘chirish
                    </Button>
                  )
                }
                key={index}
                style={{marginBottom: 16}}
                title={`Ma'lumot #${index + 1}`}>
                <Form form={positionForm} layout="vertical">
                  <Form.Item
                    name={'name'}
                    rules={[{required: true, message: "Iltimos, malumot kiriting"}]}
                    label="O‘quv nomi">
                    <Input
                      value={position.name}
                      onChange={(e) =>
                        handlePositionChange(index, "name", e.target.value)
                      }
                      placeholder="Masalan, Toshkent Davlat Universiteti"
                    />
                  </Form.Item>

                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item rules={[{required: true, message: "Iltimos tanlang"}]} name={'type'}
                                 label="Ma'lumot turi">
                        <Select
                          value={position.type}
                          onChange={(value) =>
                            handlePositionChange(index, "type", value)
                          }
                          placeholder="Tanlang"
                        >
                          <Select.Option value="higher">Oliy</Select.Option>
                          <Select.Option value="secondary">O'rta</Select.Option>
                          <Select.Option value="special">Maxsus</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item rules={[{required: true, message: "Iltimos sanani kiriting"}]} name={'start_date'}
                                 label="Boshlangan sana">
                        <DatePicker
                          style={{ width: "100%" }}
                          format="DD.MM.YYYY"
                          value={position.startDate ? dayjs(position.start_date) : undefined}
                          onChange={(date, dateString) =>
                            handlePositionChange(index, "start_date", dateString)
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name={'end_date'} rules={[{required: true, message: "Iltimos sanani kiriting"}]}
                                 label="Yakunlangan sana">
                        <DatePicker
                          style={{ width: "100%" }}
                          format="DD.MM.YYYY"
                          value={position.endDate ? dayjs(position.end_date) : undefined}
                          onChange={(_date, dateString) =>
                            handlePositionChange(index, "end_date", dateString)
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
          </div>
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
      centered
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
            icon={<ArrowLeftIcon className={'mt-1'}/>}
          >
            Orqaga
          </Button>
        )}
        {currentStep < 2 ? (
          <Button type="primary" onClick={handleNext} icon={<ArrowRightIcon className={'mt-1'}/>}>
            Keyingi
          </Button>
        ) : (
          <Button type="primary" icon={<SaveIcon className={'mt-1'}/>} onClick={handleSubmit}>
            Saqlash
          </Button>
        )}
      </div>
      </>
    </Modal>
  )
}
