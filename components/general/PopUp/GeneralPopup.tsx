import React from 'react';
import Image from 'next/image';

interface Props {
    setShow: any;
    children
}

const GeneralFailPopup: React.FC<Props> = (props: Props) => {
    const { setShow, children } = props;
    return (
        <div
            className="fixed top-0 left-0 w-full h-full bg-opacity-50 bg-black flex justify-center items-center"
            onClick={(event: any) => {
                if (event.target.getAttribute('class')?.includes('bg-opacity-50')) {
                    setShow(false);
                }
            }}
        >
            <div className="relative rounded-md p-8 max-w-screen-sm bg-blend-overlay bg-white">
                {children}
            </div>
        </div>
    );
};

export default GeneralFailPopup;
