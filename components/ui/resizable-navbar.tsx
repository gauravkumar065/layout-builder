"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";

import React, { useRef, useState } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      // IMPORTANT: Change this to class of `fixed` if you want the navbar to be fixed
      className={cn("sticky inset-x-0 top-4 z-40 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible }
            )
          : child
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "40%" : "100%",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      style={{
        minWidth: "800px",
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 lg:flex dark:bg-transparent",
        visible && "bg-white/80 dark:bg-neutral-950/80",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2",
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-4 py-2 text-neutral-600 dark:text-neutral-300"
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-neutral-800"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: visible ? "4px" : "2rem",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden",
        visible && "bg-white/80 dark:bg-neutral-950/80",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white px-4 py-8 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] dark:bg-neutral-950",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <IconX className="text-black dark:text-white" onClick={onClick} />
  ) : (
    <IconMenu2 className="text-black dark:text-white" onClick={onClick} />
  );
};

export const NavbarLogo = () => {
  return (
    <a
      href="#"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
    >
      <svg
        width="36"
        height="36"
        viewBox="0 0 59 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.0898 18C20.0898 19.1046 19.1944 20 18.0898 20C16.9853 20 16.0898 19.1046 16.0898 18C16.0898 16.8954 16.9853 16 18.0898 16C19.1944 16 20.0898 16.8954 20.0898 18Z"
          fill="black"
        ></path>
        <path
          d="M42.0898 18C42.0898 19.1046 41.1944 20 40.0898 20C38.9853 20 38.0898 19.1046 38.0898 18C38.0898 16.8954 38.9853 16 40.0898 16C41.1944 16 42.0898 16.8954 42.0898 18Z"
          fill="black"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M40.0899 2.0365e-06C40.7659 2.1547e-06 41.4332 0.0372686 42.0898 0.109859V2.12379C41.4347 2.04209 40.7672 2 40.0899 2C36.5517 2 33.2835 3.14743 30.6345 5.09135C31.1162 5.55951 31.5717 6.0544 31.9988 6.57362C34.2835 4.95312 37.0764 4 40.0899 4C40.7689 4 41.4367 4.04834 42.0898 4.14177V6.16591C41.4394 6.0568 40.7713 6 40.0899 6C37.5171 6 35.1352 6.80868 33.1819 8.18644C33.547 8.74673 33.8817 9.3286 34.1837 9.92973C35.8384 8.71698 37.8811 8 40.0899 8C40.7748 8 41.4436 8.06886 42.0898 8.20003V10.252C41.4506 10.0875 40.7805 10 40.0899 10C38.1572 10 36.386 10.6843 35.0029 11.8253C35.2578 12.5233 35.4707 13.2415 35.6386 13.9768C36.7365 12.7628 38.3241 12 40.0899 12C40.7911 12 41.4643 12.1203 42.0898 12.3414V14.5351C41.5015 14.1948 40.8185 14 40.0899 14C37.8808 14 36.0899 15.7909 36.0899 18C36.0899 20.2091 37.8808 22 40.0899 22C42.299 22 44.0899 20.2091 44.0899 18L44.0898 17.9791V0.446033C52.1058 2.26495 58.0899 9.43365 58.0899 18C58.0899 27.9411 50.031 36 40.0899 36C35.9474 36 32.1317 34.6006 29.0898 32.2488C26.0482 34.6002 22.2313 36 18.0898 36C17.4138 36 16.7465 35.9627 16.0898 35.8901V33.8762C16.745 33.9579 17.4125 34 18.0898 34C21.6281 34 24.8962 32.8525 27.5452 30.9086C27.0636 30.4405 26.6081 29.9456 26.181 29.4264C23.8963 31.0469 21.1033 32 18.0899 32C17.4108 32 16.7431 31.9517 16.0898 31.8582V29.8341C16.7403 29.9432 17.4085 30 18.0899 30C20.6628 30 23.0446 29.1913 24.9979 27.8136C24.6328 27.2533 24.2981 26.6714 23.996 26.0703C22.3414 27.283 20.2987 28 18.0899 28C17.405 28 16.7361 27.9311 16.0898 27.7999V25.7479C16.7291 25.9125 17.3993 26 18.0899 26C20.0226 26 21.7938 25.3157 23.1769 24.1747C22.922 23.4767 22.7091 22.7585 22.5412 22.0232C21.4433 23.2372 19.8557 24 18.0899 24C17.3886 24 16.7154 23.8797 16.0898 23.6586V21.4648C16.6782 21.8052 17.3613 22 18.0899 22C20.299 22 22.0899 20.2091 22.0899 18C22.0899 15.7909 20.299 14 18.0899 14C15.8808 14 14.0899 15.7909 14.0899 18L14.0898 35.554C6.07389 33.7351 0.0898438 26.5663 0.0898438 18C0.0898438 8.05887 8.14877 0 18.0899 0C22.2324 0 26.048 1.39934 29.0899 3.75111C32.1316 1.3998 35.9483 0 40.0899 2.0365e-06ZM46.0898 3.16303V5.34723C50.8198 7.59414 54.0899 12.4152 54.0899 18C54.0899 25.732 47.8219 32 40.0899 32C32.3579 32 26.0899 25.732 26.0899 18C26.0899 13.5817 22.5082 10 18.0899 10C13.6716 10 10.0899 13.5817 10.0899 18C10.0899 20.0289 10.8452 21.8814 12.0899 23.2916V18C12.0899 14.6863 14.7762 12 18.0899 12C21.4036 12 24.0899 14.6863 24.0899 18C24.0899 26.8366 31.2533 34 40.0899 34C48.9265 34 56.0898 26.8366 56.0898 18C56.0898 11.2852 51.9535 5.53658 46.0898 3.16303ZM12.0899 26.0007L12.0898 28.3946C8.50306 26.3197 6.0899 22.4417 6.0899 18C6.0899 11.3726 11.4625 6 18.0899 6C24.7173 6 30.0899 11.3726 30.0899 18C30.0899 23.5228 34.5671 28 40.0899 28C45.6127 28 50.0899 23.5228 50.0899 18C50.0899 14.7284 48.5188 11.8237 46.0899 9.99929V7.60538C49.6767 9.68023 52.0899 13.5583 52.0899 18C52.0899 24.6274 46.7173 30 40.0899 30C33.4625 30 28.0899 24.6274 28.0899 18C28.0899 12.4772 23.6127 8 18.0899 8C12.567 8 8.08992 12.4772 8.08992 18C8.08992 21.2716 9.66101 24.1763 12.0899 26.0007ZM4.0899 18C4.0899 23.5848 7.35998 28.4058 12.0898 30.6527V32.837C6.2262 30.4634 2.08989 24.7148 2.0899 18C2.0899 9.16344 9.25334 2 18.0899 2C26.9265 2 34.0899 9.16344 34.0899 18C34.0899 21.3137 36.7762 24 40.0899 24C43.4036 24 46.0899 21.3137 46.0899 18L46.0899 12.7084C47.3346 14.1186 48.0899 15.9711 48.0899 18C48.0899 22.4183 44.5082 26 40.0899 26C35.6716 26 32.0899 22.4183 32.0899 18C32.0899 10.268 25.8219 4 18.0899 4C10.3579 4 4.0899 10.268 4.0899 18Z"
          fill="black"
        ></path>
      </svg>
      <span className="font-medium text-black dark:text-white">Startup</span>
    </a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "px-4 py-2 rounded-md bg-white button bg-white text-black text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

  const variantStyles = {
    primary:
      "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    secondary: "bg-transparent shadow-none dark:text-white",
    dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
