import React from 'react';
import styles from './TextLink.module.scss';
import { useRouter } from 'next/router';

enum BtnTypes {
  Button = 'button',
  SUBMIT = 'submit',
  RESET = 'reset'
}

type Props = {
  className?: string;
  type?: BtnTypes;
  to?: string;
  isExternalLink?: boolean;
  isRouterLink?: boolean;
  onClick?: any;
  children?: JSX.Element[] | string | string[];
};

const TextLink = ({
  className = '',
  type,
  to = '',
  isExternalLink,
  isRouterLink,
  onClick,
  children
}: Props) => {
  const router = useRouter();

  if (isExternalLink)
    return (
      <a className={`${styles.textLink} ${className}`} href={to} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  else if (isRouterLink)
    return (
      <a className={`${styles.textLink} ${className}`} href={to} onClick={() => router.push(to)}>
        {children}
      </a>
    );
  else
    return (
      <button className={`${styles.textLink} ${className}`} type={type} onClick={onClick}>
        {children}
      </button>
    );
};

export default TextLink;
