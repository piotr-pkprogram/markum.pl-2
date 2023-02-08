import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';

export { NavLink };

type Props = {
  href: string;
  children: JSX.Element | JSX.Element[] | string;
  exact?: boolean;
  className?: string;
  props?: React.HTMLAttributes<HTMLAnchorElement>
}

function NavLink({ href, exact = false, children, ...props }: Props) {
  const { pathname } = useRouter();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  if (isActive) {
    props.className += ' active';
  }

  return (
    <Link href={href}>
      <a {...props}>
        {children}
      </a>
    </Link>
  );
}