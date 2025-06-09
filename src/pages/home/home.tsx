import React from 'react';
import { Card, Table, Badge, Avatar } from 'antd';
import { Users, AlertTriangle, Shirt, Clock } from 'lucide-react';

const HomePage: React.FC = () => {
  // Mock data for statistics
  const stats = [
    {
      title: 'Umumiy hodimlar soni',
      value: '3058',
      icon: <Users className="h-6 w-6 text-blue-600" />,
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Umumiy hodimlar soni',
      value: '3058',
      icon: <AlertTriangle className="h-6 w-6 text-red-600" />,
      bgColor: 'bg-red-50'
    },
    {
      title: 'Kiyinish qilinganligi',
      value: '32',
      icon: <Shirt className="h-6 w-6 text-yellow-600" />,
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Umumiy uniformalar',
      value: '2',
      icon: <Clock className="h-6 w-6 text-green-600" />,
      bgColor: 'bg-green-50'
    }
  ];

  // Mock data for attendance table
  const attendanceData = [
    { id: 1, name: 'Jenny Wilson', department: 'Shifokorlar', time: '05:17', status: 'Qo\'ng\'iroq qilindi', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'Darrell Steward', department: 'Shifokorlar', time: '12:34', status: 'Qatnashdi', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: 'Wade Warren', department: 'Shifokorlar', time: '02:03', status: 'Qatnashdi', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: 4, name: 'Eleanor Pena', department: 'Shifokorlar', time: '12:04', status: 'Qatnashdi', avatar: 'https://i.pravatar.cc/150?img=4' },
    { id: 5, name: 'Kristin Watson', department: 'Shifokorlar', time: '00:56', status: 'Qatnashdi', avatar: 'https://i.pravatar.cc/150?img=5' }
  ];

  // Mock data for penalties statistics
  const penaltyStats = [
    { id: 1, type: 'Bosh kiyimsiz kelish', count: 503 },
    { id: 2, type: 'Bosh kiyimsiz kelish', count: 421 },
    { id: 3, type: 'Bosh kiyimsiz kelish', count: 300 },
    { id: 4, type: 'Bosh kiyimsiz kelish', count: 240 },
    { id: 5, type: 'Bosh kiyimsiz kelish', count: 160 },
    { id: 6, type: 'Bosh kiyimsiz kelish', count: 140 },
    { id: 7, type: 'Bosh kiyimsiz kelish', count: 140 }
  ];

  // Mock data for recent penalties
  const recentPenalties = [
    { id: 1, name: 'Albert Flores', type: 'Bosh kiyimsiz kelish', date: '23.01.2025', amount: '100 000 uzs', avatar: 'https://i.pravatar.cc/150?img=6' },
    { id: 2, name: 'Devon Cooper', type: 'Bosh kiyimsiz kelish', date: '23.01.2025', amount: '100 000 uzs', avatar: 'https://i.pravatar.cc/150?img=7' },
    { id: 3, name: 'Jerome Bell', type: 'Bosh kiyimsiz kelish', date: '23.01.2025', amount: '100 000 uzs', avatar: 'https://i.pravatar.cc/150?img=8' },
    { id: 4, name: 'Jane Cooper', type: 'Bosh kiyimsiz kelish', date: '23.01.2025', amount: '100 000 uzs', avatar: 'https://i.pravatar.cc/150?img=9' },
    { id: 5, name: 'Dianne Russell', type: 'Bosh kiyimsiz kelish', date: '23.01.2025', amount: '100 000 uzs', avatar: 'https://i.pravatar.cc/150?img=10' }
  ];

  // Mock data for technical inspection
  const technicalInspection = [
    { id: 1, name: 'Kathryn Murphy', department: 'Shifokorlar', deadline: '23.01.2024', avatar: 'https://i.pravatar.cc/150?img=11' },
    { id: 2, name: 'Guy Hawkins', department: 'Shifokorlar', deadline: '23.01.2024', avatar: 'https://i.pravatar.cc/150?img=12' },
    { id: 3, name: 'Jane Cooper', department: 'Shifokorlar', deadline: '23.01.2024', avatar: 'https://i.pravatar.cc/150?img=13' },
    { id: 4, name: 'Bessie Cooper', department: 'Shifokorlar', deadline: '23.01.2024', avatar: 'https://i.pravatar.cc/150?img=14' },
    { id: 5, name: 'Dianne Russell', department: 'Shifokorlar', deadline: '23.01.2024', avatar: 'https://i.pravatar.cc/150?img=15' }
  ];

  return (
      <div className="space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border border-gray-200">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg `}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Attendance Table */}
          <Card title="Hodimlar nazorati" className="border border-gray-200">
            <div className="space-y-4">
              {attendanceData.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar src={item.avatar} />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.department}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{item.time}</p>
                    <Badge
                      status={item.status === 'Qatnashdi' ? 'success' : 'error'}
                      text={item.status}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Penalties Statistics */}
          <Card title="Jarimalar bo'yicha statistika" className="border border-gray-200">
            <div className="space-y-4">
              {penaltyStats.map((stat, index) => (
                <div key={stat.id} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{index + 1}</span>
                    <span className="font-medium">{stat.type}</span>
                    <span className="font-medium">{stat.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(stat.count / 503) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Penalties */}
          <Card title="Yangi jarima qo'llanilgan hodimlar" className="border border-gray-200">
            <Table
              dataSource={recentPenalties}
              pagination={{ pageSize: 5 }}
              columns={[
                {
                  title: 'Ism va familiya',
                  dataIndex: 'name',
                  key: 'name',
                  render: (text, record: any) => (
                    <div className="flex items-center space-x-3">
                      <Avatar src={record.avatar} />
                      <span>{text}</span>
                    </div>
                  ),
                },
                {
                  title: 'Jarima sababi',
                  dataIndex: 'type',
                  key: 'type',
                },
                {
                  title: 'Sana',
                  dataIndex: 'date',
                  key: 'date',
                },
                {
                  title: 'Miqdori',
                  dataIndex: 'amount',
                  key: 'amount',
                },
              ]}
            />
          </Card>

          {/* Technical Inspection */}
          <Card title="Texnik ko'rik muddati o'tib ketgan xodimlar" className="border border-gray-200">
            <Table
              dataSource={technicalInspection}
              pagination={{ pageSize: 5 }}
              columns={[
                {
                  title: 'Ism va familiya',
                  dataIndex: 'name',
                  key: 'name',
                  render: (text, record: any) => (
                    <div className="flex items-center space-x-3">
                      <Avatar src={record.avatar} />
                      <span>{text}</span>
                    </div>
                  ),
                },
                {
                  title: "Bo'lim",
                  dataIndex: 'department',
                  key: 'department',
                },
                {
                  title: 'Muddati',
                  dataIndex: 'deadline',
                  key: 'deadline',
                  render: (text) => <span className="text-red-500">{text}</span>,
                },
              ]}
            />
          </Card>
        </div>
      </div>
  );
};

export default HomePage;