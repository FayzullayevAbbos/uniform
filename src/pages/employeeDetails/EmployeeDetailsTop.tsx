
import { Button, Avatar, Tag, Space } from 'antd';
import {  DeleteOutlined, EditOutlined } from '@ant-design/icons';
import BackTo from "../../components/shared/BackTo.tsx";

const EmployeeDetailsTop = () => {
  return (
    <div className="">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex  items-center gap-4">
          <BackTo/>
        </div>

        {/* Right side */}
        <div className="flex gap-2">
          <Button icon={<DeleteOutlined />} danger>
            O‘chirish
          </Button>
          <Button icon={<EditOutlined />} type="default">
            O‘chirish
          </Button>
        </div>
      </div>
      <div className={'flex items-center gap-4 mt-4 py-2 bg-white rounded-2xl px-4 '}>

      <Avatar
        className="bg-blue-500"
        size={72}
        src="https://img.freepik.com/free-photo/confident-young-male-doctor-with-stethoscope-hospital_1150-23460.jpg" // Shu rasmni o'xshash qilib oldim
      />
      <div>
        <div className="font-semibold text-lg">Eshonov Fakhriyor</div>
        <Space wrap>
          <Tag>Terapevt</Tag>
          <Tag>Shifokorlar bo‘limi</Tag>
          <Tag>75-xona</Tag>
        </Space>
      </div>
      </div>
    </div>
  );
};

export default EmployeeDetailsTop;
