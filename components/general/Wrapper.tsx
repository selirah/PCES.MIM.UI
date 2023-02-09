import React from 'react';
import Footer from './Footer';
import Header from './Header';

interface Props {
  children: any;
  setShow: any;
  show: boolean;
}

const Wrapper: React.FC<Props> = ({ children, setShow, show }: Props) => {
  return (
    <div className={`flex-1 h absolute ${show ? 'w-full' : 'left-1/5 w-4/5' } bottom-0 min-h-full max-h-full z-10`}>
      <Header setShow={setShow} show={show} />
      <div className='absolute h-99% overflow-y-auto w-full'>{children}</div>
    </div>
  );
};

export default Wrapper;
