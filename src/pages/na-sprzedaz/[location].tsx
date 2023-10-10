import { NextPage } from 'next';
import { useGetSingleEstateByLinkQuery } from 'src/store';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import Image from 'next/image';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import React, { useEffect, useRef, useState } from 'react';
import arrowPrev from 'public/img/arrow-prev.svg';
import arrowNext from 'public/img/arrow-next.svg';
import area from 'public/img/blue-area.svg';
import homeArea from 'public/img/blue-home-area.png';
import door from 'public/img/blue-door.svg';
import { EstateCategory } from 'types/estateType';
import ReactDOM from 'react-dom';
import close from 'public/img/close.svg';
import Head from 'next/head';
import { textShorted } from 'utils/textShorted';
// @ts-ignore
import loadable from '@loadable/component';
import ReactPlayer from 'react-player/lazy';

const ErrorBox = loadable(() => import('src/components/molecules/ErrorBox/ErrorBox'));
const TextButton = loadable(() => import('src/components/atoms/TextButton/TextButton'));
const IconButton = loadable(() => import('src/components/atoms/IconButton/IconButton'));

enum ArrowType {
  prev = 'PREV',
  next = 'NEXT'
}

const EstateView: NextPage = () => {
  const [link, setLink] = useState('');
  const { data, error, isLoading } = useGetSingleEstateByLinkQuery(link);
  const [rooms, setRooms] = useState('');
  const splideSlider = useRef<Splide>(null);
  const splideLargeSlider = useRef<Splide>(null);
  const [currentImage, setCurrentImage] = useState<number | null>(null);
  const [body, setBody] = useState<HTMLBodyElement>();

  const handleArrowsClick = (arrowType: ArrowType) => {
    // @ts-ignore
    const splide = splideSlider?.current.splide;
    const index = splide?.index;
    if (arrowType === ArrowType.next) {
      // @ts-ignore
      splide?.go(index + 1);
    } else {
      // @ts-ignore
      splide?.go(index - 1);
    }
  };

  const handleArrowsLargeClick = (arrowType: ArrowType) => {
    // @ts-ignore
    const splide = splideLargeSlider?.current.splide;
    const index = splide?.index;
    if (arrowType === ArrowType.next) {
      // @ts-ignore
      splide?.go(index + 1);
    } else {
      // @ts-ignore
      splide?.go(index - 1);
    }
  };

  const initThumbnails = (thumbnail: HTMLElement, index: number, thumbnails: Array<Element>) => {
    // @ts-ignore
    const splide = splideSlider?.current.splide;
    thumbnail.addEventListener('click', () => {
      thumbnails.forEach((thumbnail) => thumbnail.classList.remove('active'));
      thumbnail.classList.add('active');
      splide?.go(index);
    });
  };

  useEffect(() => {
    const link = location.pathname;
    setLink(link);

    const body = document.querySelector('body');
    setBody(body as HTMLBodyElement);

    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumbnail, index) => {
      initThumbnails(thumbnail as HTMLElement, index, Array.from(thumbnails));
    });

    // @ts-ignore
    if (!isLoading && 'estate' in data) {
      // @ts-ignore
      const splide = splideSlider?.current.splide;
      splide?.on('moved', () => {
        thumbnails.forEach((thumbnail) => thumbnail.classList.remove('active'));
        thumbnails[splide?.index].classList.add('active');
      });
    }

    if (data?.estate?.numOfRooms) {
      setRooms(
        (data?.estate?.numOfRooms.toString().includes('2') ||
          data?.estate?.numOfRooms.toString().includes('3') ||
          data?.estate?.numOfRooms.toString().includes('4')) &&
          (data?.estate?.numOfRooms <= 10 || data?.estate?.numOfRooms >= 20)
          ? 'pokoje'
          : data?.estate?.numOfRooms !== 1
            ? 'pokoji'
            : 'pokój'
      );
    }
  }, [isLoading, data]);

  // @ts-ignore
  const metaSchema = {
    name: `${data?.estate.adsName} - ${data?.estate?.category === EstateCategory.forSale ? 'Na sprzedaż' : 'Na wynajem'}`,
    description: data?.estate && 'metaDesc' in data?.estate
      ? data.estate.metaDesc
      : textShorted(data?.estate?.desc as string, 230),
    keywords: '',
    datePublished: data?.estate.createdDate,
    dateModified: data?.estate.updatedDate,
    image: data?.estate.images[0]
  }

  // @ts-ignore
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Place",
        "@id": "https://marcinkumiszczo.pl/#place",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Stacyjna 1/4",
          "addressLocality": "Wrocław",
          "postalCode": "53-613",
          "addressCountry": "Poland"
        }
      },
      {
        "@type": [
          "LocalBusiness",
          "Organization"
        ],
        "@id": "https://marcinkumiszczo.pl/#organization",
        "name": "Marcin Kumiszczo",
        "url": "https://marcinkumiszczo.pl/",
        "email": "markumtwojdom@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Stacyjna 1/4",
          "addressLocality": "Wrocław",
          "postalCode": "53-613",
          "addressCountry": "Poland"
        },
        "logo": {
          "@type": "ImageObject",
          "@id": "https://marcinkumiszczo.pl/#logo",
          "url": "https://marcinkumiszczo.pl/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.361821cb.png&w=384&q=75",
          "contentUrl": "https://marcinkumiszczo.pl/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.361821cb.png&w=384&q=75",
          "caption": "Markum - Twój Dom - Agent Nieruchomości Wrocław",
          "inLanguage": "pl-PL",
          "width": "128",
          "height": "131"
        },
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+48-730-396-827",
            "contactType": "customer support"
          }
        ],
        "location": {
          "@id": "https://marcinkumiszczo.pl/#place"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://marcinkumiszczo.pl/#website",
        "url": "https://marcinkumiszczo.pl",
        "name": `${metaSchema.name}`,
        "alternateName": "",
        "publisher": {
          "@id": "https://marcinkumiszczo.pl/#organization"
        },
        "inLanguage": "pl-PL"
      },
      {
        "@type": "ImageObject",
        "@id": `${metaSchema.image}`,
        "url": `${metaSchema.image}`,
        "width": "1200",
        "height": "768",
        "inLanguage": "pl-PL"
      },
      {
        "@type": "AboutPage",
        "@id": "https://marcinkumiszczo.pl/#webpage",
        "url": "https://marcinkumiszczo.pl/",
        "name": `${metaSchema.name}`,
        "datePublished": `${metaSchema.datePublished}`,
        "dateModified": `${metaSchema.dateModified}`,
        "about": {
          "@id": "https://marcinkumiszczo.pl/#organization"
        },
        "isPartOf": {
          "@id": "https://marcinkumiszczo.pl/#website"
        },
        "primaryImageOfPage": {
          "@id": `${metaSchema.image}`
        },
        "inLanguage": "pl-PL"
      },
      {
        "@type": "Person",
        "@id": "https://marcinkumiszczo.pl/#author",
        "name": "Marcin Kumiszczo",
        "image": {
          "@type": "ImageObject",
          "@id": "https://marcinkumiszczo.pl/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmarcin-kumiszczo-agent-nieruchomosci-w-garniturze.5a70a1fd.png&w=1200&q=75",
          "url": "https://marcinkumiszczo.pl/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmarcin-kumiszczo-agent-nieruchomosci-w-garniturze.5a70a1fd.png&w=1200&q=75",
          "caption": "Marcin Kumiszczo - Agent Nieruchomości Wrocław",
          "inLanguage": "pl-PL"
        },
        "sameAs": [
          "https://marcinkumiszczo.pl/"
        ],
        "worksFor": {
          "@id": "https://marcinkumiszczo.pl/#organization"
        }
      },
      {
        "headline": `${metaSchema.name}`,
        "description": `${metaSchema.description}`,
        "keywords": `${metaSchema.keywords}`,
        "@type": "Article",
        "author": {
          "@id": "https://marcinkumiszczo.pl/#author",
          "name": "admin"
        },
        "datePublished": `${metaSchema.datePublished}`,
        "dateModified": `${metaSchema.dateModified}`,
        "name": `${metaSchema.name}`,
        "@id": "https://marcinkumiszczo.pl/#schema-10811",
        "isPartOf": {
          "@id": "https://marcinkumiszczo.pl/#webpage"
        },
        "publisher": {
          "@id": "https://marcinkumiszczo.pl/#organization"
        },
        "image": {
          "@id": `${metaSchema.image}`
        },
        "inLanguage": "pl-PL",
        "mainEntityOfPage": {
          "@id": "https://marcinkumiszczo.pl/#webpage"
        }
      }
    ]
  }

  // @ts-ignore
  return !isLoading && !error && 'estate' in data ? (
    <>
      <Head>
        <title>{`${data?.estate.adsName} - ${data?.estate?.category === EstateCategory.forSale ? 'Na sprzedaż' : 'Na wynajem'
          } | Markum - Twój Dom`}
        </title>
        <meta
          name="description"
          content={
            data?.estate && 'metaDesc' in data?.estate
              ? data.estate.metaDesc
              : textShorted(data?.estate?.desc as string, 230)
          }
        />
        <meta
          property="og:title"
          content={`${data?.estate?.category === EstateCategory.forSale ? 'Na sprzedaż' : 'Na wynajem'
            } ${data?.estate?.address.city} ${data?.estate?.address.street} | Markum - Twój Dom`}
        />
        <meta
          property="og:description"
          content={
            data?.estate && 'metaDesc' in data?.estate
              ? data.estate.metaDesc
              : textShorted(data?.estate?.desc as string, 230)
          }
        />
        <meta
          property="og:site_name"
          content={`${data?.estate?.category === EstateCategory.forSale ? 'Na sprzedaż' : 'Na wynajem'
            }, ${data?.estate?.address.city} ${data?.estate?.address.street}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${process.env.DOMAIN}/${data?.estate?.link}`} />
        <meta
          property="og:image"
          content={`${process.env.DOMAIN}/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.2f16cc6a.png&w=256&q=75`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>
      <section className="estate-info">
        <div className="estate-info__slider-wrapper">
          <Splide
            className="estate-info__slider"
            ref={splideSlider}
            options={{
              type: 'slider',
              perPage: 1,
              drag: true,
              arrows: false,
              lazyLoad: 'nearby',
              keyboard: true,
              preloadPages: 1,
              breakpoints: {}
            }}
            renderControls={() => (
              <div className="splide__arrows">
                <button
                  className="estate-info__arrow left-0 rounded-r-3xl"
                  onClick={() => handleArrowsClick(ArrowType.prev)}
                >
                  <Image src={arrowPrev} alt="" />
                </button>
                <button
                  className="estate-info__arrow right-0 rounded-l-3xl"
                  onClick={() => handleArrowsClick(ArrowType.next)}
                >
                  <Image src={arrowNext} alt="" />
                </button>
              </div>
            )}
          >
            {data?.estate.videoLink ? (
              <SplideSlide className="estate-info__slide">
                <ReactPlayer
                  className="estate-info__iframe"
                  controls
                  url={data?.estate.videoLink}
                />
                <div
                  className="absolute w-full h-full cursor-pointer z-20"
                  onClick={() => setCurrentImage(0)}
                />
              </SplideSlide>
            ) : (
              ''
            )}
            {data?.estate.tourLink ? (
              <SplideSlide className="estate-info__slide">
                <iframe
                  src={data?.estate.tourLink}
                  title="Przewodnik po nieruchomości"
                  className="estate-info__iframe"
                />
                <div
                  className="absolute w-full h-full cursor-pointer z-20"
                  onClick={() => setCurrentImage(data?.estate.videoLink ? 1 : 0)}
                />
              </SplideSlide>
            ) : (
              ''
            )}
            {data?.estate?.images.map((img, index) => {
              const imgSrc = `https://img.asariweb.pl/large/${img.id}`;
              return (
                <SplideSlide className="estate-info__slide" key={`image-slide-${index}`}>
                  <img
                    id={`image-${img.id}`}
                    src={`https://img.asariweb.pl/normal/${img.id}`}
                    alt={img.description ? img.description : ''}
                    width="600px"
                    height="340px"
                    loading="lazy"
                    onClick={() => {
                      const largeIn = data?.estate.tourLink && data?.estate.videoLink ? index + 2 : data?.estate.videoLink || data?.estate.tourLink ? index + 1 : index;

                      setCurrentImage(largeIn);
                    }}
                  />
                </SplideSlide>
              );
            })}
          </Splide>
          <ul id="thumbnails" className="thumbnails">
            {data?.estate.videoLink ? (
              <li className="thumbnail thumbnail--iframe active" key={`thumbnail-${0}`}>
                <p>Film</p>
              </li>
            ) : (
              ''
            )}
            {data?.estate.tourLink ? (
              <li className="thumbnail thumbnail--iframe active" key={`thumbnail-${0}`}>
                <p>Spacer Wirtualny</p>
              </li>
            ) : (
              ''
            )}
            {data?.estate?.images.map((img, index) => {
              if (data?.estate.tourLink && data?.estate.videoLink) index += 2;
              else if (data?.estate.tourLink || data?.estate.videoLink) index += 1;
              return (
                <li
                  className={`thumbnail ${index === 0 ? 'active' : ''}`}
                  key={`thumbnail-${index}`}
                >
                  <img
                    src={`https://img.asariweb.pl/normal/${img.id}`}
                    alt=""
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <div className="estate-info__info">
          <h1 className="font-semibold text-3xl">
            {data?.estate?.category === EstateCategory.forSale ? 'Na sprzedaż' : 'Na wynajem'},{' '}
            {data?.estate?.address.city}, {data?.estate?.address.district}
          </h1>
          <div className="estate-info__main-info">
            <p className="grid grid-cols-2 items-center">
              <span className="text-2xl">
                Cena: {data?.estate.price}&nbsp;
                {typeof data?.estate.price === 'string' && data?.estate.price.includes('zł')
                  ? ``
                  : `zł`}
              </span>
            </p>
            <p className="estate-info__location">
              <span className="text-lg col-start-1 col-end-3 xs:col-start-auto xs:col-end-auto">
                {data?.estate?.address.street}
              </span>
              {data?.estate?.area.total ? (
                <span className="flex font-bold items-center gap-2 row-start-2 sm2:row-start-auto">
                  <Image src={homeArea} alt="" />
                  {Math.round(data?.estate?.area.total as number)} m<sup>2</sup>
                </span>
              ) : (
                <span className="flex font-bold items-center gap-2 row-start-2 sm2:row-start-auto" />
              )}
              {data?.estate?.area.lot ? (
                <span className="flex font-bold items-center gap-2 row-start-2 sm2:row-start-auto">
                  <Image src={area} alt="" />
                  {Math.round(data?.estate?.area.lot as number)} m<sup>2</sup>
                </span>
              ) : (
                <span className="flex font-bold items-center gap-2 row-start-2 sm2:row-start-auto" />
              )}
              {rooms != '' ? (
                <span className="flex font-bold items-center gap-2 row-start-2 sm2:row-start-auto">
                  <Image src={door} alt="" />
                  {data?.estate?.numOfRooms} {rooms}
                </span>
              ) : (
                <span className="flex font-bold items-center gap-2 row-start-2 sm2:row-start-auto" />
              )}
            </p>
            <p className="estate-info__price-and-year">
              <span className="flex flex-wrap gap-3 items-center text-lg">
                <span>
                  Cena za m<sup>2</sup>:
                </span>{' '}
                <span>
                  {Math.round(data?.estate?.priceForm2 as number)}zł/m
                  <sup>2</sup>
                </span>
              </span>
              <span>
                {data?.estate?.constructYear ? `Rok budowy: ${data?.estate?.constructYear}` : ''}
              </span>
            </p>
          </div>
          <div className="estate-info__details">
            <p className="text-2xl">Szczegóły oferty:</p>
            <p className="flex flex-wrap gap-y-2 gap-x-4">
              {data?.estate?.details.Ogrodek === true ? <span>Posiada Ogródek</span> : ''}
              {data?.estate?.details.Balkon ? (
                data?.estate?.details.Balkon === 1 ? (
                  <span>Posiada Balkon</span>
                ) : data?.estate?.details.Balkon > 1 ? (
                  `Ilość Balkonów: ${data?.estate?.details.Balkon}`
                ) : (
                  ''
                )
              ) : (
                ''
              )}
              {data?.estate?.details.Liczba_lazienek ? (
                <span>Ilość Łazienek: {data?.estate?.details.Liczba_lazienek}</span>
              ) : (
                ''
              )}
              {data?.estate?.details.Wysokosc_apartamentu ? (
                <span>Wysokość apartamentu: {data?.estate?.details.Wysokosc_apartamentu} cm</span>
              ) : (
                ''
              )}
            </p>
          </div>
          <TextButton
            classNames="justify-self-center !text-xl"
            isRouterLink
            to={`${link}#kontakt`}
            isFill
          >
            Zostaw Konatkt
          </TextButton>
        </div>
      </section>
      <section className="estate-desc p-4">
        <p
          className="bg-gray p-6 rounded-3xl text-lg font-medium"
          dangerouslySetInnerHTML={{ __html: data?.estate?.desc as string }}
        />
      </section>
      {ReactDOM.createPortal(
        <>
          {currentImage !== null ? (
            <div className="fixed w-full h-full z-50 top-0 flex justify-center items-center bg-gray/80">
              <div className="absolute w-full h-full z-0" onClick={() => setCurrentImage(null)}></div>
              <IconButton
                svg={close}
                className="absolute z-10 h-12 w-12 top-5 right-0"
                onClick={() => setCurrentImage(null)}
              />
              <Splide
                ref={splideLargeSlider}
                className="large-slider"
                options={{
                  type: 'loop',
                  perPage: 1,
                  drag: true,
                  arrows: false,
                  lazyLoad: 'nearby',
                  keyboard: true,
                  pagination: false,
                  preloadPages: 1,
                  start: currentImage,
                  breakpoints: {}
                }}
                renderControls={() => (
                  <div className="splide__arrows">
                    <button
                      className="large-slider__arrow left-0 rounded-r-3xl"
                      onClick={() => handleArrowsLargeClick(ArrowType.prev)}
                    >
                      <Image src={arrowPrev} alt="" />
                    </button>
                    <button
                      className="large-slider__arrow right-0 rounded-l-3xl"
                      onClick={() => handleArrowsLargeClick(ArrowType.next)}
                    >
                      <Image src={arrowNext} alt="" />
                    </button>
                  </div>
                )}
              >
                {data?.estate.videoLink ? (
                  <SplideSlide>
                    <ReactPlayer
                      className="!w-full !h-full rounded-2xl"
                      controls
                      playing
                      url={data?.estate.videoLink}
                    />
                  </SplideSlide>
                ) : (
                  ''
                )}
                {data?.estate.tourLink ? (
                  <SplideSlide>
                    <iframe
                      src={data?.estate.tourLink}
                      title="Przewodnik po nieruchomości"
                      className="w-full h-full rounded-2xl"
                    />
                  </SplideSlide>
                ) : (
                  ''
                )}
                {data?.estate?.images.map((img, index) => (
                  <SplideSlide key={`image-large-${index}`}>
                    <img
                      className="rounded-2xl"
                      style={{ maxHeight: "100%" }}
                      src={`https://img.asariweb.pl/large/${img.id}`}
                      alt={img.description ? img.description : ''}
                      loading="lazy"
                    />
                  </SplideSlide>
                )
                )}
              </Splide>
            </div>
          ) : (
            ''
          )}
        </>,
        body as HTMLBodyElement
      )}
    </>
  ) : (
    <ErrorBox error={error as FetchBaseQueryError} />
  );
};

export default EstateView;
