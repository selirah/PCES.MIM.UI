import axios from 'axios';
import BaseTable from 'components/general/BaseTable';
import GeneralFailPopup from 'components/general/PopUp/GeneralFailPopup';
import GeneralSuccessPopup from 'components/general/PopUp/GeneralSuccessPopup';
import { useSession } from 'next-auth/react';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { ENV } from '../../env';

interface Props {
  supplierId: string | string[] | undefined;
}

const ReviewRequest: React.FC<Props> = ({ supplierId }: Props) => {
  const { isLoading, isError, data } = useQuery(
    ['request', { supplierId }],
    fetchRequest
  );
  const [showError, setShowError] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [supplierDetails, setSupplierDetails] = useState<any>();

  const {data:session} = useSession()

  useEffect(() => {
    if (data != undefined) {
      setSupplierDetails(data.data)
    }
  }, [data]);

  const onClick = (e) => {
    e.preventDefault();
    setShowSuccess(false);
    router.push('/importorder');
  };

  const handleSubmit = async (processId:number) => {
    const toSubmit={
      processId,
      userId : session.user.userDTO.userId
    }
    try {
      await axios.put(
        `${ENV.NEXT_PUBLIC_API_ENDPOINT}/Process/importorder`,toSubmit
      );
      setShowSuccess(true);
    } catch (error) {
      setShowError(true);
    }
  };
  const downloadOrderForm = async () => {
    try {
      const result = await axios.post(
        ENV.NEXT_PUBLIC_API_ENDPOINT +
        `/Report/supplierorder?supplierId=${supplierId}`,
        null,
        { responseType: 'blob' }
      );
      let a = document.createElement('a');
      a.href = window.URL.createObjectURL(result.data);
      a.download = `Order.pdf`;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      Header: 'Product Code',
      accessor: 'ProductCode'
    },
    {
      Header: 'Name',
      accessor: 'ProductName',
    },
    {
      Header: 'Description',
      accessor: 'ProductDescription'
    },
    {
      Header: 'Quantity',
      accessor: 'Quantity',
    },
  ];

  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : isError ? (
        <h1>Error</h1>
      ) : (
        <>
          <div className="flex p-4">
            <div className="w-2/4 mt-4 flex flex-col border-2 rounded-md shadow-md">
              <div className="font-semibold text-lg border-b-2 p-2 bg-gradient-left-right text-white rounded-t-md">
                Supplier Information
              </div>
              <div className="p-4">
                <div className="">
                  <div className="">
                    <label className="font-semibold font-play mt-4">Name</label>
                    <input
                      readOnly
                      value={supplierDetails?.NameEng}
                      type="text"
                      className="w-full rounded-md bg-gray-100 text-blue-navy font-semibold"
                    />
                  </div>
                  <div className="">
                    <label className="font-semibold font-play mt-4">Email</label>
                    <input
                      readOnly
                      value={supplierDetails?.Email}
                      type="text"
                      className="w-full rounded-md bg-gray-100 text-blue-navy font-semibold"
                    />
                  </div>
                  <div className="">
                    <label className="font-semibold font-play mt-4">Address</label>
                    <input
                      readOnly
                      value={supplierDetails?.Address}
                      type="text"
                      className="w-full rounded-md bg-gray-100 text-blue-navy font-semibold"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 p-4">
            {supplierDetails ? supplierDetails.Requests.map((request) => {
              return <div className="border-2 border-blue-ocean p-2 rounded-md my-4">
                <div className='flex justify-between'>
                  <span className='font-semibold font-play text-blue-navy'>Order No. {request.ProcessId} - {request.City}</span>
                  <div>
                    <button className="bg-gradient-top-bottom text-white rounded-md p-2 mx-2 font-play font-semibold" onClick={()=>{handleSubmit(request.ProcessId)}}>Import Order</button>
                    <button className="border-blue-dark-ocean text-blue-navy rounded-md border-2 p-2 mx-2 font-play font-semibold hover:bg-blue-200">Download Order</button>
                  </div>
                </div>
                <BaseTable data={request.Products} columns={columns} />
              </div>
            }) : null}
          </div>
        </>
      )}
      {showError ? (
        <GeneralFailPopup
          errorMessage="Something went wrong. Try again!"
          setShow={setShowError}
        />
      ) : (
        ''
      )}
      {showSuccess ? (
        <GeneralSuccessPopup
          successMessage={'Order Imported!'}
          buttonLink={'/importorder'}
          buttonMessage={'Back To Suppliers'}
          onClick={onClick}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default ReviewRequest;

const fetchRequest = async (params: Params) => {
  const [_, { supplierId }] = params.queryKey;
  const result = await axios.get(
    ENV.NEXT_PUBLIC_API_ENDPOINT +
    `/Supplier/supplierRequest?supplierId=${supplierId}`
  );
  return result;
};

interface Params {
  queryKey: any;
}
