import { MenuType } from 'interfaces/Menus';
import React from 'react';
import DropDownMenuItem from './DropDownMenuItem';
import LinkMenuItem from './LinkMenuItem';

interface Props {
  item: MenuType;
}

const MenuItem: React.FC<Props> = (props) => {
  const { item } = props;
  const isDropDown: boolean =
    item.subMenus && item.subMenus.length > 0 ? true : false;
  return (
    <div className=''>
      {isDropDown ? (
        <DropDownMenuItem item={item} />
      ) : (
        <LinkMenuItem item={item} />
      )}
    </div>
  );
};

export default MenuItem;
