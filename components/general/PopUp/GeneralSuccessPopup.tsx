import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  successMessage;
  buttonMessage;
  buttonLink;
  setShow?:(data:boolean)=>void
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const GeneralSuccessPopup: React.FC<Props> = (props: Props) => {
  const { successMessage, buttonMessage, buttonLink, onClick,setShow } = props;
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 bg-black flex justify-center items-center" onClick={(event: any) => {
        setShow ? setShow(false) : null;
    }}>
      <div className="relative rounded-md w-1/4 h-96 max-w-screen-sm bg-blend-overlay bg-white">
        <div className="">
          <div className="bg-green-500 text-center px-16 py-8 rounded-t-md">
            <Image
              src="/check.png"
              alt="success image"
              width="120"
              height="120"
            />
            <div className=" font-semibold text-3xl text-white">Success!</div>
          </div>
          <div className="text-center mt-5 font-semibold text-xl">
            {successMessage}
          </div>
          <div className="text-center mt-10">
            <Link href={buttonLink}>
              <button
                onClick={onClick}
                className="rounded-md p-2 bg-green-600 font-semibold text-white"
              >
                {buttonMessage}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralSuccessPopup;
