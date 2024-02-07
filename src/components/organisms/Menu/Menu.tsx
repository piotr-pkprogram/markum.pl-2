import React, { useEffect, useRef, useState } from 'react';
import styles from './Menu.module.scss';
import Logo from 'src/components/atoms/Logo/Logo';
import TextButton from 'src/components/atoms/TextButton/TextButton';
import MenuLinkElement from 'src/components/molecules/MenuLinkElement/MenuLinkElement';
import IconButton from 'src/components/atoms/IconButton/IconButton';

export enum MenuTypes {
  desktop = 'DESKTOP',
  phone = 'PHONE'
}

type Props = {
  type?: MenuTypes;
};

const Menu = ({ type = MenuTypes.desktop }: Props) => {
  const desktopMenu = useRef<HTMLDivElement>(null);
  const [isPhoneMenuVisible, setIsPhoneMenuVisible] = useState(false);
  const phoneMenuRef = useRef<HTMLMenuElement>(null);
  const burgerEl1Ref = useRef<HTMLDivElement>(null);
  const burgerEl2Ref = useRef<HTMLDivElement>(null);
  const burgerEl3Ref = useRef<HTMLDivElement>(null);


  const moveDesktopMenu = () => {
    const menu = desktopMenu.current as HTMLDivElement;
    const main = document.querySelector('main');

    if (window.scrollY >= 130 && document.body.offsetWidth >= 768) {
      menu?.classList.add('animate-top_to_down', 'fixed');
      main?.classList.add('!mt-30');
    } else {
      main?.classList.remove('!mt-30');
      menu?.classList.remove('animate-top_to_down');
      menu?.classList.remove('fixed');
    }
  };

  useEffect(() => {
    if (type === MenuTypes.desktop) window.addEventListener('scroll', moveDesktopMenu);
  }, []);

  const switchPhoneMenuVisible = () => {
    if (!isPhoneMenuVisible) {
      const phoneMenu = phoneMenuRef.current as HTMLMenuElement;
      const burgerEl1 = burgerEl1Ref.current as HTMLDivElement;
      const burgerEl2 = burgerEl2Ref.current as HTMLDivElement;
      const burgerEl3 = burgerEl3Ref.current as HTMLDivElement;

      phoneMenu.classList.remove('hidden');
      phoneMenu.classList.add('animate-right_to_left');
      burgerEl1.classList.add('animate-burgerDown');
      burgerEl3.classList.add('animate-burgerUp');

      setTimeout(() => {
        burgerEl1.classList.remove('animate-burgerDown');
        burgerEl3.classList.remove('animate-burgerUp');
        burgerEl1.classList.add('animate-burgerRotate');
        burgerEl2.classList.remove('opacity-1');
        burgerEl2.classList.add('animate-hide');
        burgerEl3.classList.add('animate-burgerRotate2');
      }, 200);

      setTimeout(() => {
        phoneMenu.classList.remove('translate-x-full');
        burgerEl1.style.transform = 'translateY(.65rem) rotate(45deg)';
        burgerEl1.classList.remove('animate-burgerRotate');
        burgerEl2.classList.add('opacity-0');
        burgerEl2.classList.remove('animate-hide');
        burgerEl3.style.transform = 'translateY(-.65rem) rotate(-45deg)';
        burgerEl3.classList.remove('animate-burgerRotate2');
        phoneMenu.classList.remove('animate-right_to_left');
        setIsPhoneMenuVisible(true);
      }, 600);
    } else {
      const phoneMenu = phoneMenuRef.current as HTMLMenuElement;
      const burgerEl1 = burgerEl1Ref.current as HTMLDivElement;
      const burgerEl2 = burgerEl2Ref.current as HTMLDivElement;
      const burgerEl3 = burgerEl3Ref.current as HTMLDivElement;

      phoneMenu.classList.add('animate-left_to_right');
      burgerEl1.classList.add('animate-burgerRotate_back');
      burgerEl1.style.transform = '';
      burgerEl2.classList.add('animate-appear');
      burgerEl2.classList.remove('opacity-0');
      burgerEl3.classList.add('animate-burgerRotate2_back');

      setTimeout(() => {
        burgerEl1.classList.add('animate-burgerDown_back');
        burgerEl1.classList.remove('animate-burgerRotate_back');
        burgerEl3.classList.add('animate-burgerUp_back');
        burgerEl3.classList.remove('animate-burgerRotate2_back');
        burgerEl3.style.transform = '';
      }, 200);

      setTimeout(() => {
        burgerEl1.classList.remove('animate-burgerDown_back');
        burgerEl2.classList.remove('animate-appear');
        burgerEl3.classList.remove('animate-burgerUp_back');
        phoneMenu.classList.add('translate-x-full');
        phoneMenu.classList.add('hidden');
        phoneMenu.classList.remove('animate-left_to_right');
        setIsPhoneMenuVisible(false);
      }, 600);
    }
  };

  if (type === MenuTypes.desktop)
    return (
      <div className={styles.wrapper} ref={desktopMenu}>
        <IconButton isRouterLink to="/">
          <Logo />
        </IconButton>
        <div className={styles.navWrapper}>
          <menu>
            <MenuLinkElement className="mr-5" href="/nieruchomosci/na-sprzedaz">
              Nieruchomości
            </MenuLinkElement>
            <MenuLinkElement className="mr-5" href="/oferta">
              Oferta
            </MenuLinkElement>
            <MenuLinkElement className="mr-5" href="/o-mnie">
              O Mnie
            </MenuLinkElement>
            <MenuLinkElement className="mr-5" href="/opinie">
              Opinie
            </MenuLinkElement>
            <MenuLinkElement className="mr-5" href="/faq">
              FAQ
            </MenuLinkElement>
            <MenuLinkElement className="mr-5" href="/kontakt">
              Kontakt
            </MenuLinkElement>
          </menu>
          <TextButton isFill isExternalLink to="tel:+48 730 396 827">
            Umów się na Rozmowę
          </TextButton>
        </div>
      </div>
    );
  else
    return (
      <>
        <div className={styles.phoneWrapper}>
          <IconButton isRouterLink to="/">
            <Logo isSmall />
          </IconButton>
          <button className={styles.burger} onClick={switchPhoneMenuVisible}>
            <div className={styles.burger__element} ref={burgerEl1Ref} />
            <div className={styles.burger__element} ref={burgerEl2Ref} />
            <div className={styles.burger__element} ref={burgerEl3Ref} />
          </button>
        </div>
        <menu className={`${styles.phoneMenu} translate-x-full hidden`} ref={phoneMenuRef}>
          <MenuLinkElement className={styles.phoneNavLink} href="/nieruchomosci">
            Nieruchomości
          </MenuLinkElement>
          <MenuLinkElement className={styles.phoneNavLink} href="/oferta">
            Oferta
          </MenuLinkElement>
          <MenuLinkElement className={styles.phoneNavLink} href="/o-mnie">
            O Mnie
          </MenuLinkElement>
          <MenuLinkElement className={styles.phoneNavLink} href="/opinie">
            Opinie
          </MenuLinkElement>
          <MenuLinkElement className={styles.phoneNavLink} href="/faq">
            FAQ
          </MenuLinkElement>
          <MenuLinkElement className={styles.phoneNavLink} href="/kontakt">
            Kontakt
          </MenuLinkElement>
        </menu>
      </>
    );
};

export default Menu;
