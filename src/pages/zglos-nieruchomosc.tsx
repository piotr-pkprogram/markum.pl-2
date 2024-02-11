import type { NextPage } from 'next';
import { useRef, useState, useEffect } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import Head from 'next/head';
import ErrorBox from 'src/components/molecules/ErrorBox/ErrorBox';
import ShortDesc from 'src/components/molecules/ShortDesc/ShortDesc';
import agentWSamochodzie from 'public/img/marcin-kumiszczo-siedzacy-w-samochodzie.webp';
import { ReportEstateFormState, FormInput, ResError, SubmitFormEvent } from 'types/FormTypes';
import { send } from '@emailjs/browser';
import { useForm } from 'src/hooks/useForm';
import { BtnTypes } from 'types/btnTypes';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import styleInput from 'src/components/atoms/Input/Input.module.scss';
import stylesFooter from 'src/components/organisms/Footer/Footer.module.scss';
import TextButton from 'src/components/atoms/TextButton/TextButton';
import ResponseP from 'src/components/atoms/ResponseP/ResponseP';
import Checkbox from 'src/components/atoms/Checkbox/Checkbox';
import TextLink from 'src/components/atoms/TextLink/TextLink';

const InitialState: ReportEstateFormState = {
  estateType: 'Typ nieruchomości',
  transactionType: 'Typ transakcji',
  fullName: '',
  email: '',
  location: '',
  area: '',
  price: '',
  phone: '',
  description: '',
};

const ReportEstate: NextPage = () => {
  const {
    formValues,
    handleInputChange,
    handleSubmitForm,
    handleThrowError,
    handleSelectInputChange,
    handleClearForm
  } = useForm(InitialState);
  const { estateType, transactionType, fullName, email, location, area, price, phone, description, errorsInputs } = formValues as ReportEstateFormState;
  const loaderWrapper = useRef<HTMLDivElement>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>();
  const [ResError, setResError] = useState<ResError>();

  const handleSendEmail = (inputs: FormInput[]) => {
    const loader = loaderWrapper.current as HTMLDivElement;
    loader.classList.remove('hidden');
    setIsSuccess(undefined);

    try {
      const data = {
        from: inputs[3].value,
        to: 'markumtwojdom@gmail.com',
        subject: `Nowe Zgłoszenie Nieruchomości - ${inputs[4].value} - Markum.pl`,
        fullName: inputs[2].value,
        email: inputs[3].value,
        estateType: inputs[0].value,
        transactionType: inputs[1].value,
        location: inputs[4].value,
        area: inputs[5].value,
        price: inputs[6].value,
        phone: inputs[7].value,
        desc: inputs[8].value
      };

      send('service_axjqgar', 'template_peshgyk', data).then(
        function () {
          setIsSuccess(true);
          handleClearForm(InitialState);
          loader.classList.add('hidden');
        },
        function (err) {
          setIsSuccess(false);
          console.log(err);
          setResError({
            status: err.status,
            isOfflineError: !navigator.onLine
          });
          loader.classList.add('hidden');
        }
      );
      // @ts-ignore
    } catch (e: Error) {
      setIsSuccess(false);
      setResError({
        status: e.status,
        isOfflineError: !navigator.onLine
      });
      loader.classList.add('hidden');
    }
  };

  // @ts-ignore
  const metaSchema = {
    name: 'Zgłoś Nieruchomości do Agenta - Marcin Kumiszczo',
    alternateName: 'Zgłoś Nieruchomości do Agenta',
    description: 'Chcesz sprzedać lub wynająć nieruchomość we Wrocławiu lub okolicach. Zgłoś ją do mnie. Ponad 100 sprzedanych nieruchomości i 4 lata działalności na rynku. Marcin Kumisczo, Agent Nieruchomości, Wrocław, Wrocław i okolice, okolice Wrocławia',
    keywords: '',
    datePublished: "2024-02-10T15:35:23+00:00",
    dateModified: "2024-02-10T15:35:23+00:00",
    image: "https://marcinkumiszczo.pl/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmarcin-kumiszczo-siedzacy-w-samochodzie.ae5c6388.png&w=640&q=75"
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
        <title>Zgłoś Nieruchomości do Agenta Wrocław - Marcin Kumiszczo | Markum - Twój Dom</title>
        <meta name='description' content='Chcesz sprzedać lub wynająć nieruchomość we Wrocławiu lub okolicach. Zgłoś ją do mnie. Ponad 100 sprzedanych nieruchomości i 4 lata działalności na rynku. Marcin Kumisczo, Agent Nieruchomości, Wrocław, Wrocław i okolice, okolice Wrocławia' />
        <meta property='og:title' content='Zgłoś Nieruchomości do Agenta - Marcin Kumiszczo | Markum - Twój Dom' />
        <meta property='og:description' content='Chcesz sprzedać lub wynająć nieruchomość we Wrocławiu lub okolicach. Zgłoś ją do mnie. Ponad 100 sprzedanych nieruchomości i 4 lata działalności na rynku. Marcin Kumisczo, Agent Nieruchomości, Wrocław, Wrocław i okolice, okolice Wrocławia' />
        <meta property='og:site_name' content='Zgłoś Nieruchomości do Agenta - Wrocław' />
        <meta property='og:type' content='website' />
        <meta property='og:url' content={`${process.env.DOMAIN}/zglos-nieruchomosc`} />
        <meta property='og:image' content={`${process.env.DOMAIN}/next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmarcin-kumiszczo-siedzacy-w-samochodzie.ae5c6388.png&w=640&q=75`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>
      <ShortDesc title="Zgłoś Nieruchomość" desc="Z tej strony Marcin Kumiszczo, pomagam skutecznie sprzedawać nieruchomości i znajdować najemców we Wrocławiu i okolicach. <b>W branży mam już 4 lata doświadczenia i sprzedałem ponad 100 nieruchomości.</b> Zgłoś swoją nieruchomość, a ja zadbam o resztę." images={{ desktop: agentWSamochodzie, phone: 'marcin-kumiszczo-siedzacy-w-samochodzie.webp' }} height="323px"></ShortDesc>
      <section className="report-estate">
        <form
          className="report-estate__form"
          onSubmit={(e: SubmitFormEvent) => handleSubmitForm(e, handleSendEmail)}
        >
          <div className="grid md:flex flex-wrap gap-x-5 gap-y-4 sm2:gap-y-7">
            <div className="report-estate__input-box">
              <Select id="estate-type-select" inputProps={{ 'data-id': "estate-type-select", 'data-placeholder': "Typ nieruchomości" }} className={`${styleInput.SelectInput}`} value={estateType} onChange={(e: SelectChangeEvent) => handleSelectInputChange(e, "Typ nieruchomości", "estate-type-select")} data-required="true" name="estateType">
                <MenuItem value={'Typ nieruchomości'}>Typ nieruchomości</MenuItem>
                <MenuItem value={'Dom'}>Dom</MenuItem>
                <MenuItem value={'Mieszkanie'}>Mieszkanie</MenuItem>
                <MenuItem value={'Działka'}>Działka</MenuItem>
                <MenuItem value={'Komercyjny'}>Komercyjny</MenuItem>
              </Select>
              {errorsInputs && errorsInputs.estateType !== '' ? (
                <p className={`${stylesFooter.errorP} mt-3`} id="error-estateType">
                  {errorsInputs.estateType}
                </p>
              ) : (
                ''
              )}
            </div>
            <div className="report-estate__input-box">
              <Select id="transaction-type-select" inputProps={{ 'data-id': "transaction-type-select", 'data-placeholder': "Typ transakcji" }} className={`${styleInput.SelectInput}`} value={transactionType} onChange={(e: SelectChangeEvent) => handleSelectInputChange(e, "Typ transakcji", "transaction-type-select")} data-required="true" name="transactionType">
                <MenuItem value={'Typ transakcji'}>Typ transakcji</MenuItem>
                <MenuItem value={'sprzedaż'}>sprzedaż</MenuItem>
                <MenuItem value={'wynajem'}>wynajem</MenuItem>
              </Select>
              {errorsInputs && errorsInputs.transactionType !== '' ? (
                <p className={`${stylesFooter.errorP} mt-3`} id="error-transactionType">
                  {errorsInputs.transactionType}
                </p>
              ) : (
                ''
              )}
            </div>
            <div className="report-estate__input-box">
              <input
                type="text"
                name="fullName"
                className={`${styleInput.Input}`}
                value={fullName}
                onChange={handleInputChange}
                placeholder="Imię i nazwisko"
                data-required="true"
              />
              {errorsInputs && errorsInputs.fullName !== '' ? (
                <p className={`${stylesFooter.errorP} mt-3`} id="error-fullName">
                  {errorsInputs.fullName}
                </p>
              ) : (
                ''
              )}
            </div>
            <div className="report-estate__input-box">
              <input
                type="email"
                name="email"
                className={`${styleInput.Input}`}
                value={email}
                onChange={handleInputChange}
                placeholder="Adres email"
                data-required="true"
              />
              {errorsInputs && errorsInputs.email !== '' ? (
                <p
                  className={`${stylesFooter.errorP} mt-3`}
                  id="error-email"
                >
                  {errorsInputs.email}
                </p>
              ) : (
                ''
              )}
            </div>
            <div className="report-estate__input-box">
              <input
                type="text"
                name="location"
                className={`${styleInput.Input}`}
                value={location}
                onChange={handleInputChange}
                placeholder="Lokalizacja"
                data-required="true"
              />
              {errorsInputs && errorsInputs.location !== '' ? (
                <p className={`${stylesFooter.errorP} mt-3`} id="error-location">
                  {errorsInputs.location}
                </p>
              ) : (
                ''
              )}
            </div>
            <div className="report-estate__input-box">
              <input
                type="text"
                name="area"
                className={`${styleInput.Input}`}
                value={area}
                onChange={handleInputChange}
                placeholder="Powierzchnia [m²]"
                data-required="true"
              />
              {errorsInputs && errorsInputs.area !== '' ? (
                <p className={`${stylesFooter.errorP} mt-3`} id="error-area">
                  {errorsInputs.area}
                </p>
              ) : (
                ''
              )}
            </div>
            <div className="report-estate__input-box">
              <input
                type="text"
                name="price"
                className={`${styleInput.Input}`}
                value={price}
                onChange={handleInputChange}
                placeholder="Cena [PLN]"
                data-required="true"
              />
              {errorsInputs && errorsInputs.price !== '' ? (
                <p className={`${stylesFooter.errorP} mt-3`} id="error-price">
                  {errorsInputs.price}
                </p>
              ) : (
                ''
              )}
            </div>
            <div className="report-estate__input-box">
              <input
                type="tel"
                name="phone"
                className={`${styleInput.Input}`}
                value={phone}
                onChange={handleInputChange}
                placeholder="Telefon"
                data-required="true"
              />
              {errorsInputs && errorsInputs.phone !== '' ? (
                <p className={`${stylesFooter.errorP} mt-3`} id="error-phone">
                  {errorsInputs.phone}
                </p>
              ) : (
                ''
              )}
            </div>
          </div>
          <textarea
            name="description"
            className={`${styleInput.Input} textarea-contact`}
            value={description}
            onChange={handleInputChange}
            placeholder="Opis lub uwagi"
            data-required="false"
          />
          <Checkbox
            className="flex gap-2 items-center"
            opt="report-estate-agree"
            handleThrowError={handleThrowError}
          >
            <span className="text-sm xs:text-base sm2:text-lg lg:text-xl">
              Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z&nbsp;
            </span>
            <TextLink
              className="text-sm xs:text-base sm2:text-lg lg:text-xl"
              isRouterLink
              to="/polityka-prywatnosci"
            >
              Polityką Prywatności
            </TextLink>
          </Checkbox>
          {errorsInputs && errorsInputs.checked !== '' ? (
            <p className={`${stylesFooter.errorP} !row-start-4 col-start-1`} id="error-check">
              {errorsInputs.checked}
            </p>
          ) : (
            ''
          )}
          <TextButton classNames={`!py-2 !px-5 !text-lg xs:!text-xl relative`} type={BtnTypes.SUBMIT}>
            <span>Wyślij</span>
            <div className={`report-estate__loader hidden`} ref={loaderWrapper}>
              <svg viewBox="25 25 50 50" className="loader-svg">
                <circle cx="50" cy="50" r="20" />
              </svg>
            </div>
          </TextButton>
          {isSuccess !== undefined ? (
            <ResponseP
              isSuccess={isSuccess}
              error={ResError}
              message="Dziękuję za zgłoszenie nieruchomości. Odpowiem jak najszybciej to możliwe :)."
            />
          ) : (
            ''
          )}
        </form>
      </section>
    </>
  );
};

export default ReportEstate;