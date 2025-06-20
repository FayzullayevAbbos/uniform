import React from 'react';
import { Card, Table, Badge, Avatar, Tooltip, Pagination } from 'antd';
import { Users, AlertTriangle, Shirt, Clock, AlertTriangleIcon } from 'lucide-react';
import { useApiRequestQuery } from "../../service/Api.tsx";
import { ToolFilled } from "@ant-design/icons";
import dayjs from 'dayjs';

const HomePage: React.FC = () => {
  // State for pagination
  const [attendancePage, setAttendancePage] = React.useState(1);
  const [penaltiesPage, setPenaltiesPage] = React.useState(1);
  const [inspectionPage, setInspectionPage] = React.useState(1);

  const pageSize = 5;

  // API calls with pagination parameters
  const { data: statusData } = useApiRequestQuery({
    url: "/main",
    method: "GET",
  });

  const { data: technicalInspection } = useApiRequestQuery({
    url: `/main/technical-inspections`,
    params: { page: inspectionPage, page_size: pageSize },
    method: "GET",
  });

  const { data: attendanceData } = useApiRequestQuery({
    url: `/main/report`,
    params: { page: attendancePage, page_size: pageSize },
    method: "GET",
  });

  const stats = [
    {
      title: 'Umumiy hodimlar soni',
      value: statusData?.employees_count,
      icon: <Users className="h-6 w-6 text-blue-600" />,
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Texnik ko\'rikdan o\'tmagan xodimlar',
      value: statusData?.technical_inspection_count,
      icon: <AlertTriangle className="h-6 w-6 text-red-600" />,
      bgColor: 'bg-red-50'
    },
    {
      title: 'Umumiy uniformalar',
      value: statusData?.uniform_count,
      icon: <Shirt className="h-6 w-6 text-red-600" />,
      bgColor: 'bg-yellow-50'
    },
    {
      title: "Jarimalar soni",
      value: statusData?.penalty,
      icon: <AlertTriangleIcon className="h-6 w-6 text-green-600" />,
      bgColor: 'bg-green-50'
    }
  ];

  const penaltyStats = [
    { id: 1, type: 'Bosh kiyimsiz kelish', count: 503 },
    { id: 2, type: 'Bosh kiyimsiz kelish', count: 421 },
    { id: 3, type: 'Bosh kiyimsiz kelish', count: 300 },
    { id: 4, type: 'Bosh kiyimsiz kelish', count: 240 },
    { id: 5, type: 'Bosh kiyimsiz kelish', count: 160 },
    { id: 6, type: 'Bosh kiyimsiz kelish', count: 140 },
    { id: 7, type: 'Bosh kiyimsiz kelish', count: 140 }
  ];

  const recentPenalties = [
    { id: 1, name: 'Albert Flores', type: 'Bosh kiyimsiz kelish', date: '23.01.2025', amount: '100 000 uzs', avatar: 'https://i.pravatar.cc/150?img=6' },
    { id: 2, name: 'Devon Cooper', type: 'Bosh kiyimsiz kelish', date: '23.01.2025', amount: '100 000 uzs', avatar: 'https://i.pravatar.cc/150?img=7' },
    { id: 3, name: 'Jerome Bell', type: 'Bosh kiyimsiz kelish', date: '23.01.2025', amount: '100 000 uzs', avatar: 'https://i.pravatar.cc/150?img=8' },
    { id: 4, name: 'Jane Cooper', type: 'Bosh kiyimsiz kelish', date: '23.01.2025', amount: '100 000 uzs', avatar: 'https://i.pravatar.cc/150?img=9' },
    { id: 5, name: 'Dianne Russell', type: 'Bosh kiyimsiz kelish', date: '23.01.2025', amount: '100 000 uzs', avatar: 'https://i.pravatar.cc/150?img=10' }
  ];

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border border-gray-200">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg`}>
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
        <Card
          title="Hodimlar nazorati"
          className="border border-gray-200"
          extra={
            <Pagination
              current={attendancePage}
              total={attendanceData?.total || 0}
              pageSize={pageSize}
              onChange={(page) => setAttendancePage(page)}
              showSizeChanger={false}
              simple
            />
          }
        >

            <Table
                dataSource={attendanceData?.data || []}
                pagination={false}
                columns={[
                {
                    title: 'Ism va familiya',
                    dataIndex: 'name',
                    key: 'name',
                    render: (text, record: any) => (
                    <div className="flex items-center space-x-3">
                        <Avatar src={record?.employee?.image} />
                        <span>{record?.employee?.first_name} {record?.employee?.last_name}</span>
                    </div>
                    ),
                },
                {
                    title: 'Bo\'lim',
                    dataIndex: 'department',
                    key: 'department',
                    render: (text, record: any) => <span>{record?.employee?.department?.name}</span>,
                },
                {
                    title: 'Holati',
                    dataIndex: 'status',
                    key: 'status',
                    render: (text) => (
                    <Badge
                        status={text === 'on_time' ? 'success' : text === 'late' ? 'warning' : 'error'}
                        text={text === 'on_time' ? 'Vaqtida' : text === 'late' ? 'Kecha qolgan' : 'Kelmagan'}
                    />
                    ),
                },
                {
                    title: 'Sana',
                    dataIndex: 'dt',
                    key: 'date',
                    render: (text) => (
                    <div>{dayjs(text).format("YYYY-MM-DD , HH:mm")}</div>
                    ),
                },
                ]}
            />
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
        <Card
          title="Yangi jarima qo'llanilgan hodimlar"
          className="border border-gray-200"
          extra={
            <Pagination
              current={penaltiesPage}
              total={recentPenalties.length}
              pageSize={pageSize}
              onChange={(page) => setPenaltiesPage(page)}
              showSizeChanger={false}
              simple
            />
          }
        >
          <Table
            dataSource={recentPenalties.slice((penaltiesPage - 1) * pageSize, penaltiesPage * pageSize)}
            pagination={false}
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
        <Card
          title="Texnik ko'rik muddati o'tib ketgan xodimlar"
          className="border border-gray-200"
          extra={
            <Pagination
              current={inspectionPage}
              total={technicalInspection?.total || 0}
              pageSize={pageSize}
              onChange={(page) => setInspectionPage(page)}
              showSizeChanger={false}
              simple
            />
          }
        >
          <Table
            dataSource={technicalInspection?.data || []}
            pagination={false}
            columns={[
              {
                title: 'Ism va familiya',
                dataIndex: 'name',
                key: 'name',
                render: (text, record: any) => (
                  <div className="flex items-center space-x-3">
                    <Avatar src={record?.employee?.image} />
                    <span>{record?.employee?.first_name} {record?.employee?.last_name}</span>
                  </div>
                ),
              },
              {
                title: "Bo'lim",
                dataIndex: 'department',
                key: 'department',
                render: (text, record: any) => <span>{record?.employee?.department?.name}</span>,
              },
              {
                title: 'Muddati',
                dataIndex: 'status',
                key: 'deadline',
                render: (text, record: any) => (
                  <div>{dayjs(record?.end_date).format("YYYY-MM-DD , HH:mm")}</div>
                ),
              },
            ]}
          />
        </Card>
      </div>
    </div>
  );
};

export default HomePage;