"use client";

import { FaHome } from "react-icons/fa";
import { FaBookBookmark, FaBookOpenReader, FaMusic } from "react-icons/fa6";
import Dock from "./Dock";

export default function Footer() {
  const dockItems = [
    { 
      icon: <FaHome size={18} />, 
      label: 'Home', 
      href: '/',
      className: ""
    },
    { 
      icon: <FaBookOpenReader size={18} />, 
      label: 'Bible', 
      href: '/bible',
      className: ""
    },
    { 
      icon: <FaMusic size={18} />, 
      label: 'Hymns', 
      href: '/hymns',
      className: ""
    },
    { 
      icon: <FaBookBookmark size={18} />, 
      label: 'Bible Lessons', 
      href: '/bible-lessons',
      className: ""
    },
  ];
  return (
    <Dock
      items={dockItems}
    />
  );
}
