import React from 'react';
import { ServerError } from 'src/components/molecules/ErrorBox/ErrorBox';
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
import { NextPageContext } from 'next'

import ShortDesc from 'src/components/molecules/ShortDesc/ShortDesc';
import ErrorBox from 'src/components/molecules/ErrorBox/ErrorBox';
import TextLink from 'src/components/atoms/TextLink/TextLink';
import ReviewElement from 'src/components/molecules/ReviewElement/ReviewElement';

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

export async function getServerSideProps(ctx: NextPageContext) {
  const params = ctx.query;

  const res = await fetch(`https://marcinkumiszczo.pl/api/services?link=${params['service-link']}`);
  const data = await res.json();

  return {
    props: { data }
  };
}

// @ts-ignore
const Service = ({ data }) => {

  // @ts-ignore
  const metaSchema = {
    name: data?.service?.name,
    description: data?.service && 'metaDesc' in data?.service
      ? data.service.metaDesc
      : textShorted(data?.service?.desc as string, 230),
    keywords: '',
    datePublished: data?.service.created,
    dateModified: "2023-09-25T15:35:23+00:00",
    image: data?.service.icon
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
        "width": "100",
        "height": "100",
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

  return data.success ? (
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
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
        <Image src={marcinKumiszczoAbout} alt="" loading="lazy" />
        <div className="about-me__desc-wrapper">
          <h2 className="about-me__title">Poznaj Mnie</h2>
          <p className="text-lg">
            Praca jako pośrednik w obrocie nieruchomościami jest dla mnie wyzwaniem, która pomaga mi się realizować spełniając swoje marzenia i pragnienia innych ludzi. Doświadczenie zdobyte w pracy trenera personalnego nauczyło mnie budować relacje z drugim człowiekiem, wsłuchiwać się w jego oczekiwania i realizować wyznaczony cel.
            <br />
            <br />
            Specjalizuję się w sprzedaży mieszkań oraz zarządzaniu najmem długoterminowym nieruchomości. Współpracuje z inwestorami przeprowadzając ich przez cały proces: od zbadania potrzeb i możliwości, pomoc w uzyskaniu finansowania, wybór oraz zakup nieruchomości <br />
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
              className={`main-benefits__benefit ${index > 2 ? `sm:row-start-2 sm:col-start-${index - 2}` : ''
                }`}
            >
              <div style={{ height: '102px', width: '102px' }}>
                <Image src={benefit.svg} alt="" />
              </div>
              <span className="main-benefits__benefit-name" dangerouslySetInnerHTML={{ __html: benefit.name }}></span>
            </div>
          ))}
        </div>
      </section>
      <section className="service-process">
        <h2 className="service-process__title">Jak wygląda nasza współpraca?</h2>
        <div className="service-process__stages">
          {data?.service.process.map((stage: any, index: number) => (
            <div className="service-process__stage" key={stage._id}>
              <h3 className="service-process__stage-title">
                Etap {index + 1} &quot;{stage.title}&quot;:
              </h3>
              <div className="service-process__steps">
                {stage.steps.map((step: any, i: number) => {
                  return (
                    <div className={`service-process__step-img row-start-${i + 1}`} key={step._id}>
                      <Image src={`https:${step.icon}`} alt="" height={65} width={65} />
                    </div>
                  );
                })}
                {stage.steps.map((step: any, i: number) => (
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
    <ErrorBox error={data.error as ServerError} />
  );
};

export default Service;
