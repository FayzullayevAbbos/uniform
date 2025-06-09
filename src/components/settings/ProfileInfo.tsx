import { Drawer ,Image } from "antd";
import React from "react";

interface AddSectionDrawerProps {
  open: boolean;
  onClose: () => void;
}

const ProfileInfo: React.FC<AddSectionDrawerProps> = ({ open, onClose }) => {
  const user = {
    image: 'https://i.pravatar.cc/150?img=12',
    fullName: 'Fayzullayev Abbos',
    phone: '+998 90 123 45 67',
    email: 'abbosfayzullayev202@gmail.com',
    gender: 'Erkak',
    brithday: '1990-01-01',
  };


  // @ts-ignore
  return (
    <Drawer
      title={<span className="font-semibold text-lg">Shaxsiy ma'lumotlar</span>}
      placement="right"
      closable
      onClose={onClose}
      open={open}
      width={400}
    >
      <div className="p-4 flex flex-col items-center">
        <Image
          src={user.image}
          alt="User Avatar"
          className="w-40 h-40 rounded-full shadow-md mb-4 object-cover !hover:rounded-full hover:w-40 hover:h-40 transition-all duration-300"
        />
        <div className="w-full space-y-3">
          <div className={'border-b'}>
            <p className="text-sm text-gray-500">F.I.Sh</p>
            <p className="text-lg font-medium text-gray-800">{user.fullName}</p>
          </div>
          <div className={'border-b'}>
            <p className="text-sm text-gray-500">Telefon raqami</p>
            <p className="text-base text-gray-700">{user.phone}</p>
          </div>
          <div className={'border-b'}>
            <p className="text-sm text-gray-500">Email manzili</p>
            <p className="text-base text-gray-700">{user.email}</p>
          </div>
          <div className={'border-b'}>
            <p className="text-sm text-gray-500">Jins</p>
            <p className="text-base text-gray-700">{user.gender}</p>
          </div>
          <div className={'border-b'}>
            <p className="text-sm text-gray-500">Tug'ilgan sana</p>
            <p className="text-base text-gray-700">{user.brithday}</p>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default ProfileInfo;
