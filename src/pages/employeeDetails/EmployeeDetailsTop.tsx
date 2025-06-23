
import { Button, Avatar, Tag, Space } from 'antd';
import {  DeleteOutlined, EditOutlined } from '@ant-design/icons';
import BackTo from "../../components/shared/BackTo.tsx";

const EmployeeDetailsTop = ({handleDelete  , setOpen , data}) => {
  return (
    <div className="">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex  items-center gap-4">
          <BackTo/>
        </div>

        {/* Right side */}
        <div className="flex gap-2">
          <Button onClick={handleDelete} icon={<DeleteOutlined />} danger>
            O‘chirish
          </Button>
          <Button onClick={()=>setOpen(true)} icon={<EditOutlined />} type="default">
            Tahrirlash
          </Button>
        </div>
      </div>
      <div className={'flex items-center gap-4 mt-4 py-2 bg-white rounded-2xl px-4 '}>

      <Avatar
        className="bg-blue-500"
        size={72}
        src={data?.image || 'https://www.w3schools.com/howto/img_avatar.png'}
      />
      <div>
        <div className="font-semibold text-lg">{data?.last_name} {data?.first_name}</div>
        <Space wrap>
          <Tag>{data?.position?.name}</Tag>
          <Tag>{data?.department?.name}</Tag>
          <Tag>{data?.room?.room_number}-xona</Tag>
        </Space>
      </div>
      </div>
    </div>
  );
};

export default EmployeeDetailsTop;
