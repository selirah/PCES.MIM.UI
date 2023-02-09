import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import PreviewSetDetails from './PreviewSetDetails';
import { ENV } from '../../env';
import PreviewSetDetailsNoProducts from './PreviewSetDetailsNoProducts';
import BaseTable from 'components/general/BaseTable';
import GeneralSuccessPopup from 'components/general/PopUp/GeneralSuccessPopup';
import { useRouter } from 'next/router';

interface Props {
    setId: string | string[] | undefined;
}
const PreviewSetNoProducts: React.FC<Props> = ({ setId }: Props) => {
    const query = useQuery(
        ['reviewset', { setId: setId }],
        //@ts-ignore
        fetchSetById,
        { enabled: setId != undefined, refetchOnWindowFocus: false }
    );

    const [showSuccess, setShowSuccess] = useState<boolean>(false)

    const instrumentsQuery = useQuery(['fetchInstruments', { setId: setId }],//@ts-ignore
        fetchRequestInstruments, { enabled: setId != undefined, refetchOnWindowFocus: false })

    const [data, setData] = useState<string>();
    const [requestedInstruments, setRequestedInstruments] = useState<any[]>([]);
    const [error, setError] = useState<string>('');
    const [canComplete, setCanComplete] = useState<boolean>(false);

    const router = useRouter()

    useEffect(() => {
        if (query.data != undefined) {
            setData(query.data.data);
        }
    }, [query.data]);

    useEffect(() => {
        const filtered = requestedInstruments.filter((product) => product.InstrumentId === null)
        if (filtered.length === 0) {
            setCanComplete(true)
        } else {
            setCanComplete(false)
        }
    }, [requestedInstruments])

    useEffect(() => {
        if (instrumentsQuery.data) {
            setRequestedInstruments(instrumentsQuery.data.data);
        }
    }, [instrumentsQuery.data])

    const instrumentsColumns = [
        {
            Header: 'Product Code',
            accessor: 'ProductCode'
        },
        {
            Header: 'Name',
            accessor: 'NameEng'
        },
        {
            Header: 'Description',
            accessor: 'DescriptionEng'
        },
        {
            accessor: 'RequestId',
            Cell: ({ cell }) => {
                if (cell.row.original.InstrumentId != null) {
                    return <div className="bg-green-500 text-white text-center p-3 m-2">Resolved</div>
                }
                else {
                    return <button className="bg-blue-dark-ocean w-1/2 mx-auto hover:bg-blue-800 opacity-90 text-white m-2 px-4 py-2 rounded-md" onClick={() => { resolve(cell.value) }}>Try To Resolve</button>
                }
            }
        }
    ]

    const onClick = () => {
        router.push('/set-requests')
    }

    const handleSubmit = async () => {
        const toSubmit = {
            setId
        }
        try {
            await axios.post(`${ENV.NEXT_PUBLIC_API_ENDPOINT}/Set/completeSetRequest`, toSubmit);
            setShowSuccess(true)
        } catch (error) {
            setError(error.response.data)
        }
    }

    const resolve = async (requestId: number) => {
        setError("")
        try {
            const response = await axios.post(`${ENV.NEXT_PUBLIC_API_ENDPOINT}/Set/resolveRequest`, { requestId })
            const instrumentId = response.data.instrumentId
            var requestedInstrumentsCopy = [...requestedInstruments]

            var requestIndex = requestedInstrumentsCopy.findIndex((request) => request.RequestId === requestId)

            requestedInstrumentsCopy[requestIndex].InstrumentId = instrumentId

            setRequestedInstruments(requestedInstrumentsCopy)

        } catch (error) {
            setError("No available products");
        }
    }

    return query.isLoading ? (
        <h1>Loading...</h1>
    ) : query.isError ? (
        <h1>Error</h1>
    ) : (
        <>
            <div>
                <div className="mx-2">
                    <PreviewSetDetailsNoProducts data={data} />
                </div>
                <div className="mx-2">
                    <span className="font-play text-red-700 font-semibold p-4">{error}</span>
                    <BaseTable data={requestedInstruments} columns={instrumentsColumns} />
                </div>
                <button
                    className={`w-full h-12 mt-4 font-semibold text-white bg-gradient-button rounded-md ${canComplete ? '' : 'opacity-80 hover:cursor-not-allowed'}`}
                    onClick={handleSubmit}
                    disabled={!canComplete}
                >
                    Complete Request
                </button>
            </div>
            {showSuccess ? (
                <GeneralSuccessPopup
                    successMessage={'Successfully Complete Request'}
                    buttonLink="/"
                    buttonMessage={'OK'}
                    onClick={onClick}
                />
            ) : (
                ''
            )}
        </>
    );
};
export default PreviewSetNoProducts;

const fetchSetById = async (params: Params) => {
    const [_, { setId }] = params.queryKey;
    const result = await axios.get(
        ENV.NEXT_PUBLIC_API_ENDPOINT + `/Set/setBySetId?setId=${setId}`
    );
    return result;
};

const fetchRequestInstruments = async (params: Params) => {
    const [_, { setId }] = params.queryKey;
    const result = await axios.get(
        ENV.NEXT_PUBLIC_API_ENDPOINT + `/Set/requestedInstruments?setId=${setId}`
    );
    return result;
};

interface Params {
    queryKey: [string, { setId: number }];
}
