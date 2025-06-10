import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import type {MenuProps} from 'antd';
import {Avatar, Badge, Button, Dropdown} from 'antd';
import {BellIcon, Edit, Lock, LogOut, Menu, User} from 'lucide-react';
import {setCollapsed} from '../../store/profile';
import {RootState} from "../../store/store.ts";
import ProfileInfo from "../settings/ProfileInfo.tsx";
import EditProfile from "../settings/EditProfile.tsx";
import {useNavigate} from "react-router-dom";


interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({title}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profileIsOpen, setProfileIsOpen] = React.useState(false);
  const [editProfileIsOpen, setEditProfileIsOpen] = React.useState(false);
  const collapsed = useSelector((state: RootState) => state.profile.collapsed);

  const items: MenuProps['items'] = [
    {
      key: 'profile',
      label: (
        <div onClick={() => {
          setProfileIsOpen(true);
          }}
          className="flex items-center">
          <User size={16} className="mr-2"/>
          Profile
        </div>
      ),
    },
    {
      key: 'settings',
      label: (
        <div onClick={()=> setEditProfileIsOpen(true)} className="flex items-center">
          <Edit size={16} className="mr-2"/>
          Tahrirlash
        </div>
      ),
    },
    {
      key: 'change-password',
      label: (
        <div className="flex items-center">
          <Lock size={16} className="mr-2"/>
          Parol o'zgartirish
        </div>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: (
        <div onClick={() => {
          localStorage.clear()
          window.location.reload()
        }} className="flex items-center ">
          <LogOut size={16} className="mr-2"/>
          Logout
        </div>
      ),
      danger: true,
    },
  ];

  return (
    <>
      <ProfileInfo open={profileIsOpen} onClose={() => setProfileIsOpen(false)} refetch={() => {}}/>
      <EditProfile userData={{
        fullName: 'Fayzullayev Abbos',
        phone: '+998 90 123 45 67',
        email: 'abbos@mail.com',
        avatar: 'https://i.pravatar.cc/150?img=12',
      }} open={editProfileIsOpen} onClose={()=> setEditProfileIsOpen(false)} refetch={() => {}}/>
      <header className="bg-white border-b border-gray-200 px-6 py-4 mb-6 sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button
              type="text"
              icon={<Menu size={20}/>}
              onClick={() => dispatch(setCollapsed({collapsed: !collapsed}))}
              className="flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded-full"
            />
            <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Badge count={3} overflowCount={99}>
                <Button
                  type="text"
                  icon={<BellIcon size={20} className="text-gray-600"/>}
                  className="flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded-full"
                />
              </Badge>
            </div>
            <div className="h-6 w-px bg-gray-200"/>
            <Dropdown menu={{items}} trigger={['click']} placement="bottomRight">
              <div className="flex items-center space-x-3 cursor-pointer">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-medium text-gray-700">John Doe</div>
                  <div className="text-xs text-gray-500">Administrator</div>
                </div>
                <Avatar
                  src="https://i.pravatar.cc/150?img=12"
                  size={40}
                  className="ring-2 ring-white"
                />
              </div>
            </Dropdown>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
