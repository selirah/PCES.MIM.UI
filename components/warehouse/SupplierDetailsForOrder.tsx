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
  const { data: session, status } = useSession();
  const [showError, setShowError] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const [supplierDetails, setSupplierDetails] = useState<any>();

  const[cities,setCities] = useState<any[]>([])

  const [selectedCityId,setSelectedCityId] = useState<number>(0);

  const supplierQuery = useQuery(["fetchSupplier", { supplierId }], fetchSupplier, { refetchOnWindowFocus: false, enabled: supplierId !== undefined })

  const productTypesByRequestQuery = useQuery(
    ['products', { supplierId }],
    fetchProducts,
    { refetchOnWindowFocus: false }
  );

  const allProductTypesQuery = useQuery(
    ['allProducts', { supplierId }],
    fetchAllProducts
  );

  const citiesQuery = useQuery(["cities"],fetchCities)

  useEffect(()=>{
    if(citiesQuery.data){
      setCities(citiesQuery.data.data)
    }
  },[citiesQuery.data])

  useEffect(() => {
    if (supplierQuery.data != undefined) {
      setSupplierDetails(supplierQuery.data.data)
      console.log(supplierQuery.data.data)
    }
  }, [supplierQuery.data])

  const [productTypes, setProductTypes] = useState<any[]>([]);


  useEffect(() => {
    if (!productTypes || productTypes.length === 0 || selectedCityId===0) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }, [productTypes,selectedCityId])

  const onClick = (e) => {
    e.preventDefault();
    setShowSuccess(false);
    router.push('/ordertosupplier');
  };

  useEffect(() => {
    if (productTypesByRequestQuery.data != undefined)
      setProductTypes(productTypesByRequestQuery.data.data);
  }, [productTypesByRequestQuery.data]);

  const [allProductTypes, setAllProductTypes] = useState<any[]>([]);

  useEffect(() => {
    if (allProductTypesQuery.data != undefined) {
      setAllProductTypes(allProductTypesQuery.data.data);
    }
  }, [allProductTypesQuery.data]);



  const handleAdd = (index: number) => {
    const element = allProductTypes[index];
    if (
      productTypes
        .map((e: any) => {
          return e.ProductTypeId;
        })
        .includes(element.ProductTypeId)
    ) {
      var productTypes2 = productTypes.map((element: any) => {
        return element;
      });
      for (var i = 0; i < productTypes2.length; i++) {
        if (productTypes2[i].ProductTypeId == element.ProductTypeId) {
          productTypes2[i].Quantity++;
          break;
        }
      }
      setProductTypes(productTypes2);
    } else {
      element['Quantity'] = 1;
      setProductTypes([...productTypes, element]);
    }
  };

  const notSelectedColumns = [
    {
      accessor: 'ProductTypeId',
      Cell: ({ cell }: any) => {
        return (
          <button
            className="p-2 px-4 text-2xl font-play rounded-md font-semibold text-gradient"
            onClick={(e) => handleAdd(cell.row.id)}
          >
            +
          </button>
        );
      },
    },
    {
      Header: 'Product Code',
      accessor: 'ProductCode',
    },
    {
      Header: 'Name',
      accessor: 'NameEng',
    },
    {
      Header: 'Description',
      accessor: 'DescriptionEng',
    }
  ];

  const selectedColumns = [
    {
      Header: 'Product Code',
      accessor: 'ProductCode',
    },
    {
      Header: 'Name',
      accessor: 'NameEng',
    },
    {
      Header: 'Description',
      accessor: 'DescriptionEng',
    },
    {
      Header: 'Quantity',
      accessor: 'Quantity'
    },
    {
      accessor: 'ProductTypeId',
      Cell: ({ cell }) => {
        return <button className="px-4 text-3xl rounded-md bg-red-500 font-play font-bold text-white" onClick={() => { handleRemove(cell.value) }}>-</button>
      }
    }
  ]

  const handleRemove = (productTypeId: number) => {
    var productTypesCopy = [...productTypes]
    var productIndex = productTypesCopy.findIndex((product) => product.ProductTypeId === productTypeId)
    if (productIndex != -1) {
      var product = productTypesCopy[productIndex]
      product.Quantity -= 1
      if (product.Quantity === 0) {
        productTypesCopy = productTypesCopy.filter((product) => product.ProductTypeId !== productTypeId)
      }
      setProductTypes(productTypesCopy)
    }
  }

  const handleSubmit = async () => {
    if (productTypes.length == 0) {
      setShowError(true);
      return;
    }
    const toSubmit = {
      userId: session.user.userDTO.userId,
      cityId: selectedCityId,
      supplierId: supplierId,
      productTypes: productTypes,
    };
    try{
    await axios.post(ENV.NEXT_PUBLIC_API_ENDPOINT + '/Process/makeorder', toSubmit);
    }catch(error){
      setShowError(true)
    } 
    setShowSuccess(true);
  };

  return (
    <div>
      {productTypesByRequestQuery.isLoading ? (
        <h1>Loading...</h1>
      ) : productTypesByRequestQuery.isError ? (
        <h1>Error</h1>
      ) : (
        <>
          <div className='px-8'>
            {supplierDetails ?
              <div className="flex">
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
                          value={supplierDetails.nameEng}
                          type="text"
                          className="w-full rounded-md bg-gray-100 text-blue-navy font-semibold"
                        />
                      </div>
                      <div className="">
                        <label className="font-semibold font-play mt-4">Email</label>
                        <input
                          readOnly
                          value={supplierDetails.email}
                          type="text"
                          className="w-full rounded-md bg-gray-100 text-blue-navy font-semibold"
                        />
                      </div>
                      <div className="">
                        <label className="font-semibold font-play mt-4">Address</label>
                        <input
                          readOnly
                          value={supplierDetails.address}
                          type="text"
                          className="w-full rounded-md bg-gray-100 text-blue-navy font-semibold"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-2/4 mx-2 mt-4 flex flex-col border-2 rounded-md shadow-md">
                  <div className="font-semibold text-lg border-b-2 p-2 bg-gradient-left-right text-white rounded-t-md">
                    Destination
                  </div>
                  <div className="p-4">
                    <div className="">
                      <div className="">
                        <label className="font-semibold font-play mt-4">Warehouse</label><br/>
                        <select value={selectedCityId} 
                        onChange={(event)=>{setSelectedCityId(parseInt(event.target.value))}}
                        className="rounded-md text-gray-700 font-play w-full">
                          <option value={0} >
                            Select a warehouse...
                          </option>
                          {cities.map((city)=>{
                            return <option value={city.cityId}>{city.nameEng}</option>
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div> : null}

          </div>
          <div className="flex justify-between mt-4 shadow-md p-2 rounded-md">
            <div className="w-1/2 shadow-md">
              <span className="p-4 text-blue-navy font-semibold font-play ">Products For Ordering</span>
              <BaseTable columns={selectedColumns} data={productTypes} />
            </div>
            <div className="w-1/2 shadow-md mx-2">
              <span className="p-4 text-blue-navy font-semibold font-play ">Supplier's products</span>
              <BaseTable columns={notSelectedColumns} data={allProductTypes} />
            </div>
          </div>

          <div className="px-8 mt-8">
            <button
              className={`p-4 w-full rounded-md bg-gradient-left-right font-play font-semibold text-white mb-4 ${isDisabled ? 'opacity-90 hover:cursor-not-allowed' : ''}`}
              onClick={() => {
                handleSubmit();
              }}
              disabled={isDisabled}
            >
              <div>Submit</div>
            </button>
          </div>
        </>
      )}
      {showError ? (
        <GeneralFailPopup
          errorMessage="Check all the data and try again :)"
          setShow={setShowError}
        />
      ) : (
        null
      )}
      {showSuccess ? (
        <GeneralSuccessPopup
          successMessage={'Order was processed'}
          buttonLink={'/ordertosupplier'}
          buttonMessage={'Back To Suppliers'}
          onClick={onClick}
        />
      ) : (
        null
      )}
    </div>
  );
};

export default ReviewRequest;

const fetchProducts = async (params: Params) => {
  const [_, { supplierId }] = params.queryKey;
  const result = await axios.get(
    ENV.NEXT_PUBLIC_API_ENDPOINT +
    `/Supplier/supplierProductByRequest?supplierId=${supplierId}`
  );
  return result;
};

const fetchAllProducts = async (params: Params) => {
  const [_, { supplierId }] = params.queryKey;
  const result = await axios.get(
    ENV.NEXT_PUBLIC_API_ENDPOINT +
    `/Supplier/supplierproducts?supplierId=${supplierId}`
  );
  return result;
};

const fetchSupplier = async (params: Params) => {
  const [_, { supplierId }] = params.queryKey;
  const result = await axios.get(`${ENV.NEXT_PUBLIC_API_ENDPOINT}/Supplier/supplierById?supplierId=${supplierId}`)
  return result;
}

const fetchCities = async()=>{
  return await axios.get(`${ENV.NEXT_PUBLIC_API_ENDPOINT}/City`)
}

interface Params {
  queryKey: any;
}
