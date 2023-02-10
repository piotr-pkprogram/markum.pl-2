import type { NextPage } from 'next';
import { useGetAllEstatesQuery } from 'src/store';
import { EstateCategory, EstateType } from 'types/estateType';
import { ChangeEvent, useState } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { arraySplitting } from 'utils/arraySpliting';
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

  const handlePageChange = (e: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

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
            arraySplitting(data.estates, 2).map((array: EstateType[], index) => {
              console.log(data);
              return (
                <div
                  className={`estates__row ${
                    index > 2 ? `2xl:!row-start-2 2xl:col-start-${index - 2}` : ''
                  }`}
                  key={index}
                >
                  {array.map((estate) => (
                    <EstateBox estate={estate} key={estate.id} />
                  ))}
                </div>
              );
            })
          ) : (
            <ErrorBox error={error as FetchBaseQueryError} />
          )}
          {!isMore && data?.estatesCount > 8 ? (
            <TextButton classNames="estates__more" onClick={() => setIsMore(true)}>
              Zobacz więcej
            </TextButton>
          ) : data?.estatesCount > 12 ? (
            <Pagination
              className="2xl:row-start-3 2xl:col-start-1 2xl:col-end-4"
              count={Math.ceil(data.estatesCount / 12)}
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
        </div>
      </section>
    </>
  );
};

export default Estates;
