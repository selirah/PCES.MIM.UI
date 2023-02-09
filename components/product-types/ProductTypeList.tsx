import React, { useEffect, useState } from 'react';
import BaseTable from 'components/general/BaseTable';
import Link from 'next/link';
import ValidatePasswordPopup from 'components/validationManager/ValidatePasswordPopup';
import { useRouter } from 'next/router';
import { OpenValidate } from 'types/user-managemnt';

interface Props {
  data: any;
}

const ProductTypeList: React.FC<Props> = ({ data }: Props) => {
  const [openValidate, setOpenValidate] = useState<OpenValidate>({
    open: false,
    action: '',
  });

  const router = useRouter();
  const routeChange = () => {
    router.push(`/product-type-revision/[productTypeId]`);
  };
  const handleOnClose = () => {
    setOpenValidate({ open: false, action: '' });
  }

  const validatePasswordResult = (isValid: boolean) => {
    if (isValid) {
      setOpenValidate({ ...openValidate, open: false });
      switch (openValidate?.action) {
        case 'edit':
          //setOpenEdit(true);
          break;

        default: {
        }
      }
    }
  };
  const columns = [
    {
      Header: 'Product code',
      accessor: 'productCode',
    },
    {
      Header: 'Product name',
      accessor: 'nameEng',
    },
    {
      Header: 'Product Description',
      accessor: 'descriptionEng',
    },
    // {
    //   Header: 'Product Name Local',
    //   accessor: 'nameLocal',
    // },
    // {
    //   Header: 'Product Description Local',
    //   accessor: 'descriptionLocal',
    // },
    {
      Header: 'Edit',
      Cell: ({ cell }: any) => {
        return (
          <>
            <div className="flex gap-1 justify-center mt-1">
              <div className=" hover:scale-110">
                <Link
                  href={{
                    pathname: `/product-type-edit/[productTypeId]`,
                    query: {
                      productTypeId: cell.row.original.productTypeId,
                    },
                  }}
                >
                  <button className="bg-gray-500 rounded-md text-white font-semibold p-3">
                    Edit
                  </button>
                </Link>
              </div>
              <div className=" hover:scale-110">
                <Link
                  href={{
                    pathname: `/product-type-revision/[productTypeId]`,
                    query: {
                      productTypeId: cell.row.original.productTypeId,
                    },
                  }}
                >
                  <button className="bg-gray-500 rounded-md text-white font-semibold p-3">
                    Preview
                  </button>
                </Link>
              </div>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="p-4">
        <div className="flex flex-col text-left text-xl font-bold pt-4 px-4">
          Products
        </div>
        <div className="w-full flex flex-col col-span-3 row-span-2 shadow-md rounded-md border-blue-800 border-t-4 ">
          <BaseTable data={data} columns={columns} />
        </div>
      </div>
      <ValidatePasswordPopup
        validatePasswordResult={validatePasswordResult}
        openValidate={openValidate}
        onClose={handleOnClose}
      />
    </>
  );
};
export default ProductTypeList;
