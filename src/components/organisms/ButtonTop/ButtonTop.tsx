import React, { useEffect } from 'react';
import next from 'public/img/next(2).png';
import Image from 'next/image';
import styles from 'src/components/organisms/ButtonTop/ButtonTop.module.scss';

const ButtonTop = () => {
  const scrollToTop = () => {
    window.scrollBy(0, -1 * window.scrollY);
  };

  const buttonTopAppear = () => {
    const buttonTop = document.querySelector('#btn-top');

    if (window.scrollY >= 370) {
      buttonTop?.classList.remove('animate-hide');
      buttonTop?.classList.add('!flex', 'animate-appear');
    } else {
      buttonTop?.classList.add('animate-hide');
      buttonTop?.classList.remove('!flex', 'animate-appear');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', buttonTopAppear);
  }, []);

  return (
    <div id="btn-top" className={styles.wrapper} onClick={scrollToTop}>
      <Image src={next} alt="" width={48} height={48} />
    </div>
  );
};

export default ButtonTop;
