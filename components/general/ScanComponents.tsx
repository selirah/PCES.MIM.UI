import axios from 'axios';
import { ENV } from 'env';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Slogan from './footer/Slogan';
import Logo from './navbar/Logo';
import MenuList from './navbar/Menu';
import User from './navbar/User';
import GeneralFailPopup from './PopUp/GeneralPopup';

interface Props {
    setBase64: (data: string) => void
}

const ScanComponent: React.FC<Props> = ({ setBase64 }: Props) => {
    const [show, setShow] = useState<boolean>(false)
    const [scanners, setScanners] = useState<any[]>([])
    const [error, setError] = useState<string>("")
    const [isScanning, setIsScanning] = useState<boolean>(false)

    const fetchScanners = async () => {
        try {
            return await axios.get(`${ENV.NEXT_PUBLIC_SCANNER_ENDPOINT}/Scan/GetScanners`);
        } catch (error) {
            setError(JSON.stringify(error))
        }
    }

    const { data } = useQuery("fetchScanners", fetchScanners, { enabled: true, refetchOnWindowFocus: false })

    useEffect(() => {
        if (data != undefined) {
            setScanners(data.data)
        }
    }, [data])

    const scan = async (deviceId: string) => {
        try {
            setIsScanning(true)
            const payload = {
                deviceId
            }
            const response = await axios.post(`${ENV.NEXT_PUBLIC_SCANNER_ENDPOINT}/Scan/ScanFile`, payload)
            console.log(response)
            setBase64(response.data)
            setIsScanning(false)
        } catch (error) {
            setError(JSON.stringify(error))
            setIsScanning(false)
        }
    }

    return (
        <div className="w-full">
            <div className="">
                <button className="cursor-pointer border-2 text-white h-1/3 bg-gradient-left-right border-blue-ocean  font-play font-semibold text-xl p-2 rounded-md w-1/3"
                    onClick={() => setShow(true)}>
                    Scan File
                </button>
            </div>
            {show ? <GeneralFailPopup setShow={setShow}>
                <div className="p-4">
                    {scanners && scanners.length ? <>
                        <label className="font-semibold text-xl text-blue-dark-ocean">Available Scanners: </label><br />
                        {isScanning ? <label className="text-greenish-blue text-lg">Scanning In Progress...</label> : null}
                        <ul className="mt-4">
                            {scanners.map((scanner: any) =>
                                <div className="flex justify-between">
                                    <li className="font-semibold text-lg">{scanner.DeviceName}</li>
                                    <button className="bg-greenish-blue text-white px-4 py-2 font-semibold rounded-md disabled:opacity-75 disabled:cursor-not-allowed"
                                        onClick={() => { scan(scanner.DeviceId) }} disabled={isScanning}>Begin Scan</button>
                                </div>
                            )}
                        </ul>
                    </> : <label className="text-blue-navy font-semibold">No Available Scanners</label>}
                </div>
            </GeneralFailPopup> : null
            }
        </div >
    );
};

export default ScanComponent;
