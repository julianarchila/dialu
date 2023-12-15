"use client";
import Link from "next/link";

import { usePathname } from "next/navigation";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const selectedStyles = "font-bold";
  const defaultStyles = "text-gray-500 dark:text-gray-400";

  const pathname = usePathname();
  return (
    <Link
      className={pathname === href ? selectedStyles : defaultStyles}
      href={href}
    >
      {children}
    </Link>
  );
}
