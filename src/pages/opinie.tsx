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

