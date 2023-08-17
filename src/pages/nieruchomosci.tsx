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
