import type { NextPage } from 'next';
import mKumiszczoPng from 'public/img/marcin-kumiszczo-agent-nieruchomosci.png';
import { values } from 'src/data/values';
import Image from 'next/image';
import React from 'react';
import agentNieruchomosci from 'public/img/agent-nieruchomosci-wroclaw.png';
import Head from 'next/head';
import ShortDesc from 'src/components/molecules/ShortDesc/ShortDesc';

const AboutMe: NextPage = () => {
  // @ts-ignore
  const metaSchema = {
    name: 'O Mnie',
    description: 'Cześć, chcesz dowiedzieć się więcej o mnie i zobacz dlaczego warto mi zaufać, jeśli zastaniawiasz nad kupnem lub sprzedażą nieruchomości na rynku Wrocławskim. Zajrzyj tutaj. Serdecznie Zapraszam.',
    keywords: 'o mnie - marcin kumiszczo, marcin kumiszczo, agent nieruchomości, marcin kumiszczo agent nieruchomości',
    datePublished: "2020-03-01T15:35:23+00:00",
    dateModified: "2023-09-25T15:35:23+00:00",
    image: "https://marcinkumiszczo.pl/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftrust.9f2a10d3.svg&w=256&q=75"
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

  return (
    <>
      <Head>
        <title>O Mnie | Markum - Twój Dom</title>
        <meta
          name="description"
          content="Cześć, chcesz dowiedzieć się więcej o mnie i zobacz dlaczego warto mi zaufać, jeśli zastaniawiasz nad kupnem lub sprzedażą nieruchomości na rynku Wrocławskim. Zajrzyj tutaj. Serdecznie Zapraszam."
        />
        <meta property="og:title" content="O Mnie | Markum - Twój Dom" />
        <meta
          property="og:description"
          content="Cześć, chcesz dowiedzieć się więcej o mnie i zobacz dlaczego warto mi zaufać, jeśli zastaniawiasz nad kupnem lub sprzedażą nieruchomości na rynku Wrocławskim. Zajrzyj tutaj. Serdecznie Zapraszam."
        />
        <meta property="og:site_name" content="O Mnie" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${process.env.DOMAIN}/o-mnie`} />
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
        title="O Mnie"
        desc="Jestem agentem nieruchomości dbającym o wysoki profesjonalizm i jakość wykonywanych usług. Wierzę, że najlepszą reklamą są zadowoleni klienci, dlatego w swojej pracy kieruję się wartościami, które pomogą mi doprowadzić do sytuacji <b>win-win</b>, gdzie zarówno ja, jak i Ty będziemy zadowoleni."
        images={{ desktop: mKumiszczoPng, phone: 'marcin-kumiszczo-agent-nieruchomosci.jpg' }}
        height="303px"
      />
      <section className="main-benefits !bg-white !p-6">
        <div className="main-benefits__title-wrapper">
          <h2 className="main-benefits__title sm:text-5xl sm:font-semibold">Moje wartości</h2>
        </div>
        <div className="main-benefits__wrapper !pr-0">
          {values.map((value, index) => (
            <div
              key={`benefit-${index}`}
              className={`main-benefits__benefit ${index > 2 ? `sm:row-start-2 sm:col-start-${index - 2}` : ''
                }`}
            >
              <div style={{ height: '102px', width: '102px' }}>
                <Image src={value.svg} alt="" />
              </div>
              <span className="main-benefits__benefit-name !font-bold xs:text-2xl">
                {value.name}
              </span>
            </div>
          ))}
        </div>
      </section>
      <section className="about-section">
        <div className="about-section__main-desc">
          <Image src={agentNieruchomosci} alt="" loading="lazy" placeholder="blur" />
          <div className="about-section__personal">
            <h3 className="about-section__title">Marcin Kumiszczo</h3>
            <span className="about-section__span">Agent Nieruchomości</span>
            <p className="text-lg">
              Praca jako pośrednik w obrocie nieruchomościami jest dla mnie wyzwaniem, która pomaga mi się realizować spełniając swoje marzenia i pragnienia innych ludzi. Doświadczenie zdobyte w pracy trenera personalnego nauczyło mnie  budować relacje z drugim człowiekiem, wsłuchiwać się w jego oczekiwania i realizować wyznaczony cel.
              <br />
              <br />
              Specjalizuję się w sprzedaży mieszkań oraz zarządzaniu najmem długoterminowym nieruchomości.
              Współpracuje z inwestorami przeprowadzając ich przez cały proces: od zbadania potrzeb i możliwości, pomoc w uzyskaniu finansowania, wybór oraz zakup nieruchomości, przystosowanie do wynajmu, znalezienie najemców, zarządzanie najmem.
            </p>
          </div>
        </div>
        <p className="about-section__desc">
          Pomagam sprzedać nieruchomość przejmując wszystkie niezbędne obowiązki mające na celu do doprowadzenia do transakcji, jak najszybciej i jak najdrożej.
          Jestem licencjonowanym pośrednikiem i certyfikowanym negocjatorem na rynku nieruchomości.
          Od ponad 20 lat uprawiam sport, który stał się moją pasją, a starty w zawodach biegowych czy triathlonowych dają dużo satysfakcji i uczą pokory.
          <br />
          <br />
          <b>W swojej pracy kieruję się profesjonalizmem, bezpieczeństwem i zasadą win-win.</b>{' '}
          Chętnie pomagam i służę innym. <br />
          <br />
          <b>Moje motto:</b>{' '}
          <i>
            „Jeśli nie możesz latać, biegnij. Jeśli nie możesz biec, idź. Jeśli nie możesz chodzić,
            czołgaj się. Ale bez względu na wszystko – posuwaj się naprzód.”
          </i>
        </p>
      </section>
    </>
  );
};

export default AboutMe;
