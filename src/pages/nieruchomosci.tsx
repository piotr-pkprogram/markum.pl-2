import type { NextPage } from 'next';
import { useGetAllEstatesQuery } from 'src/store';
import { EstateCategory } from 'types/estateType';
import { ChangeEvent, useState, useEffect } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Pagination, PaginationItem } from '@mui/material';
import Head from 'next/head';
// @ts-ignore
import loadable from '@loadable/component';

const EstateBox = loadable(() => import('src/components/molecules/EstateBox/EstateBox'));
const TextButton = loadable(() => import('src/components/atoms/TextButton/TextButton'));
const ErrorBox = loadable(() => import('src/components/molecules/ErrorBox/ErrorBox'));
const ArrowBackIcon = loadable(() => import('@mui/icons-material/ArrowBack'));
const ArrowForwardIcon = loadable(() => import('@mui/icons-material/ArrowForward'));

const Estates: NextPage = () => {
  const [category, setCategory] = useState(EstateCategory.forSale);
  const [isMore, setIsMore] = useState(false);
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useGetAllEstatesQuery({ page, category, isMore });

  const switchCategory = () => {
    const tabs = document.querySelectorAll('.estates__tab');

    if (category === EstateCategory.forSale) {
      tabs[0].classList.remove('estates__tab--active');
      tabs[1].classList.add('estates__tab--active');
      setCategory(EstateCategory.forRent);
    } else {
      tabs[1].classList.remove('estates__tab--active');
      tabs[0].classList.add('estates__tab--active');
      setCategory(EstateCategory.forSale);
    }
  };

  useEffect(() => {
    setPage(1);
    setIsMore(false);
  }, [category]);

  const handlePageChange = (e: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // @ts-ignore
  const metaSchema = {
    name: 'Nieruchomości na sprzedaż i na wynajem',
    alternateName: '',
    description: 'Chcesz kupić lub wynająć nieruchomość na rynku Wrocławskim? Tutaj Marcin Kumiszczo, jako agent nieruchomości zadbam o Twoje interesy i pomogę Ci w znalezieniu nieruchomości, która spełni twoje potrzeby. Na tej podstronie znajdziesz wszystkie moje oferty. Serdecznie Zapraszam :)',
    keywords: 'nieruchomości na sprzedaż wrocław, nieruchomości na wynajem wrocław, nieruchomości na sprzedaż i na wynajem wrocław, nieruchomości wrocław, mieszkanie na sprzedaż, mieszkanie na wynajem',
    datePublished: "2020-03-01T15:35:23+00:00",
    dateModified: new Date().setHours(1, 20, 0),
    image: "https://marcinkumiszczo.pl/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.361821cb.png&w=384&q=75"
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
        <title>Nieruchomości | Markum - Twój Dom</title>
        <meta
          name="description"
          content="Chcesz kupić lub wynająć nieruchomość na rynku Wrocławskim? Tutaj Marcin Kumiszczo, jako agent nieruchomości zadbam o Twoje interesy i pomogę Ci w znalezieniu nieruchomości, która spełni twoje potrzeby. Na tej podstronie znajdziesz wszystkie moje oferty. Serdecznie Zapraszam :)"
        />
        <meta property="og:title" content="Nieruchomości | Markum - Twój Dom" />
        <meta
          property="og:description"
          content="Chcesz kupić lub wynająć nieruchomość na rynku Wrocławskim? Tutaj Marcin Kumiszczo, jako agent nieruchomości zadbam o Twoje interesy i pomogę Ci w znalezieniu nieruchomości, która spełni twoje potrzeby. Na tej podstronie znajdziesz wszystkie moje oferty. Serdecznie Zapraszam :)"
        />
        <meta property="og:site_name" content="Nieruchomości" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${process.env.DOMAIN}/nieruchomosci`} />
        <meta
          property="og:image"
          content={`${process.env.DOMAIN}/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.2f16cc6a.png&w=256&q=75`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>
      <section className="estates">
        <div className="estates__tabs-wrapper">
          <button className="estates__tab estates__tab--active" onClick={switchCategory}>
            Na sprzedaż
          </button>
          <button className="estates__tab estates__tab--second" onClick={switchCategory}>
            Na wynajem
          </button>
        </div>
        <div className="estates__main-wrapper">
          {!isLoading && !error ? (
            <div className="estates__content">
              {data.estates.map((estate: any) => (
                <EstateBox estate={estate} key={estate.id} />
              ))}
              {!isMore && data?.estatesCount > 8 ? (
                <div className="w-full flex justify-center">
                  <TextButton classNames="estates__more" onClick={() => setIsMore(true)}>
                    Zobacz więcej
                  </TextButton>
                </div>
              ) : data?.estatesCount > 12 ? (
                <div className="w-full flex justify-center">
                  <Pagination
                    count={Math.ceil(data.estatesCount / 15)}
                    page={page}
                    onChange={handlePageChange}
                    renderItem={(item) => (
                      <PaginationItem
                        components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                        {...item}
                      />
                    )}
                  />
                </div>
              ) : (
                ''
              )}
            </div>
          ) : (
            <ErrorBox error={error as FetchBaseQueryError} />
          )}
        </div>
      </section>
    </>
  );
};

export default Estates;
