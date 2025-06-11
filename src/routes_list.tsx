import HomePage from "./pages/home/home.tsx";
import FinesPage from "./pages/fines/fines.tsx";
import PenaltyDetails from "./pages/fines/PenaltyDetails.tsx";
import VehicleCheck from "./pages/vehicle-check/VehicleCheck.tsx";
import Employee from "./pages/employee/Employee.tsx";
import EmployeeDetails from "./pages/employeeDetails";
import Departments from "./pages/departments/Departments.tsx";
import Rooms from "./pages/rooms/Rooms.tsx";
import Positions from "./pages/positions/Positions.tsx";
import Uniforms from "./pages/uniforms";
import Login from "./pages/auth/Login..tsx";
import Monitoring from "./pages/employee-monitoring/Monitoring.tsx";


const routes_list = [
  {
    path: '/',
    element: <HomePage/>,
    children: false,
  },
  {
    path: '/fines',
    element: <FinesPage/>,
    children: false,
  },
  {
    path: '/fines/:penaltyId',
    element: <PenaltyDetails/>,
    children: false,
  },
  {
    path: '/vehicle-check',
    element: <VehicleCheck/>,
    children: false,
  },
  {
    path: '/employees',
    element: <Employee/>,
    children: false,
  },
  {
    path: '/employees/:id',
    element: <EmployeeDetails/>,
    children: false,
  },
  {
    path: '/departments',
    element: <Departments/>,
    children: false,
  },
  {
    path: '/rooms',
    element: <Rooms/>,
    children: false,
  },
  {
    path: '/positions',
    element: <Positions/>,
    children: false,
  },
  {
    path: '/uniforms',
    element: <Uniforms/>,
    children: false,
  },
  {
    path: '/employee-monitoring',
    element: <Monitoring/>,
    children: false,
  },
  {
    path: '/documents-and-guides',
    element: <div>Documents and Guides</div>,
    children: false,
  },
];


export default routes_list;