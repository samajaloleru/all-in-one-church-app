"use client";

import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence,
} from "framer-motion"; // Changed to framer-motion
import { useRouter } from "next/navigation";
import React, {
  Children,
  cloneElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
// Updated type with href instead of onClick
export type DockItemData = {
  icon: React.ReactNode;
  label: React.ReactNode;
  href: string; // Changed from onClick
  className?: string;
};

export type DockProps = {
  items: DockItemData[];
  className?: string;
  distance?: number;
  panelHeight?: number;
  baseItemSize?: number;
  dockHeight?: number;
  magnification?: number;
  spring?: SpringOptions;
};

type DockItemChild = React.ReactElement<DockLabelProps | DockIconProps>;


type DockItemProps = {
  className?: string;
  children: React.ReactNode;
  href: string; // Added href prop
  mouseX: MotionValue;
  spring: SpringOptions;
  distance: number;
  baseItemSize: number;
  magnification: number;
};

const DockItem = ({
  children,
  className = "",
  href, // Added href
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
}: DockItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);
  const router = useRouter(); // Added router

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize,
    };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );
  const size = useSpring(targetSize, spring);

  const handleClick = () => {
    router.push(href); // Use router navigation
  };

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size,
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={handleClick} // Use router navigation handler
      className={`relative inline-flex items-center justify-center rounded-full bg-white border-neutral-700 border-2 shadow-md cursor-pointer ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {Children.map(children as DockItemChild[], (child) => {
        if (child.type === DockLabel) {
          return cloneElement(child, { isHovered });
        }
        return child;
      })}
    </motion.div>
  );
};

type DockLabelProps = {
  className?: string;
  children: React.ReactNode;
  isHovered?: MotionValue<number>; // Added isHovered prop
};

const DockLabel = ({ 
  children, 
  className = "", 
  isHovered // Added isHovered
}: DockLabelProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    
    const unsubscribe = isHovered.on("change", (latest) => {
      setIsVisible(latest === 1);
    });
    
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`${className} absolute -top-6 left-1/2 w-fit whitespace-pre rounded-md border border-neutral-700 bg-[#060010] px-2 py-0.5 text-xs text-white`}
          role="tooltip"
          style={{ x: "-50%" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

type DockIconProps = {
  className?: string;
  children: React.ReactNode;
};

const DockIcon = ({ children, className = "" }: DockIconProps) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      {children}
    </div>
  );
};

export default function Dock({
  items, // Use passed items instead of local
  className = "",
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 200,
  panelHeight = 64,
  dockHeight = 256,
  baseItemSize = 50,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const maxHeight = useMemo(
    () => Math.max(dockHeight, magnification + magnification / 2 + 4),
    [magnification]
  );
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  return (
    <motion.div
      style={{ height, scrollbarWidth: "none" }}
      className="flex max-w-full items-center"
    >
      <motion.div
        onMouseMove={({ clientX }) => { // Changed to clientX for accuracy
          isHovered.set(1);
          mouseX.set(clientX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        className={`${className} fixed bottom-5 left-1/2 transform -translate-x-1/2 flex items-end w-fit gap-4 rounded-2xl bg-gradient-to-br from-blue-900 to-red-800 border-neutral-700 border-2 pb-2 px-4 z-50`}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Application dock"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            href={item.href} // Pass href
            className={item.className}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
          >
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel>{item.label}</DockLabel>
          </DockItem>
        ))}
      </motion.div>
    </motion.div>
  );
}