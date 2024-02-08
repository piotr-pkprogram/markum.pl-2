import logo from 'public/img/logo.png';
import Image from 'next/image';

type Props = {
  className?: string;
  isSmall?: boolean;
  isBig?: boolean;
};

const Logo = ({ className = '', isSmall = false, isBig = false }: Props) => (
  <div className={`h-min w-max ${className}`}>
    <Image
      src={logo}
      alt="Markum - Twój Dom"
      width={isSmall ? '55%' : isBig ? '152px' : '100%'}
      height={isSmall ? '55%' : isBig ? '155px' : '100%'}
    />
  </div>
);

export default Logo;
