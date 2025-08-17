import { FaHome, FaArchive, FaAccusoft } from "react-icons/fa";
import { FaSpaghettiMonsterFlying } from "react-icons/fa6";

export const MenuItems = [
  { icon: FaHome, label: 'Home', onClick: () => alert('Home!') },
  { icon: FaArchive, label: 'Archive', onClick: () => alert('Bible!') },
  { icon: FaAccusoft, label: 'Profile', onClick: () => alert('Hymns!') },
  { icon: FaSpaghettiMonsterFlying, label: 'Settings', onClick: () => alert('Settings!') },
  { icon: FaSpaghettiMonsterFlying, label: 'Settings', onClick: () => alert('Settings!') },
];