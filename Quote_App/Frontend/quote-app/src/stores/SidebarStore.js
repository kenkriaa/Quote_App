import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarStore = [
  {
    title: 'Kezdőlap',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Vevők',
    path: '/Customer',
    icon: <IoIcons.IoMdPerson />,
    cName: 'nav-text'
  },
  {
    title: 'Ajánlatok',
    path: '/Quote',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  }
];