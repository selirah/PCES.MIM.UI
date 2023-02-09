import BaseTable from 'components/general/BaseTable'
import React, { useState } from 'react'

interface Props {
    data: any[],
    setData: (data: any[]) => void
    notes: string
    setNotes: (data: string) => void
    columns: any[]
}


const IrregularAcceptance = ({ data, notes, setNotes, columns }: Props) => {

    return <>
        <div className="w-1/2 order-2 rounded-md shadow-md">
            <div className="font-semibold font-play text-lg border-b-2 p-2 bg-gradient-left-right text-white rounded-t-md">
                General Information
            </div>
            <div className="p-2">
                <label className="font-semibold text-blue-navy font-play">Note:</label>
                <textarea className="w-full rounded-md" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Enter reason for irregular sterilization..." />
            </div>
        </div>
        <div className="w-full flex flex-col col-span-3 row-span-2 shadow-md rounded-md border-t-2 m-2 mt-4">
            <div className="flex flex-col text-base font-bold pt-4 px-4 ">
                Set List
            </div>
            <BaseTable columns={columns} data={data} />
        </div>
    </>
}

export default IrregularAcceptance