import React from 'react'
import Image from 'next/image'
import { Set } from 'interfaces/Sets'
import ImageCarousel from 'components/general/ImageCarousel'

interface ImageProps {
  imgBase64?: string
}

const ImageView: React.FC<ImageProps> = (props) => {
  const { imgBase64 } = props
  return (
    <div className="w-full flex flex-col col-span-2 row-span-1 shadow-md rounded-md border-blue-navy border-t-4">
      <div className="flex flex-col text-base font-bold pt-4 px-4">Image</div>
      <div className="w-full flex flex-col items-center justify-center px-4 py-4">
        <div className='w-full h-64 flex flex-col items-center justify-center'>
          {imgBase64 && imgBase64 != '' ? <img className="" width={200} src={`data:image/jpg;base64,${imgBase64}`} /> : <span>Select a tray to show image</span>}
        </div>
      </div>
    </div>
  )
}

export default ImageView