import React from 'react';
import Link from 'next/link';
import { MenuType } from 'interfaces/Menus';

interface Props {
  item: MenuType;
}

const LinkMenuItem: React.FC<Props> = (props) => {
  const { item } = props;
  return (
    <li className="w-full font-play inline-flex justify-start text-sm font-medium">
      <Link href={item.UrlPath}>
        <a className="text-white no-underline w-full px-4 py-3 text-left hover:bg-blue-900">
          {item.Title}
        </a>
      </Link>
    </li>
  );
};
export default LinkMenuItem;
