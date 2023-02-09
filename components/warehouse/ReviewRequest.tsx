import axios from 'axios';
import BaseTable from 'components/general/BaseTable';
import GeneralFailPopup from 'components/general/PopUp/GeneralFailPopup';
import GeneralSuccessPopup from 'components/general/PopUp/GeneralSuccessPopup';
import { Session } from 'inspector';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { element } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { ENV } from '../../env';

interface Props {
  requestId: string | string[] | number | undefined;
}

const ReviewRequest: React.FC<Props> = ({ requestId }: Props) => {
  // const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [depositId, setDepositId] = useState<number>(0);
  const [error,setError] = useState<string>('');
  const router = useRouter();
  const { isLoading, isError, data } = useQuery(
    ['request', { requestId }],
    fetchRequest
  );
  
  const [requests, setRequests] = useState<any[]>([]);

  const [Show, setShow] = useState<any>(false);

  const onClick = (e) => {
    e.preventDefault();
    setShow(false);
    setShowSuccess(false);
    router.reload();
  };

  useEffect(() => {
    if (data != undefined) {
      setRequests(data.data);
    }
  }, [data]);

  const handleSubmit = async (ProcessId: string | number | string[]) => {
    let result = await axios.put(
      ENV.NEXT_PUBLIC_API_ENDPOINT +
        `/Process/deactivateprocess?processId=${ProcessId}`
    );
    if (result.status == 200) {
      setShowSuccess(true);
    }
  };

  const resolve=async(requestId:number)=>{
    setError('')
    const toSubmit = {
      requestId
    }
    try{
      var response = await axios.post(`${ENV.NEXT_PUBLIC_API_ENDPOINT}/Process/resolveSingleRequest`,toSubmit);

      var requestsCopy = [...requests];

      const requestIndex = requestsCopy.findIndex((request)=>request.RequestId===requestId);

      requestsCopy[requestIndex].ProductId=response.data.productId;

      setRequests(requestsCopy)

    }catch(error){
      setError('No products available')
    }
  }

  const handlePartialSubmit = async () => {
    const toSubmit = {};
    let result;
    toSubmit['processId'] = requestId;   
    toSubmit['userId'] = session.user.userDTO.userId;
    toSubmit['depositId'] = depositId;
    try {
        result = await axios.post(
        ENV.NEXT_PUBLIC_API_ENDPOINT +
          `/Process/handlepartial`,
          toSubmit          
      );     
    } catch (error) {}
 
    if (result.status == 200) {
      setShowSuccess(true);
    }
  };

  const columns = [
    {
      Header: 'Name',
      accessor: 'NameEng',
    },
    {
      Header: 'Description',
      accessor: 'DescriptionEng',
    },
    {
      accessor: 'RequestId',
      Cell: ({ cell }) => {
          if (cell.row.original.ProductId != null) {
              return <div className="bg-green-500 text-white text-center p-3 m-2">Resolved</div>
          }
          else {
              return <button className="bg-blue-dark-ocean w-1/2 mx-auto hover:bg-blue-800 opacity-90 text-white m-2 px-4 py-2 rounded-md" onClick={() => { resolve(cell.value) }}>Try To Resolve</button>
          }
      }
    }
  ];
  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : isError ? (
        <h1>Error</h1>
      ) : (
        <>
            <div className="flex flex-col text-left text-lg font-semibold text-blue-navy font-play pt-4 px-4">
              Active Requests 
            </div>
            {error && error!='' ? <span className="font-play font-semibold  px-4 text-md text-red-600">{error}</span>:null}
            <BaseTable data={requests ? requests : []} columns={columns} />
          <div>
            <div className="px-4">
              {requests?.filter((element: any) => {
                return element.ProductId !== null;
              }).length == requests?.length ? (
                <button
                  className="w-full p-4 font-semibold rounded-md bg-gradient-top-bottom font-play text-white mb-4"
                  onClick={() => {
                    handleSubmit(requestId);
                  }}
                >
                  <div>Complete Request</div>
                </button>
              ) : 
              (requests?.filter((element: any) => {
                return element.ProductId !== null;
              }).length < requests?.length && requests?.filter((element: any) => {
                return element.ProductId !== null;
              }).length > 0 ? (
                <button
                className="w-full p-4 rounded-md font-semibold bg-gradient-top-bottom font-play text-white mb-4"                
                onClick={() => {
                  handlePartialSubmit();
                }}
              >
                <div>Complete Partial Request</div>
              </button>
              ) : null
               
              )}
                
            </div>
          </div>
        </>
      )}
      {showSuccess ? (
        <GeneralSuccessPopup
          buttonMessage="Back To Requests"
          buttonLink={'/handlerequests'}
          successMessage={'Requests have been handled'}
          onClick={onClick}
        />
      ) : (
        ''
      )}
      {showError ? (
        <GeneralFailPopup
          errorMessage="Something went wrong, please try again"
          setShow={setShowError}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default ReviewRequest;

const fetchRequest = async (params: Params) => {
  const [_, { requestId }] = params.queryKey;
  const result = await axios.get(
    ENV.NEXT_PUBLIC_API_ENDPOINT + `/Process/singleRequests?processId=${requestId}`
  );
  return result;
};

interface Params {
  queryKey: any;
}
