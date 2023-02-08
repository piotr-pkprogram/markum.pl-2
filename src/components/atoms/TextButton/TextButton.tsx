import React from 'react';
import { BtnTypes } from 'types/btnTypes';
import { useRouter } from 'next/router';
import styles from './TextButton.module.scss';

type Props = {
  classNames?: string;
  type?: BtnTypes;
  to?: string;
  onClick?: () => void;
  isFill?: boolean;
  isExternalLink?: boolean;
  isRouterLink?: boolean;
  children?: JSX.Element | JSX.Element[] | string;
};

const TextButton = ({
  classNames = '',
  type = BtnTypes.Button,
  to = '',
  onClick,
  isFill = false,
  isExternalLink,
  isRouterLink,
  children
}: Props) => {
  const className = `${styles.textButton} ${isFill ? '!bg-blue2 !text-white' : ''} ${classNames}`;
  const router = useRouter();

  if (isExternalLink)
    return (
      <a
        className={className}
        href={to}
        onClick={onClick}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  else if (isRouterLink)
    return (
      <a className={className} href={to} onClick={() => router.push(to)}>
        {children}
      </a>
    );
  return (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

TextButton.propTypes = {};

export default TextButton;
