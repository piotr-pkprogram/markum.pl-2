import React from 'react';
import Image from 'next/image';
import { EstateType } from 'types/estateType';
import area from 'public/img/area.png';
import door from 'public/img/door.svg';
import blueArrow from 'public/img/blue-arrow.svg';
import styles from './EstateBox.module.scss';
// @ts-ignore
import loadable from '@loadable/component';

const TextLink = loadable(() => import('src/components/atoms/TextLink/TextLink'));

const EstateBox = ({ estate }: { estate: EstateType }) => {
  let rooms = "";
  
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
        src={`${estate.images[0].src}`}
        alt={estate.images[0].alt ? estate.images[0].alt : ''}
        style={{ objectFit: "cover", width: "100%"}}
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
          <br />
          <span>
            {estate.address.street} {estate.address.houseNumber}
          </span>
        </p>
        <div className="grid grid-flow-col gap-2">
          <span className="flex items-center gap-1">
            <Image src={area} alt="" />
            {Math.round(estate.area)} m<sup>2</sup>
          </span>
          {estate.numOfRooms ? (
            <span className="flex items-center gap-1">
             <Image src={door} alt="" />
            {estate.numOfRooms} {rooms} 
            </span>)
            : (<span className="flex items-center gap-1" />)}
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
