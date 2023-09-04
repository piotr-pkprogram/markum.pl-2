import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { EstateType } from 'types/estateType';
import area from 'public/img/area.png';
import styles from './EstateElement.module.scss';

const EstateElement = ({ estate }: { estate: EstateType }) => {
  return (
    <Link href={estate.link} passHref>
      <div className={styles.wrapper}>
        <img
          src={`https://img.asariweb.pl/normal/${estate.images[0].id}`}
          alt={estate.images[0].description ? estate.images[0].description : ''}
          width={305}
          height={209}
          loading="lazy"
        />
        <div className={styles.wrapper__info}>
          <span className="font-bold text-xl">{Math.round(estate.price as number)} zł</span>
          <p className="row-start-1 flex flex-wrap gap-2 items-center">
            <Image src={area} alt="" width={16} height={16} />
            <span className="text-sm font-medium">
              {estate.area.total ? estate.area.total : estate.area.lot} m<sup>2</sup>
            </span>
          </p>
          <p className="row-start-2 col-1/2 text-lg font-medium">
            {`${estate.address.city} ${estate.address.street ? estate.address.street : ''} ${estate.address.district ? estate.address.district : ''
              }`}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default EstateElement;
