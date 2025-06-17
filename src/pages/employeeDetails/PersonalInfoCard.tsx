import React from 'react';
import {Card, Descriptions, Tag, Typography} from 'antd';
import dayjs from "dayjs";

const {Title, Text} = Typography;


const PersonalInfoCard: React.FC = ({loading, data}: any) => {
  console.log(data)
  return (
    <div className=" mx-auto  rounded-lg justify-between flex w-full items-start ">
      <Card
        loading={loading}
        title={<Title level={4} style={{margin: 0}}>Asosiy Ma'lumotlar</Title>}
        bordered={false}
        className="    w-[72%] "
        style={{borderRadius: '8px'}}
      >
        <Descriptions column={1} bordered size="middle">
          <Descriptions.Item label={<Text strong>Familiya</Text>}>
            <Text>{data?.last_name}</Text>
          </Descriptions.Item>
          <Descriptions.Item label={<Text strong>Ism</Text>}>
            <Text>{data?.first_name}</Text>
          </Descriptions.Item>
          <Descriptions.Item label={<Text strong>Otasining ismi</Text>}>
            <Text>{data?.middle_name}</Text>
          </Descriptions.Item>
          <Descriptions.Item label={<Text strong>Jinsi</Text>}>
            <Text>{data?.gender === 'male' ? "Erkak" : "Ayol"}</Text>
          </Descriptions.Item>
          <Descriptions.Item label={<Text strong>Tug'ilgan sana</Text>}>
            <Text>{data?.birth_date}</Text>
          </Descriptions.Item>
          <Descriptions.Item label={<Text strong>Telefon raqami</Text>}>
            <Text>+998 {data?.phone}</Text>
          </Descriptions.Item>
          <Descriptions.Item label={<Text strong>Viloyat</Text>}>
            <Text>{data?.region?.oz}</Text>
          </Descriptions.Item>
          <Descriptions.Item label={<Text strong>Shahar</Text>}>
            <Text>{data?.district?.oz}</Text>
          </Descriptions.Item>
        </Descriptions>


      </Card>
      <div className={' w-[25%] border p-4 rounded-lg ml-4'}>
        <Title level={4} className="text-lg font-semibold mb-2">
          Ma’lumotlari
        </Title>
        <hr className={'mb-4'}/>
        {
          data?.informations?.map((info, index) => {
            return (
              <Card loading={loading} className="rounded-xl  mt-2">
                <div className="mb-1">
                  <Title level={5} className="!mb-0">{info?.name}</Title>
                  <Text type="secondary" className="block mb-2"> Daraja: {info?.type === 'higher' ? "Oliy " : info?.type === 'secondary' ? "O'rta" : "Maxsus"}</Text>
                  <Tag color="cyan" className="px-3 py-1  rounded-full text-base">
                    {dayjs(info?.start_date).format("D-MMMM YYYY")}  - {dayjs(info?.end_date).format("D-MMMM YYYY")}
                  </Tag>
                </div>
              </Card>
            )
          })
        }
      </div>
    </div>
  );
};

export default PersonalInfoCard;
