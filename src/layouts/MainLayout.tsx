import React from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import { RootState } from '../store/store';


interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({children , title = 'Navbar'}) => {
  const { collapsed } = useSelector((state :RootState) => state.profile);
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className={`flex-1 transition-all duration-300 ${collapsed ? 'ml-20' : 'ml-64'}`}>
        <Header title={title} />
        <div className="px-4 mb-3" style={{ minHeight: 'calc(100% - 13%)' }}>
          <main className=" h-full">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;