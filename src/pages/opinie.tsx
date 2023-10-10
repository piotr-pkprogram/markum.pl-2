import type { NextPage } from 'next';
import dictionaryPng from 'public/img/dziennik-agenta-nieruchomosci-lezacy-na-brazowym-stole.png';
import React, { ChangeEvent, useState } from 'react';
import { useGetAllReviewsQuery } from 'src/store';
import { ReviewType } from 'types/reviewType';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Pagination, PaginationItem } from '@mui/material';
import Head from 'next/head';
// @ts-ignore
import loadable from '@loadable/component';

const ShortDesc = loadable(() => import('src/components/molecules/ShortDesc/ShortDesc'));
const ReviewElement = loadable(() => import('src/components/molecules/ReviewElement/ReviewElement'));
const ErrorBox = loadable(() => import('src/components/molecules/ErrorBox/ErrorBox'));
const ArrowBackIcon = loadable(() => import('@mui/icons-material/ArrowBack'));
const ArrowForwardIcon = loadable(() => import('@mui/icons-material/ArrowForward'));

const Reviews: NextPage = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useGetAllReviewsQuery({ page });

  const handlePageChange = (e: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // @ts-ignore
  const metaSchema = {
    name: 'Co mówią o mnie klienci?',
    alternateName: 'Opinie',
    description: 'W swojej pracy kieruję się zasadą win-win, dlatego bezkompromisowo wspieram swoich klientów, a ich satysfakcja jest dla mnie najważniejsza. Tutaj znajdziesz wszystkie referencje na mój temat, które możesz także znaleźć na mojej wizytówce w Google. Jeśli chcesz je sprawdzić Serdecznie Zapraszam.',
    keywords: '',
    datePublished: "2020-03-01T15:35:23+00:00",
    dateModified: "2023-09-25T15:35:23+00:00",
    image: "https://marcinkumiszczo.pl/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Floyal-customer.98a8be42.svg&w=256&q=75"
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
        "alternateName": `${metaSchema.alternateName}`,
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

  return (
    <>
      <Head>
        <title>Opinie | Markum - Twój Dom</title>
        <meta name="description" content="W swojej pracy kieruję się zasadą win-win, dlatego bezkompromisowo wspieram swoich klientów, a ich satysfakcja jest dla mnie najważniejsza. Tutaj znajdziesz wszystkie referencje na mój temat, które możesz także znaleźć na mojej wizytówce w Google. Jeśli chcesz je sprawdzić Serdecznie Zapraszam." />
        <meta property="og:title" content="Opinie | Markum - Twój Dom" />
        <meta property="og:description" content="W swojej pracy kieruję się zasadą win-win, dlatego bezkompromisowo wspieram swoich klientów, a ich satysfakcja jest dla mnie najważniejsza. Tutaj znajdziesz wszystkie referencje na mój temat, które możesz także znaleźć na mojej wizytówce w Google. Jeśli chcesz je sprawdzić Serdecznie Zapraszam." />
        <meta property="og:site_name" content="Opinie" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${process.env.DOMAIN}/opinie`} />
        <meta property="og:image" content={`${process.env.DOMAIN}/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.2f16cc6a.png&w=256&q=75`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>
      <ShortDesc
        title="Co mówią o mnie moi klienci?"
        desc="Kierując się zasadą <b>win - win</b> bezkompromisowo wspieram swoich klientów, a ich satysfakcja jest dla mnie najważniejszym celem."
        images={{
          desktop: dictionaryPng,
          phone: 'dziennik-agenta-nieruchomosci-lezacy-na-brazowym-stole.jpg'
        }}
        height="301px"
        isDescBold
      />
      <section className="reviews">
        {!isLoading && !error ? (
          <>
            {data.reviews.map((review: ReviewType, index: number) => (
              <ReviewElement
                review={review}
                key={review._id}
                className={`${index % 2 === 0 ? '3xl:justify-self-end' : '3xl:justify-self-start'}`}
              />
            ))}
            {data.reviewsCount > 6 ? (
              <Pagination
                className="3xl:col-start-1 3xl:col-end-3"
                count={Math.ceil(data.reviewsCount / 6)}
                page={page}
                onChange={handlePageChange}
                renderItem={(item) => (
                  <PaginationItem
                    components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                    {...item}
                  />
                )}
              />
            ) : (
              ''
            )}
          </>
        ) : (
          <ErrorBox error={error as FetchBaseQueryError} />
        )}
      </section>
    </>
  );
};

export default Reviews;

