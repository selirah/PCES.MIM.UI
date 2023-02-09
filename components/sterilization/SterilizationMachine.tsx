import React from "react";

const SterilizationMachine: React.FC =( ) =>{
    const machineCode = ''
return(
<div>
<div className="m-2 w-1/3 flex flex-row space-x-3 text-left  mt-2 shadow-md rounded-md px-4 py-2 border-blue-800 border-t-4">
        <div className="flex mb-4 font-semibold text-lg  rounded-xl ">
                <label className=" text-black-600 font-bold ">
                  {machineCode}
                </label>
          </div>{' '}
        </div>
</div>
);

};
export default SterilizationMachine;