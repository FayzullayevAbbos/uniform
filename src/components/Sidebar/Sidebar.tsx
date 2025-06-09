import React from 'react';
import {useSelector} from 'react-redux';
import Logo from './Logo';
import MenuItem from './MenuItem';
import MenuSection from './MenuSection';
import {
  AlertTriangleIcon,
  BriefcaseIcon,
  BuildingIcon,
  CarIcon,
  DoorOpenIcon,
  FileTextIcon,
  HomeIcon,
  ShirtIcon,
  UserCheckIcon,
  UsersIcon,
} from 'lucide-react';
import {RootState} from '../../store/store';
import useQuery from "../../hooks/useQuery.tsx";

const mainMenu = [
  {
    id: "asosiy",
    title: "Asosiy",
    icon: <HomeIcon size={18}/>,
    path: "/"
  },
  {
    id: "jarimalar",
    title: "Jarimalar",
    icon: <AlertTriangleIcon size={18}/>,
    badge: 8,
    path: "/fines",
  },
  {
    id: "texnik-korik",
    title: "Texnik ko'rik",
    icon: <CarIcon size={18}/>,
    path: "/vehicle-check",
  },
  {
    id: "xodimlar",
    title: "Xodimlar",
    icon: <UsersIcon size={18}/>,
    path: "/employees",
  },
];

const structureMenu = [
  {
    id: "bolimlar",
    title: "Bo'limlar",
    icon: <BuildingIcon size={18}/>,
    path: "/departments",
  },
  {
    id: "xonalar",
    title: "Xonalar",
    icon: <DoorOpenIcon size={18}/>,
    path: "/rooms",
  },
  {
    id: "lavozim",
    title: "Lavozim",
    icon: <BriefcaseIcon size={18}/>,
    path: "/positions",
  },
  {
    id: "uniformalar",
    title: "Uniformalar",
    icon: <ShirtIcon size={18}/>,
    path: "/uniforms",
  },
];

const controlMenu = [
  {
    id: "xodimlar-nazorati",
    title: "Xodimlar nazorati",
    icon: <UserCheckIcon size={18}/>,
    path: "/employee-monitoring",
  },
  {
    id: "yoriqnoma-va-hujjatlar",
    title: "Yoriqnoma va hujjatlar",
    icon: <FileTextIcon size={18}/>,
    path: "/documents-and-guides",
  },
];


const Sidebar: React.FC = () => {
  const {collapsed, activeMenu} = useSelector((state: RootState) => state.profile);
  const {location} = useQuery()
  const {pathname} = location;
  return (
    <div
      className={`fixed left-0 top-0 h-full bg-[#044a53] overflow-y-auto shadow-lg z-20 transition-all duration-300 ease-in-out ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <Logo collapsed={collapsed}/>

      <div className="mt-2">
        <MenuSection>
          {mainMenu.map((item) => (
            <MenuItem

              key={item.id}
              id={item.id}
              icon={item.icon}
              title={item.title}
              badge={item.badge}
              active={
                item.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.path)
              }
              collapsed={collapsed}
              path={item.path}
            />
          ))}
        </MenuSection>

        <MenuSection title={collapsed ? undefined : 'Tarkibiy tuzilma'}>
          {structureMenu.map((item) => (
            <MenuItem
              key={item.id}
              id={item.id}
              icon={item.icon}
              title={item.title}
              active={
                item.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.path)
              }
              collapsed={collapsed}
              path={item.path}
            />
          ))}
        </MenuSection>

        <MenuSection>
          {controlMenu.map((item) => (
            <MenuItem
              key={item.id}
              id={item.id}
              icon={item.icon}
              title={item.title}
              active={
                item.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.path)
              }
              collapsed={collapsed}
              path={item.path}
            />
          ))}
        </MenuSection>
      </div>
    </div>
  );
};

export default Sidebar;
