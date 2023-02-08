import React from 'react';
import { useGetSingleServiceByLinkQuery } from 'src/store';
import { useRouter } from 'next/router';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import maricnKumiszczoPng from 'public/img/marcin-kumiszczo-siedzacy-w-samochodzie.png';
import marcinKumiszczoAbout from 'public/img/marcin-kumiszczo-będący-na-spotkaniu-jakoagent-nieruchomosci.jpg';
import Image from 'next/image';
import { benefits } from 'src/data/benefits';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { ReviewType } from 'types/reviewType';
import '@splidejs/splide/dist/css/splide.min.css';
import { CountUp } from 'use-count-up';
import { textShorted } from 'utils/textShorted';
import Head from 'next/head';
// @ts-ignore
import loadable from '@loadable/component';

const ShortDesc = loadable(() => import('src/components/molecules/ShortDesc/ShortDesc'));
const ErrorBox = loadable(() => import('src/components/molecules/ErrorBox/ErrorBox'));
const TextLink = loadable(() => import('src/components/atoms/TextLink/TextLink'));
const ReviewElement = loadable(
  () => import('src/components/molecules/ReviewElement/ReviewElement')
);

const getYPosition = (index: number) => {
  switch (index) {
    case 0:
      return '3px';
    case 1:
      return '140px';
    case 2:
      return '145px';
    case 3:
      return '6px';
  }
};

const Service = () => {
  const router = useRouter();
  const params = router.query;
  const { data, error, isLoading } = useGetSingleServiceByLinkQuery(
    params['service-link'] as string
  );

  return !isLoading && !error ? (
    <>
      <Head>
        <title>{`${data?.service?.name} | Markum - Twój Dom`}</title>
        <meta
          name="description"
          content={
            data?.service && 'metaDesc' in data?.service
              ? data.service.metaDesc
              : textShorted(data?.service?.desc as string, 230)
          }
        />
        <meta property="og:title" content={`${data?.service?.name} | Markum - Twój Dom`} />
        <meta
          property="og:description"
          content={
            data?.service && 'metaDesc' in data?.service
              ? data.service.metaDesc
              : textShorted(data?.service?.desc as string, 230)
          }
        />
        <meta property="og:site_name" content={data?.service?.name} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${process.env.DOMAIN}/${data?.service?.link}`} />
        <meta
          property="og:image"
          content={`${process.env.DOMAIN}/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.2f16cc6a.png&w=256&q=75`}
        />
      </Head>
      <ShortDesc
        title={data?.service?.name as string}
        desc={data?.service?.desc as string}
        images={{
          desktop: maricnKumiszczoPng,
          phone: 'marcin-kumiszczo-siedzacy-w-samochodzie.jpg'
        }}
        height="322px"
      />
      <section className="about-me">
        <Image src={marcinKumiszczoAbout} alt="" loading="lazy" placeholder="blur" />
        <div className="about-me__desc-wrapper">
          <h2 className="about-me__title">Poznaj Mnie</h2>
          <p className="text-lg">
            Od ponad 20 lat uprawiam sport, który stał się moją pasją, a starty w zawodach biegowych
            czy triathlonowych dają dużo satysfakcji i uczą pokory.
            <br />
            <br />
            Praca jako pośrednik w obrocie nieruchomościami jest dla mnie wyzwaniem, która pomaga mi
            się realizować spełniając swoje marzenia i pragnienia innych ludzi. Doświadczenie
            zdobyte w pracy trenera personalnego nauczyło mnie budować relacje z drugim człowiekiem,
            wsłuchiwać się w jego oczekiwania i realizować wyznaczony cel. W swojej pracy kieruję
            się <b>zasadą win - win</b>, dlatego najważniejszym dla mnie celem jest wgrana obu
            stron.
            <TextLink className="!text-lg" isRouterLink to="/o-mnie">
              {' '}
              Czytaj więcej ...
            </TextLink>
          </p>
        </div>
      </section>
      <section className="numbers">
        <div className="numbers__count-wrapper">
          <span className="numbers__counter">
            <CountUp start={0} end={100} duration={4} easing="easeInCubic" isCounting />
            &nbsp;+
          </span>
          <p className="numbers__desc">sprzedanych nieruchomości</p>
        </div>
        <div className="numbers__count-wrapper">
          <span className="numbers__counter">
            <CountUp start={0} end={100} duration={4} easing="easeInCubic" isCounting />
            &nbsp;+
          </span>
          <p className="numbers__desc">zadowolonych klientów</p>
        </div>
        <div className="numbers__count-wrapper">
          <span className="numbers__counter">
            <CountUp start={0} end={4} duration={4} easing="easeInCubic" isCounting />
            &nbsp;+
          </span>
          <p className="numbers__desc">lat działalności</p>
        </div>
      </section>
      <section className="main-benefits">
        <div className="main-benefits__title-wrapper">
          <h2 className="main-benefits__title">Główne Korzyści</h2>
          <span className="main-benefits__span">ze współpracy</span>
        </div>
        <div className="main-benefits__wrapper">
          {benefits.map((benefit, index) => (
            <div
              key={`benefit-${index}`}
              className={`main-benefits__benefit ${
                index > 2 ? `sm:row-start-2 sm:col-start-${index - 2}` : ''
              }`}
            >
              <div style={{ height: '102px', width: '102px' }}>
                <Image src={benefit.svg} alt="" placeholder="blur" />
              </div>
              <span className="main-benefits__benefit-name" dangerouslySetInnerHTML={{ __html: benefit.name}}></span>
            </div>
          ))}
        </div>
      </section>
      <section className="service-process">
        <h2 className="service-process__title">Jak wygląda nasza współpraca?</h2>
        <div className="service-process__stages">
          {data?.service.process.map((stage, index) => (
            <div className="service-process__stage" key={stage._id}>
              <h3 className="service-process__stage-title">
                Etap {index + 1} &quot;{stage.title}&quot;:
              </h3>
              <div className="service-process__steps">
                {stage.steps.map((step, i) => {
                  return (
                    <div className={`service-process__step-img row-start-${i + 1}`} key={step._id}>
                      <Image src={`https:${step.icon}`} alt="" height={65} width={65} placeholder="blur" />
                    </div>
                  );
                })}
                {stage.steps.map((step, i) => (
                  <div
                    className={`service-process__step row-start-${i + 1}`}
                    style={{
                      top: i < 2 ? getYPosition(i) : 'auto',
                      bottom: i > 1 ? getYPosition(i) : 'auto'
                    }}
                    key={step._id}
                  >
                    <h4 className="service-process__step-name">{step.name}</h4>
                    {step.restOfName ? (
                      <span className="service-process__step-span">{step.restOfName}</span>
                    ) : (
                      ''
                    )}
                  </div>
                ))}
                <div className="service-process__bar-container">
                  <div className="service-process__bar" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="reviews-section">
        <div className="reviews-section__title-wrapper">
          <span className="reviews-section__span-title">Opinie</span>
          <h2 className="reviews-section__title">Co mówią o mnie moi klienci?</h2>
        </div>
        <div className="reviews-section__slider-wrapper">
          <Splide
            className="splide-reviews"
            options={{
              type: data && data?.reviews.length > 2 ? 'loop' : 'slider',
              arrows: false,
              perPage: 2,
              autoplay: true,
              interval: 1500,
              rewind: true,
              width: 1337,
              gap: '2rem',
              pauseOnHover: true,
              pauseOnFocus: true,
              pagination: true,
              drag: true,
              lazyLoad: 'nearby',
              keyboard: true,
              classes: {
                page: 'reviews-section__page'
              },
              preloadPages: 1,
              perMove: 1,
              breakpoints: {
                1400: {
                  perPage: 1,
                  width: 650
                }
              }
            }}
          >
            {data
              ? data.reviews.map((review: ReviewType) => (
                  <SplideSlide key={review._id}>
                    <ReviewElement review={review} />
                  </SplideSlide>
                ))
              : ''}
          </Splide>
        </div>
      </section>
    </>
  ) : (
    <ErrorBox error={error as FetchBaseQueryError} />
  );
};

export default Service;
