import type { NextPage } from 'next';
import Image from 'next/image';
// @ts-ignore
import loadable from '@loadable/component';
import marcinKumiszczoWorking from 'public/img/marcin-kumiszczo-pracujacy-jako-agent-nieruchomosci.png';
import phoneIcon from 'public/img/phone-icon.svg';
import mailIcon from 'public/img/mail-icon.svg';
import { uniqueness } from '../data/uniqueness';
import { useGetAllDataQuery } from '../store';
import { ServiceType } from 'types/serviceType';
import { EstateType } from 'types/estateType';
import { QuestionType } from 'types/questionType';
import { ReviewType } from 'types/reviewType';
import '@splidejs/splide/dist/css/splide.min.css';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Head from 'next/head';

const ErrorBox = loadable(() => import('src/components/molecules/ErrorBox/ErrorBox'));
const TextLink = loadable(() => import('../components/atoms/TextLink/TextLink'));
const ServiceElement = loadable(
  () => import('../components/molecules/ServiceElement/ServiceElement')
);
const EstateElement = loadable(() => import('../components/molecules/EstateElement/EstateElement'));
const ReviewElement = loadable(() => import('../components/molecules/ReviewElement/ReviewElement'));
const QuestionElement = loadable(
  () => import('src/components/molecules/QuestionElement/QuestionElement')
);
const TextButton = loadable(() => import('src/components/atoms/TextButton/TextButton'));
const Home: NextPage = () => {
  // @ts-ignore
  const { data, error, isLoading } = useGetAllDataQuery();

  return (
    <>
      <Head>
        <title>
          Marcin Kumiszczo - Agent nieruchomości, którego potrzebujesz | Markum - Twój Dom
        </title>
        <meta
          name="description"
          content="Cześć, z tej strony Marcin Kumiszczo. Jako agent nieruchomości dbam o Twoje interesy, a klienci wybierają mnie, ponieważ zapewniam im bezpieczeństwo przeprowadzenia transakcji, oszczędzam ich czas i potrafię wynegocjować dla nich bardzo dobre warunki."
        />
        <meta
          property="og:title"
          content="Marcin Kumiszczo - Agent nieruchomości, którego potrzebujesz | Markum - Twój Dom"
        />
        <meta
          property="og:description"
          content="Cześć, z tej strony Marcin Kumiszczo. Jako agent nieruchomości dbam o Twoje interesy, a klienci wybierają mnie, ponieważ zapewniam im bezpieczeństwo przeprowadzenia transakcji, oszczędzam ich czas i potrafię wynegocjować dla nich bardzo dobre warunki."
        />
        <meta property="og:site_name" content="Strona Główna" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.DOMAIN} />
        <meta
          property="og:image"
          content={`${process.env.DOMAIN}/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.2f16cc6a.png&w=256&q=75`}
        />
      </Head>
      <section className="hero-section">
        <div className="hero-section__title-container">
          <h1 className="hero-section__title">
            Marcin Kumiszczo - agent nieruchomości, ktorego potrzebujesz
          </h1>
          <span className="hero-section__span">
            Sprawdź, co oznacza dla mnie bezkonkurencyjność
          </span>
        </div>
        <div className="hero-section__img-wrapper hidden normal:block">
          <Image src={marcinKumiszczoWorking} alt="" priority loading="eager"/>
        </div>
        <div className="hero-section__img-wrapper hero-section__img-wrapper--bg" />
      </section>
      <section className="uniqueness-section">
        <div className="uniqueness-section__introduction">
          <h2 className="uniqueness-section__title">Dlaczego powinieneś wybrać właśnie mnie?</h2>
          <p className="uniqueness-section__desc">
            Cześć, z tej strony Marcin Kumiszczo. <br />
            <b>Agent nieruchomości, który dba o Twoje interesy</b>. Klienci wybierają mnie, ponieważ
            zakres moich usług wykracza poza to, co oferuje konkurencja.
            <br />
            <br />
            Podczas naszej współpracy przy projekcie angażuję się w&nbsp;100% i&nbsp;zajmuję się
            wszystkim od A do Z, tak abyś Ty zaoszczędził maksimum czasu, pieniędzy, a&nbsp;przy tym
            zachował pełną kontrolę.
          </p>
          <div className="uniqueness-section__contact">
            <TextLink
              className="uniqueness-section__contact-link !text-darkBlue !text-xl border-r"
              isExternalLink
              to="tel:730 396 827"
            >
              <div className="w-8 h-8 justify-self-center">
                <Image src={phoneIcon} alt="" />
              </div>
              <p>730 396 827</p>
            </TextLink>
            <TextLink
              className="uniqueness-section__contact-link !text-darkBlue !text-xl border-l"
              isExternalLink
              to="mailto:markumtwojdom@gmail.com"
            >
              <div className="w-8 h-8">
                <Image src={mailIcon} alt="" />
              </div>
              <p>
                markumtwojdom@gmail
                <br />
                .com
              </p>
            </TextLink>
          </div>
        </div>
        <div className="uniqueness-section__uniqueness">
          {uniqueness.map(({ id, icon, name, desc }, i) => (
            <div
              className={`uniqueness-section__unique-container ${
                i > 1 ? `sm3:row-start-2 sm3:col-start-${i - 1}` : 'sm3:row-start-1'
              }`}
              key={id}
            >
              <Image className="uniqueness-section__unique-ico" src={icon} alt="" />
              <span className="uniqueness-section__unique-name" dangerouslySetInnerHTML={{ __html: name }}/>
              <p className="uniqueness-section__unique-desc">{desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="services-section">
        <h2 className="services-section__title">W czym mogę Ci pomóc?</h2>
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
      <section className="estates-section">
        <h2 className="estates-section__title">Moje oferty</h2>
        <div className="estates-section__slider-wrapper">
          {!isLoading && !error ? (
            <Splide
              className="splide-estates"
              options={{
                type: data.estates.length > 5 ? 'loop' : 'slider',
                arrows: false,
                perPage: data.estates.length >= 4 ? 4 : data.estates.length,
                autoplay: true,
                rewind: data.estates.length < 5,
                interval: 1000,
                width: 1354,
                gap: '1rem',
                lazyLoad: 'nearby',
                preloadPages: 2,
                pauseOnHover: true,
                pauseOnFocus: true,
                updateOnMove: true,
                pagination: false,
                drag: true,
                keyboard: true,
                perMove: 1,
                breakpoints: {
                  1400: {
                    type: data.estates.length > 4 ? 'loop' : 'slider',
                    perPage: 3,
                    width: 1010
                  },
                  1050: {
                    type: data.estates.length > 3 ? 'loop' : 'slider',
                    perPage: 2,
                    width: 670
                  },
                  715: {
                    type: data.estates.length > 1 ? 'loop' : 'slider',
                    perPage: 1,
                    width: 305
                  }
                }
              }}
            >
              {data.estates.map((estate: EstateType) => (
                  <SplideSlide key={estate.id}>
                    <EstateElement estate={estate} />
                  </SplideSlide>
                ))}
            </Splide>
          ) : (
            <ErrorBox error={error as FetchBaseQueryError} />
          )}
        </div>
      </section>
      <section className="reviews-section">
        <div className="reviews-section__title-wrapper">
          <span className="reviews-section__span-title">Opinie</span>
          <h2 className="reviews-section__title">Co mówią o mnie moi klienci?</h2>
        </div>
        <div className="reviews-section__slider-wrapper">
          {!isLoading && !error ? (
            <Splide
              className="splide-reviews"
              options={{
                type: data.reviews.length > 2 ? 'loop' : 'slider',
                arrows: false,
                perPage: 2,
                autoplay: true,
                interval: 1500,
                rewind: true,
                width: 1337,
                gap: '2rem',
                pauseOnHover: true,
                pauseOnFocus: true,
                pagination: true,
                drag: true,
                keyboard: true,
                classes: {
                  page: 'reviews-section__page'
                },
                preloadPages: 1,
                perMove: 1,
                breakpoints: {
                  1400: {
                    perPage: 1,
                    width: 650
                  }
                }
              }}
            >
              {data.reviews.map((review: ReviewType) => (
                <SplideSlide key={review._id}>
                  <ReviewElement review={review} />
                </SplideSlide>
              ))}
            </Splide>
          ) : (
            <ErrorBox error={error as FetchBaseQueryError} />
          )}
        </div>
      </section>
      <section className="faq-section">
        <div className="faq-section__title-wrapper">
          <span className="faq-section__span-title">FAQ</span>
          <h2 className="faq-section__title">A może masz jakieś pytania?</h2>
        </div>
        <div className="faq-section__questions-wrapper">
          {!isLoading && !error ? (
            data.questions.map((question: QuestionType) => (
              <QuestionElement question={question} key={question._id} isMore />
            ))
          ) : (
            <ErrorBox error={error as FetchBaseQueryError} />
          )}
        </div>
        <TextButton classNames="faq-section__btn !font-semibold !text-xl" isRouterLink to="/faq">
          Zobacz więcej
        </TextButton>
      </section>
    </>
  );
};

export default Home;
