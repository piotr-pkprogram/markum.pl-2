import type { NextPage } from 'next';
import markumPng from 'public/img/agent-nieruchomosci-markum-twoj-dom.png';
import React from 'react';
import { useGetAllQuestionsQuery } from 'src/store';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { QuestionType } from 'types/questionType';
import Head from 'next/head';
// @ts-ignore
import loadable from '@loadable/component';

const ShortDesc = loadable(() => import('src/components/molecules/ShortDesc/ShortDesc'));
const ErrorBox = loadable(() => import('src/components/molecules/ErrorBox/ErrorBox'));
const QuestionElement = loadable(() => import('src/components/molecules/QuestionElement/QuestionElement'));

const Faq: NextPage = () => {
  // @ts-ignore
  const { data, error, isLoading } = useGetAllQuestionsQuery();

  // @ts-ignore
  const metaSchema = {
    name: 'FAQ - Najczęściej zadawane pytania',
    alternateName: 'FAQ',
    description: '',
    keywords: '',
    datePublished: "2020-03-01T15:35:23+00:00",
    dateModified: "2023-09-26T12:35:23+00:00",
    image: "https://marcinkumiszczo.pl/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fxjfnd4eilgtd%2F4gIs7yZsXHiogKw8mPpimZ%2F81d36ad9a817d6792916904f9536f774%2Fkupno-nieruchomosci.png&w=128&q=75"
  }

  const schemaQuestions: any[] = data?.questions.map((question: QuestionType) => {
    const answer = question.answer.replaceAll("\n", "<br>");
    return {
      "@type": "Question",
      "name": question.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `<p>${answer}</p>`
      }
    };
  });

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
      },
      {
        "@type": "FAQPage",
        "mainEntity": schemaQuestions
      }
    ]
  }

  return (
    <>
      <Head>
        <title>FAQ - Najczęściej zadawane pytania | Markum - Twój Dom</title>
        <meta name='description' content='' />
        <meta property='og:title' content='FAQ - Najczęściej zadawane pytania | Markum - Twój Dom' />
        <meta property='og:description' content='' />
        <meta property='og:site_name' content='FAQ' />
        <meta property='og:type' content='website' />
        <meta property='og:url' content={`${process.env.DOMAIN}/faq`} />
        <meta property='og:image' content={`${process.env.DOMAIN}/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.2f16cc6a.png&w=256&q=75`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>
      <ShortDesc
        title="FAQ"
        desc="Podczas moich współpracy z klientami utrzymuję z nimi jak najbliższy kontakt, przez co dość często słyszę pytania, które się powtarzają. Poniżej umieściłem najczęstsze z nich."
        images={{
          desktop: markumPng,
          phone: 'agent-nieruchomosci-markum-twoj-dom.jpg'
        }}
        height="301px"
        isDescBold
      />
      <section className="questions">
        {!isLoading && !error ? (
          data.questions.map((question: QuestionType) => (
            <QuestionElement question={question} key={question._id} isMore />
          ))
        ) : (
          <ErrorBox error={error as FetchBaseQueryError} />
        )}
      </section>
    </>
  );
};

export default Faq;
