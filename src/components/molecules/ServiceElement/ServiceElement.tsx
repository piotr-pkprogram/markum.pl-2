import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ServiceType } from 'types/serviceType';
import styles from './ServiceElement.module.scss';

const ServiceElement = ({ offer }: { offer: ServiceType }) => {

  return (
    <Link href={`/oferta/${offer.link}`} passHref>
      <div className={styles.offer_wrapper}>
        <Image src={`https:${offer.icon}`} alt="" height={100} width={100} />
        <span className={styles.offer_wrapper__title}>{offer.name}</span>
        <p className={styles.offer_wrapper__desc}>{offer.shortDesc}</p>
      </div>
    </Link>
  );
};

export default ServiceElement;
