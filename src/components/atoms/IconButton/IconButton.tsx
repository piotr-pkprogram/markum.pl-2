import React from 'react';
import { useRouter } from 'next/router';
import { BtnTypes } from 'types/btnTypes';
import Image from 'next/image';

type Props = {
  svg?: string;
  type?: BtnTypes;
  to?: string;
  onClick?: any;
  className?: string;
  isRouterLink?: boolean;
  isExternalLink?: boolean;
  children?: JSX.Element | JSX.Element[];
};

const IconButton = ({
  svg,
  type = BtnTypes.Button,
  to = '',
  isRouterLink,
  isExternalLink,
  onClick,
  className = '',
  children
}: Props) => {
  const router = useRouter();

  if (isRouterLink)
    return (
      <a
        className={`hover:opacity-70 transition-opacity ${className}`}
        href={to}
        onClick={() => router.push(to)}
      >
        {svg ? <Image src={svg} alt="" /> : children}
      </a>
    );
  else if (isExternalLink)
    return (
      <a
        className={`hover:opacity-70 transition-opacity ${className}`}
        href={to}
        target="_blank"
        rel="noopener noreferrer"
      >
        {svg ? <Image src={svg} alt="" /> : children}
      </a>
    );
  else
    return (
      <button
        className={`hover:opacity-70 transition-opacity ${className}`}
        type={type}
        onClick={onClick}
      >
        {svg ? <Image src={svg} alt="" /> : children}
      </button>
    );
};

export default IconButton;
