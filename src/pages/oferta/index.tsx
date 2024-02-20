import React from 'react';
import { NextPage } from 'next';
import { ServiceType } from 'types/serviceType';
import { ServerError } from 'src/components/molecules/ErrorBox/ErrorBox';
import maricnKumiszczoPng from 'public/img/marcin-kumiszczo-siedzacy-na-murku.png';
import Head from 'next/head';

import ServiceElement from 'src/components/molecules/ServiceElement/ServiceElement';
import ErrorBox from 'src/components/molecules/ErrorBox/ErrorBox';
import ShortDesc from 'src/components/molecules/ShortDesc/ShortDesc';

export async function getStaticProps() {

  const res = await fetch(`https://marcinkumiszczo.pl/api/services`);
  const data = await res.json();

  return {
    props: { data }
  };
}

// @ts-ignore
const Services: NextPage = ({ data }) => {
  // @ts-ignore
  const metaSchema = {
    name: 'Oferta - W czym mogę Ci pomóc?',
    alternateName: 'Oferta',
    description: 'Marcin Kumiszczo - Agent Nieruchomości na rynku Wrocławskim. Na tej podstronie znajdziesz wszystkie usługi jakie oferuję. Poziom mojego zaangażowania wykracza daleko poza to co oferuje konkurencja - sprawdź jak mogę Ci pomóc.',
    keywords: 'usługi agenta nieruchomości wrocław, usługi agent nieruchomości wrocław, sprzedaż nieruchomości wrocław, sprzedaż mieszkań wrocław, zarządzanie najmem wrocław, kupno nieruchomości mieszkań, kupno mieszkań wrocław, kupno nieruchomości wrocław',
    datePublished: "2020-03-01T15:35:23+00:00",
    dateModified: "2023-02-08T18:35:23+00:00",
    image: "https://marcinkumiszczo.pl/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fxjfnd4eilgtd%2F4gIs7yZsXHiogKw8mPpimZ%2F81d36ad9a817d6792916904f9536f774%2Fkupno-nieruchomosci.png&w=128&q=75"
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
        <title>Oferta - W czym mogę Ci pomóc? | Markum - Twój Dom</title>
        <meta name="description" content="Marcin Kumiszczo - Agent Nieruchomości na rynku Wrocławskim. Na tej podstronie znajdziesz wszystkie usługi jakie oferuję. Poziom mojego zaangażowania wykracza daleko poza to co oferuje konkurencja - sprawdź jak mogę Ci pomóc." />
        <meta property="og:title" content="Oferta | Markum - Twój Dom" />
        <meta property="og:description" content="Marcin Kumiszczo - Agent Nieruchomości na rynku Wrocławskim. Na tej podstronie znajdziesz wszystkie usługi jakie oferuję. Poziom mojego zaangażowania wykracza daleko poza to co oferuje konkurencja - sprawdź jak mogę Ci pomóc." />
        <meta property="og:site_name" content="Oferta" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${process.env.DOMAIN}/oferta`} />
        <meta property="og:image" content={`${process.env.DOMAIN}/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.2f16cc6a.png&w=256&q=75`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>
      <ShortDesc
        title="Oferta"
        desc="Poziom mojego zaangażowania wykracza daleko poza to co oferuje konkurencja - sprawdź jak mogę Ci pomóc."
        images={{
          desktop: maricnKumiszczoPng,
          phone: 'marcin-kumiszczo-siedzacy-na-murku.jpg'
        }}
        height="303px"
        isDescBold
      />
      <section className="services-section">
        <div className="services-section__offers-wrapper">
          {data.success ? (
            data.services.map((service: ServiceType) => (
              <ServiceElement offer={service} key={service._id} />
            ))
          ) : (
            <ErrorBox error={data.error as ServerError} />
          )}
        </div>
      </section>
    </>
  );
};

export default Services;
