import React from 'react';
import { NextPage } from 'next';
import { ServiceType } from 'types/serviceType';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useGetAllServicesQuery } from 'src/store';
import maricnKumiszczoPng from 'public/img/marcin-kumiszczo-siedzacy-na-murku.png';
import Head from 'next/head';
// @ts-ignore
import loadable from '@loadable/component';

const ServiceElement = loadable(() => import('src/components/molecules/ServiceElement/ServiceElement'));
const ErrorBox = loadable(() => import('src/components/molecules/ErrorBox/ErrorBox'));
const ShortDesc = loadable(() => import('src/components/molecules/ShortDesc/ShortDesc'));

const Services: NextPage = () => {
  // @ts-ignore
  const { data, error, isLoading } = useGetAllServicesQuery();

  return (
    <>
      <Head>
        <title>Oferta | Markum - Twój Dom</title>
        <meta name="description" content="Marcin Kumiszczo - Agent Nieruchomości na rynku Wrocławskim. Na tej podstronie znajdziesz wszystkie usługi jakie oferuję. Poziom mojego zaangażowania wykracza daleko poza to co oferuje konkurencja - sprawdź jak mogę Ci pomóc." />
        <meta property="og:title" content="Oferta | Markum - Twój Dom" />
        <meta property="og:description" content="Marcin Kumiszczo - Agent Nieruchomości na rynku Wrocławskim. Na tej podstronie znajdziesz wszystkie usługi jakie oferuję. Poziom mojego zaangażowania wykracza daleko poza to co oferuje konkurencja - sprawdź jak mogę Ci pomóc." />
        <meta property="og:site_name" content="Oferta" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${process.env.DOMAIN}/oferta`} />
        <meta property="og:image" content={`${process.env.DOMAIN}/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.2f16cc6a.png&w=256&q=75`} />
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
          {!isLoading && !error ? (
            data.services.map((service: ServiceType) => (
              <ServiceElement offer={service} key={service._id} />
            ))
          ) : (
            <ErrorBox error={error as FetchBaseQueryError} />
          )}
        </div>
      </section>
    </>
  );
};

export default Services;
