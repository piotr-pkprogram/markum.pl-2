import Image from 'next/image';
import { EstateType } from 'types/estateType';
import area from 'public/img/area.png';
import homeArea from 'public/img/home-area.png';
import door from 'public/img/door.svg';
import blueArrow from 'public/img/blue-arrow.svg';
import styles from './EstateBox.module.scss';

import TextLink from 'src/components/atoms/TextLink/TextLink';

const EstateBox = ({ estate }: { estate: EstateType }) => {
  let rooms = '';

  if (estate.numOfRooms) {
    rooms =
      (estate.numOfRooms?.toString().includes('2') ||
        estate.numOfRooms?.toString().includes('3') ||
        estate.numOfRooms?.toString().includes('4')) &&
        (estate.numOfRooms <= 10 || estate.numOfRooms >= 20)
        ? 'pokoje'
        : estate.numOfRooms !== 1
          ? 'pokoji'
          : 'pokój';
  }

  return (
    <div className={styles.wrapper}>
      <img
        src={`https://img.asariweb.pl/normal/${estate.images[0].id}`}
        alt={estate.images[0].description ? estate.images[0].description : ''}
        style={{ objectFit: 'cover', width: '100%', height: '195px' }}
        loading="lazy"
      />
      <div className={styles.basicInfo}>
        <span className="text-2xl">
          {estate.price}{' '}
          {typeof estate.price === 'string' && estate.price.includes('zł') ? `` : `zł`}
        </span>
        <p>
          <span>
            {estate.address.city} {estate.address.district}
          </span>
        </p>
        <div className="flex flex-wrap gap-4" style={{ minHeight: '72px' }}>
          {estate.area.total ? (
            <span className="flex items-center gap-2" title="Powierzchnia Domu">
              <Image src={homeArea} alt="" />
              <span>{Math.round(estate.area.total)} m<sup>2</sup></span>
            </span>
          ) : (
            <span className="flex items-center gap-1" />
          )}
          {estate.area.lot ? (
            <span className="flex items-center gap-2" title="Powierzchnia Działki">
              <Image src={area} alt="" />
              <span>{Math.round(estate.area.lot)} m<sup>2</sup></span>
            </span>
          ) : (
            <span className="flex items-center gap-1" />
          )}
          {estate.numOfRooms ? (
            <span className="flex items-center gap-2">
              <Image src={door} alt="" />
              <span>{estate.numOfRooms} {rooms}</span>
            </span>
          ) : (
            <span className="flex items-center gap-1" />
          )}
        </div>
        <TextLink
          className="!font-semibold !text-xl !text-darkBlue grid grid-flow-col items-center !gap-0 w-max"
          isRouterLink
          to={estate.link}
        >
          <span>Zobacz ofertę</span>
          <span className={styles.arrowBox}>
            <Image src={blueArrow} alt="" />
          </span>
        </TextLink>
      </div>
    </div>
  );
};

export default EstateBox;
