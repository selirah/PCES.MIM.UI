import axios from 'axios';
import { MenuType } from 'interfaces/Menus';
import React from 'react';
import { useQuery } from 'react-query';
import MenuItem from './menu/MenuItem';
import { ENV } from '../../../env';

const MenuList = () => {
  const { data, status, error } = useMenus();

  return (
    <ul className="">
      {status === 'loading' ? (
        <p>retrieving menus...</p>
      ) : status === 'error' ? (
        <div>
          <span>Error: {(error as Error).message}</span>
          <span>Please reload the page</span>
        </div>
      ) : (
        data.map((element: MenuType, i: React.Key | undefined | null) => {
          return <MenuItem item={element} key={i} />;
        })
      )}
    </ul>
  );
};
export default MenuList;

const useMenus = () => {
  return useQuery(
    'menus',
    async () => {
      const { data } = await axios.get(ENV.NEXT_PUBLIC_API_ENDPOINT + '/menus');
      return data;
    },
    { refetchOnWindowFocus: false }
  );
};
