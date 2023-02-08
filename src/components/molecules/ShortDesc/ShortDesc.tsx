import React from 'react';
import Image from 'next/image';
import styles from './ShortDesc.module.scss';
import ReactHtmlParser from 'react-html-parser';

type Props = {
  title: string;
  desc: string;
  images: {
    desktop: StaticImageData;
    phone: string;
  };
  alt?: string;
  height: string;
  isDescBold?: boolean;
};

const ShortDesc = ({ title, desc, images, alt, height, isDescBold }: Props) => {
  const mobileImage = require(`public/img/${images.phone}`);

  return (
    <section className={styles.wrapper} style={{ minHeight: height }}>
      <div className={styles.wrapper__titleContainer}>
        <h1 className={styles.wrapper__title}>{title}</h1>
        <p className={`${styles.wrapper__desc} ${isDescBold ? styles.wrapper__descBold : ''}`}>
          {ReactHtmlParser(desc)}
        </p>
      </div>
      <div className="absolute right-0 h-full hidden normal:block">
        <Image src={images.desktop} alt={alt} priority loading="eager" placeholder="blur" />
      </div>
      <div className={styles.wrapper__phoneImg}>
        <Image
          src={mobileImage}
          alt={alt}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
          loading="eager"
          placeholder="blur"
        />
      </div>
    </section>
  );
};

export default ShortDesc;
