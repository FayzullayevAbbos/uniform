import React from "react";
import { Image } from "antd";

const EmpImages: React.FC = ({data}:{data:any}) => {
  return (
    <div className="flex items-center gap-4 h-full">
      <div className=" p-2 rounded-lg" >
        <Image
          className="bg-cover rounded-lg border"
          width={300}
          src={data.image}
          alt="Employee 1"
        />
        <hr className={'my-2'}/>
        <div className="text-base flex flex-2">Xodim to’g’ridan rasmi</div>
      </div>
      <div className=" p-2 rounded-lg ">
        <Image
          className="bg-cover rounded-lg border"
          width={300}
          src={data?.left_image}
          alt="Employee 1"
        />
        <hr className={'my-2'}/>
        <div className="text-base flex flex-2">Xodim chap tomon rasmi</div>
      </div>

      <div className=" p-2 rounded-lg">
        <Image
          className="bg-cover rounded-lg border"
          width={300}
          src={data.right_image}
          alt="Employee 1"
        />
        <hr className={'my-2'}/>
        <div className="text-base flex flex-2">Xodim o’ng tomon rasmi</div>
      </div>
    </div>
  );
};

export default EmpImages;