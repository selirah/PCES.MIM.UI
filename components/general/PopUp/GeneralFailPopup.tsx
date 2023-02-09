import React from 'react';
import Image from 'next/image';

interface Props {
  setShow: any;
  errorMessage: string;
}

const GeneralFailPopup: React.FC<Props> = (props: Props) => {
  const { errorMessage, setShow } = props;
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-opacity-50 bg-black flex justify-center items-center"
      onClick={(event: any) => {
        if (event.target.getAttribute('class')?.includes('bg-opacity-50')) {
          setShow(false);
        }
      }}
    >
      <div className="relative rounded-md w-1/4 h-96 max-w-screen-sm bg-blend-overlay bg-white">
        <div className="">
          <div className="bg-red-500 text-center px-16 py-8 rounded-t-md">
            <Image
              src="/x-icon.png"
              alt="success image"
              width="120"
              height="120"
            />
            <div className=" font-semibold text-3xl text-white">Failed!</div>
          </div>
          <div className="text-center mt-5 font-semibold text-xl">
            {errorMessage}
          </div>
          <div className="text-center mt-10">
            <button
              onClick={() => {
                setShow(false);
              }}
              className="rounded-md p-2 px-6 bg-red-600 font-semibold text-white"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralFailPopup;
