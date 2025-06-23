import React, {useEffect, useState} from "react"
import {Button, Card, Col, DatePicker, Form, Input, message, Modal, Row, Select, Steps, Upload} from "antd"
import {ArrowLeftIcon, ArrowRightIcon, FileIcon, ImageIcon, PlusIcon, SaveIcon, UserIcon} from "lucide-react"
import {useApiMutateMutation, useApiRequestQuery} from "../../service/Api.tsx"
import dayjs from "dayjs"
import {PlusOutlined} from "@ant-design/icons";
import {employees} from "../../service/URLs.ts";

export interface Department {
  id: number
  name: string
  order: number
  is_active: number
  created_at: string
}

export interface Position {
  id: number
  name: string
  order: number
  is_active: number
  created_at: string
}

export interface Room {
  id: number
  name: string
  room_number: number
  order: number
  is_active: number
  created_at: string
}

export interface Region {
  id: number
  oz: string
}

export interface District {
  id: number
  region_id: number
  oz: string
}

export interface Information {
  id: number
  employee_id: number
  name: string
  type: string
  start_date: string
  end_date: string
  created_at: string
  updated_at: string
}

export interface Employee {
  id: number
  department: Department
  position: Position
  room: Room
  region: Region
  district: District
  last_name: string
  first_name: string
  middle_name: string
  birth_date: string
  phone: string
  pin: string
  image: string
  right_image: string
  left_image: string
  gender: string
  informations: Information[]
}

interface EmployeeAddModalProps {
  open: boolean
  onCancel: () => void
  refetch?: () => void
  editData?: Employee | any | null
}

interface ImageState {
  left_image: string | null;
  image: string | null;
  right_image: string | null;
}

const {Step} = Steps

export default function EmployeeAddModal({open, onCancel, refetch, editData}: EmployeeAddModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [basicForm] = Form.useForm()
  const [positionForm] = Form.useForm();
  const [imgForm] = Form.useForm()

  useEffect(() => {
    positionForm.setFieldsValue(editData?.informations?.[0] || {});
  }, [editData])

  const [previewUrls, setPreviewUrls] = useState<ImageState>({
    left_image: null,
    image: null,
    right_image: null
  });

  const [images, setImages] = useState<{
    left_image: File | null;
    image: File | null;
    right_image: File | null;
  }>({
    left_image: null,
    image: null,
    right_image: null
  });

  const [positions, setPositions] = useState<any[]>([{}])

  const [basicInfo, setBasicInfo] = useState<any>({})
  const [positionInfo, setPositionInfo] = useState<any>({})

  const [mutate, {isError, isLoading, isSuccess}] = useApiMutateMutation()

  const regions = useApiRequestQuery({
    url: '/regions',
    method: 'GET',
  })

  const {data: districts, refetch: districtRefetch} = useApiRequestQuery({
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

  function populateEmployeeForm(editData: Employee) {
    if (!editData) return;

    // Basic Info
    basicForm.setFieldsValue({
      first_name: editData.first_name,
      last_name: editData.last_name,
      middle_name: editData.middle_name,
      birth_date: dayjs(editData.birth_date),
      phone: editData.phone,
      pin: editData.pin,
      department_id: editData.department?.id,
      position_id: editData.position?.id,
      room_id: editData.room?.id,
      region_id: editData.region?.id,
      district_id: editData.district?.id,
      gender: editData.gender
    });

    // Position Info
    if (editData?.informations?.length) {
      const initialValues: any = {}

      editData.informations.forEach((info, index) => {
        initialValues[`name_${index}`] = info.name
        initialValues[`type_${index}`] = info.type
        initialValues[`start_date_${index}`] = dayjs(info.start_date)
        initialValues[`end_date_${index}`] = dayjs(info.end_date)
      })

      positionForm.setFieldsValue(initialValues)
    }

    // Images preview
    setPreviewUrls({
      image: editData.image || null,
      left_image: editData.left_image || null,
      right_image: editData.right_image || null,
    });

    // Save for state if needed
    setBasicInfo({
      first_name: editData.first_name,
      last_name: editData.last_name,
      middle_name: editData.middle_name,
      birth_date: editData.birth_date,
      phone: editData.phone,
      pin: editData.pin,
    });

    // Informations if needed later
    if (Array.isArray(editData.informations)) {
      setPositions(editData.informations.map(info => ({
        ...info,
        start_date: dayjs(info.start_date),
        end_date: dayjs(info.end_date)
      })));
    }
  }

  useEffect(() => {
    if (editData) {
      populateEmployeeForm(editData);
    } else {
      basicForm.resetFields();
      positionForm.resetFields();
      imgForm.resetFields();
      setCurrentStep(0)
      setBasicInfo({});
      setPositionInfo({});
      setPositions([{}]);
      setPreviewUrls({
        left_image: null,
        image: null,
        right_image: null
      });
    }
  }, [editData, basicForm, positionForm, imgForm, open]);

  const handleNext = async () => {
    if (currentStep === 0) {
      try {
        await basicForm.validateFields()
        setBasicInfo(basicForm.getFieldsValue())
        setCurrentStep(currentStep + 1)
      } catch (error) {
        message.error("Iltimos, barcha majburiy maydonlarni to'ldiring")
      }
    } else if (currentStep === 1) {
      try {
        await positionForm.validateFields()
        setPositionInfo(positionForm.getFieldsValue())
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

  const addPosition = () => {
    setPositions([...positions, {}])
  }

  const handlePositionChange = (index: number, key: string, value: any) => {
    const updated = [...positions]
    updated[index] = {...updated[index], [key]: value}
    setPositions(updated)
  }

  const removePosition = (index: number) => {
    const updated = positions.filter((_, i) => i !== index);
    setPositions(updated);
  };

  const handleBeforeUpload = (file, fieldName) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
      return Upload.LIST_IGNORE;
    }

    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('Image must be smaller than 5MB!');
      return Upload.LIST_IGNORE;
    }

    // Preview the image
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewUrls(prev => ({
        ...prev,
        [fieldName]: reader.result
      }));
    };

    setImages(prev => ({
      ...prev,
      [fieldName]: file
    }));

    return false; // Prevent automatic upload
  };

  const handleDeleteImage = (fieldName:any) => {
    setPreviewUrls(prev => ({
      ...prev,
      [fieldName]: null
    }));
    setImages(prev => ({
      ...prev,
      [fieldName]: null
    }));
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    try {
      if (!editData) await imgForm.validateFields();
      Object.entries(basicInfo).forEach(([key, value]) => {
        if (value == null) return; // Skip undefined and null
        if (key === 'birth_date' && value) {
          // @ts-ignore
          const formattedDate = dayjs(value).isValid()
          // @ts-ignore
            ? dayjs(value).format('YYYY-MM-DD')
            : value;
          formData.append(key, formattedDate);
        } else {
          formData.append(key, value);
        }
      });

      if (positions && positions.length > 0) {
        const cleaned = positions.map(({ id, employee_id, name, type, start_date, end_date }) => ({
          name,
          id:employee_id,
          type,
          start_date: start_date ? dayjs(start_date).format('YYYY-MM-DD') : null,
          end_date: end_date ? dayjs(end_date).format('YYYY-MM-DD') : null
        }));

        formData.append('informations', JSON.stringify(cleaned));
      }


      const imageFields = imgForm.getFieldsValue();
      ['image', 'left_image', 'right_image'].forEach(key => {
        const file = imageFields[key]?.fileList?.[0]?.originFileObj;
        if (file) {
          formData.append(key, file);
          // Add filename if needed
          // formData.append(`${key}_filename`, file.name);
        }

      });
      if (editData) formData.append('_method', "PUT");

      const res = await mutate({
        url: editData ? `${employees}/${editData?.id}`: employees,
        method: 'POST',
        body: formData,
      });
      if (res.data) {
        setImages(null)
        setPreviewUrls({
          left_image: null,
          image: null,
          right_image: null
        });
        basicForm.resetFields();
        positionForm.resetFields();
        imgForm.resetFields();
        setPositions([{}]);
        setCurrentStep(0);
        message.success("Xodim muvaffaqiyatli qo'shildi");
        refetch();
        onCancel();
      } else if (res?.error?.data?.errors) {

        const errorFields = Object.entries(res?.error?.data?.errors).map(([field, errors]) => ({
          name: field,
          errors: errors,
        }));
        console.log(errorFields)
        errorFields.map((field, index) => {
          message.error(field.errors);
        })

      }

    } catch (error) {
      console.error("Submission error:", error);

      // More specific error messages
      if (error?.errorFields) {
        message.error("Iltimos, barcha majburiy maydonlarni to'g'ri to'ldiring");
      } else {
        message.error(error.message || "Xodim qo'shishda xatolik yuz berdi");
      }

      return;
    }
  };

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
                  rules={[{required: true, message: "Iltimos, ismni kiriting"}]}
                >
                  <Input placeholder="Ism"/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Familiya"
                  name="last_name"
                  rules={[{required: true, message: "Iltimos, familiyani kiriting"}]}
                >
                  <Input placeholder="Familiya"/>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item rules={[{required:true , message:'Iltimos , '}]} label="Otasining ismi" name="middle_name">
                  <Input placeholder="Otasining ismi"/>
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
                  <DatePicker format="DD.MM.YYYY" style={{width: "100%"}}/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item rules={[{required: true, message: "Iltimos, tel raqam  kiriting"}]} label="Telefon raqami"
                           name="phone">
                  <Input addonBefore="+998" placeholder="90 123 45 67"/>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item rules={[{required: true, message: "Iltimos,jinsini kiriting"}]} label="Jinsi" name="gender">
              <Select placeholder="Tanlang">
                <Select.Option value="Male">Erkak</Select.Option>
                <Select.Option value="Female">Ayol</Select.Option>
              </Select>
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Viloyat" name="region_id"
                           rules={[{required: true, message: "Iltimos, viloyatni tanlang"}]}>
                  <Select onChange={() => districtRefetch()} placeholder="Viloyatni tanlang">
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
        console.log(positions)
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
                    name={`name_${index}`}
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
                      <Form.Item rules={[{required: true, message: "Iltimos tanlang"}]} name={`type_${index}`}
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
                      <Form.Item
                        rules={[{required: true, message: "Iltimos sanani kiriting"}]}
                        name={`start_date_${index}`}
                        label="Boshlangan sana"
                      >
                        <DatePicker
                          style={{width: "100%"}}
                          format="DD.MM.YYYY"
                          value={position.start_date ? dayjs(position.start_date, 'YYYY-MM-DD') : undefined}
                          onChange={(_date, dateString) =>
                            handlePositionChange(
                              index,
                              "start_date",
                              dayjs(_date, "DD.MM.YYYY").format("YYYY-MM-DD")
                            )
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        name={`end_date_${index}`}
                        rules={[{required: true, message: "Iltimos sanani kiriting"}]}
                        label="Yakunlangan sana"
                      >
                        <DatePicker
                          style={{width: "100%"}}
                          format="DD.MM.YYYY"
                          value={position.end_date ? dayjs(position.end_date, 'YYYY-MM-DD') : undefined}
                          onChange={(_date, dateString) =>
                            handlePositionChange(
                              index,
                              "end_date",
                              dayjs(_date, "DD.MM.YYYY").format("YYYY-MM-DD")
                            )
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
              icon={<PlusIcon/>}
              onClick={addPosition}
              block
              style={{marginTop: 8}}
            >
              Yana qo‘shish
            </Button>
          </div>
        )

      case 2:
        return (
          <Form form={imgForm} layout={'vertical'}>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name="left_image"
                  label="Left Image"
                  rules={[{required: true, message: "Please upload an image"}]}
                >
                  <Upload
                    accept="image/*"
                    listType="picture-card"
                    showUploadList={false}
                    beforeUpload={(file) => handleBeforeUpload(file, 'left_image')}
                    className="!w-full h-[300px]"
                  >
                    {previewUrls.left_image ? (
                      <img
                        src={previewUrls.left_image}
                        alt="Preview"
                        style={{width: "100%", height: "100%", objectFit: "cover", borderRadius: 8}}
                      />
                    ) : (
                      <div>
                        <PlusOutlined/>
                        <div style={{marginTop: 8}}>Add Image</div>
                      </div>
                    )}
                  </Upload>

                  {previewUrls.left_image && (
                    <Button
                      className="mt-2"
                      danger
                      block
                      onClick={() => handleDeleteImage('left_image')}
                    >
                      Delete Image
                    </Button>
                  )}
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  name="image"
                  label="Center Image"
                  rules={[{required: true, message: "Please upload an image"}]}
                >
                  <Upload
                    accept="image/*"
                    listType="picture-card"
                    showUploadList={false}
                    beforeUpload={(file) => handleBeforeUpload(file, 'image')}
                    className="!w-full h-[300px]"
                  >
                    {previewUrls.image ? (
                      <img
                        src={previewUrls.image}
                        alt="Preview"
                        style={{width: "100%", height: "100%", objectFit: "cover", borderRadius: 8}}
                      />
                    ) : (
                      <div>
                        <PlusOutlined/>
                        <div style={{marginTop: 8}}>Add Image</div>
                      </div>
                    )}
                  </Upload>

                  {previewUrls.image && (
                    <Button
                      className="mt-2"
                      danger
                      block
                      onClick={() => handleDeleteImage('image')}
                    >
                      Delete Image
                    </Button>
                  )}
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  name="right_image"
                  label="Right Image"
                  rules={[{required: true, message: "Please upload an image"}]}
                >
                  <Upload
                    accept="image/*"
                    listType="picture-card"
                    showUploadList={false}
                    beforeUpload={(file) => handleBeforeUpload(file, 'right_image')}
                    className="!w-full h-[300px]"
                  >
                    {previewUrls.right_image ? (
                      <img
                        src={previewUrls.right_image}
                        alt="Preview"
                        style={{width: "100%", height: "100%", objectFit: "cover", borderRadius: 8}}
                      />
                    ) : (
                      <div>
                        <PlusOutlined/>
                        <div style={{marginTop: 8}}>Add Image</div>
                      </div>
                    )}
                  </Upload>

                  {previewUrls.right_image && (
                    <Button
                      className="mt-2"
                      danger
                      block
                      onClick={() => handleDeleteImage('right_image')}
                    >
                      Delete Image
                    </Button>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
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
            <Step title="Asosiy ma'lumotlar" icon={<UserIcon/>}/>
            <Step title="Ma'lumoti" icon={<FileIcon/>}/>
            <Step title="Rasmlar" icon={<ImageIcon/>}/>
          </Steps>

          <div style={{marginTop: 24}} className={'col-span-3 '}>{renderStepContent()}</div>
        </div>

        <div style={{marginTop: 24, textAlign: "right"}}>
          {currentStep > 0 && (
            <Button
              onClick={handlePrev}
              style={{marginRight: 8}}
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
