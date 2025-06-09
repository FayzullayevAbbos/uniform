import React from 'react';
import {useDispatch} from 'react-redux';
import {setActiveMenu} from "../../store/profile.tsx";
import useQuery from "../../hooks/useQuery.tsx";


interface MenuItemProps {
  icon: React.ReactNode,
  title: string,
  active: boolean,
  id: string,
  badge?: number,
  collapsed?: boolean,
  style?: { marginBottom: string }
  className?: string
  path?: string
}


const MenuItem: React.FC<MenuItemProps> = ({icon, title, active, id, badge, collapsed = false,  path ='/'}) => {
  const dispatch = useDispatch();
  const {navigate} = useQuery()
  const handleClick = () => {
    dispatch(setActiveMenu({activeMenu: id}));
    navigate(path)
    console.log(`Clicked on ${id}`);
  };

  return (
    <div
      className={`flex items-center  mx-1 py-[7px] rounded-[50px] cursor-pointer transition-colors duration-200 ${
        active ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5'
      }`}
      onClick={handleClick}>
      <div className={`flex items-center justify-center w-8 ${collapsed ? 'mx-[20px]' : 'mx-2'} h-8 rounded-full ${active ? 'bg-white' +
        ' text-black ' : 'border-[0.5px] !border-white text-white'} `}>
        {icon}
      </div>
      {!collapsed && (
        <div className={'flex items-center  gap-4 '}>
          <span className="flex-grow text-white">{title}</span>
          {badge !== undefined && badge > 0 && (
            <div
              className="flex items-center justify-center  h-6 min-w-6 px-1 bg-blue-500 text-xs font-medium text-white rounded-full">
              {badge}
            </div>
          )}
        </div>
      )}
      {/*{collapsed && badge !== undefined && badge > 0 && (*/}
      {/*  <div*/}
      {/*    className="absolute right-2 top-1 flex items-center justify-center  h-5 min-w-5 px-1 bg-blue-500 text-xs font-medium text-white rounded-full">*/}
      {/*    {badge}*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  );
};

export default MenuItem;