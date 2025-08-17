"use client";

import { FaHome, FaArchive, FaAccusoft } from "react-icons/fa";
import { FaSpaghettiMonsterFlying } from "react-icons/fa6";
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
      icon: <FaArchive size={18} />, 
      label: 'Bible', 
      href: '/bible',
      className: ""
    },
    { 
      icon: <FaAccusoft size={18} />, 
      label: 'Hymns', 
      href: '/hymns',
      className: ""
    },
    { 
      icon: <FaSpaghettiMonsterFlying size={18} />, 
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
