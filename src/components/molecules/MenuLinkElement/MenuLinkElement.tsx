import { NavLink } from 'src/components/atoms/NavLink/NavLink';
import styles from './MenuLinkElement.module.scss';

type Props = {
  href: string;
  children: JSX.Element | JSX.Element[] | string;
  exact?: boolean;
  className?: string;
  props?: React.HTMLAttributes<HTMLAnchorElement>;
};

const MenuLinkElement = ({ href, exact, className = '', children, ...props }: Props) => (
  <NavLink href={href} exact={exact} className={`${styles.menuLink} ${className}`} {...props}>
    {children}
  </NavLink>
);

export default MenuLinkElement;
