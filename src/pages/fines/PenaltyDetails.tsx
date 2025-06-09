import {Badge, Button} from 'antd';
import {FileOutlined} from '@ant-design/icons';
import {useState} from "react";
import {FileText} from "lucide-react";
import BackTo from "../../components/shared/BackTo.tsx";

class FineDetail {
  id: string;
  date: string;
  type: string;
  status: string;
  description: string;
  amount: string;
  person: {
    firstName: string;
    lastName: string;
    department: string;
    position: string;
  };
  file: {
    name: string;
    date: string;
    size: string;
  };

  constructor(
    id: string,
    date: string,
    type: string,
    status: string,
    description: string,
    amount: string,
    person: { firstName: string; lastName: string; department: string; position: string },
    file: { name: string; date: string; size: string }
  ) {
    this.id = id;
    this.date = date;
    this.type = type;
    this.status = status;
    this.description = description;
    this.amount = amount;
    this.person = person;
    this.file = file;
  }
}

const PenaltyDetails = () => {
  const [fineDetail] = useState<FineDetail>({
    id: "#5641212",
    date: "25.08.2024, 2:29",
    type: "Bosh kiymisiz keldi",
    status: "To'landi",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    amount: "300 000 UZS",
    person: {
      firstName: "Fakhriyov",
      lastName: "Edhonov",
      department: "Shifokorlar",
      position: "Pediatr",
    },
    file: {
      name: "Jarima 20.01.2024",
      date: "20.01.2024",
      size: "258 kb",
    },
  })

  return (
    <div className="p-6 bg-[#F7F9FB] min-h-screen space-y-4 rounded-2xl">
      {/* Back + Export */}
      <div className="flex justify-between items-center">
        <BackTo/>
        <Button icon={<FileOutlined/>} className="">
          Eksport qilish
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {/* General Information */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6">Umumiy ma'lumot</h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 border-b pb-3">
                <div className="text-gray-500">Jarima ID</div>
                <div className="font-medium">{fineDetail.id}</div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-b pb-3">
                <div className="text-gray-500">Jarima vaqti</div>
                <div className="font-medium">{fineDetail.date}</div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-b pb-3">
                <div className="text-gray-500">Jarima turi</div>
                <div className="font-medium">{fineDetail.type}</div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-b pb-3">
                <div className="text-gray-500">Holati</div>
                <div>
                  <Badge className="bg-green-100 text-green-600 px-4 py-2 rounded-2xl hover:bg-green-100 border-0">
                    {fineDetail.status}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-b pb-3">
                <div className="text-gray-500">Qo'shimcha izoh</div>
                <div className="font-medium">{fineDetail.description}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-gray-500">Jarima summasi</div>
                <div className="font-medium text-blue-500">{fineDetail.amount}</div>
              </div>
            </div>
          </div>

          {/* About the Fined Person */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6">Jarimachi haqida</h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 border-b pb-3">
                <div className="text-gray-500">Ism</div>
                <div className="font-medium">{fineDetail.person.firstName}</div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-b pb-3">
                <div className="text-gray-500">Familiya</div>
                <div className="font-medium">{fineDetail.person.lastName}</div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-b pb-3">
                <div className="text-gray-500">Bo'lim</div>
                <div className="font-medium">{fineDetail.person.department}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-gray-500">Lavozim</div>
                <div className="font-medium">{fineDetail.person.position}</div>
              </div>
            </div>
          </div>

          {/* Fine File */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6">Jarima fayli</h2>

            <div className="flex items-center justify-between border rounded-lg p-3">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-500"/>
                </div>
                <div>
                  <div className="font-medium">{fineDetail.file.name}</div>
                  <div className="text-sm text-gray-500">{fineDetail.file.size}</div>
                </div>
              </div>

              <Button type={'default'} size={'middle'} className="text-blue-500">
                Yuklab olish
              </Button>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-3 h-auto">
            <div className="relative w-full h-[400px]  min-h-[300px]">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5Nwpw2x1EeYuq4YveFwaSFdlw3PIA2.png"
                alt="Medical personnel in operating room"
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PenaltyDetails;
