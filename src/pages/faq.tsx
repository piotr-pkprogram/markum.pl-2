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

  return (
    <>
      <Head>
        <title>FAQ | Markum - Twój Dom</title>
        <meta name='description' content='' />
        <meta property='og:title' content='FAQ | Markum - Twój Dom' />
        <meta property='og:description' content='' />
        <meta property='og:site_name' content='FAQ' />
        <meta property='og:type' content='website' />
        <meta property='og:url' content={`${process.env.DOMAIN}/faq`} />
        <meta property='og:image' content={`${process.env.DOMAIN}/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.2f16cc6a.png&w=256&q=75`} />
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
            <QuestionElement
              className="border-blue/40 border-4"
              question={question}
              key={question._id}
            />
          ))
        ) : (
          <ErrorBox error={error as FetchBaseQueryError} />
        )}
      </section>
    </>
  );
};

export default Faq;
