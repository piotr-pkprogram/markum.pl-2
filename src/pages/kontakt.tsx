import type { NextPage } from 'next';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import posrednik from 'public/img/posrednik-nieruchomosci.jpg';
import styleInput from 'src/components/atoms/Input/Input.module.scss';
import { ContactFormState, FormInput, ResError, SubmitFormEvent } from 'types/FormTypes';
import { useForm } from 'src/hooks/useForm';
import stylesFooter from 'src/components/organisms/Footer/Footer.module.scss';
import { BtnTypes } from 'types/btnTypes';
import Head from 'next/head';
// @ts-ignore
import loadable from '@loadable/component';
import { send } from '@emailjs/browser';

const Logo = loadable(() => import('src/components/atoms/Logo/Logo'));
const TextButton = loadable(() => import('src/components/atoms/TextButton/TextButton'));
const TextLink = loadable(() => import('src/components/atoms/TextLink/TextLink'));
const ResponseP = loadable(() => import('src/components/atoms/ResponseP/ResponseP'));

const InitialState: ContactFormState = {
  name: '',
  topic: '',
  email: '',
  message: ''
};

const Contact: NextPage = () => {
  const {
    // @ts-ignore
    formValues: { name, topic, email, message, errorsInputs },
    handleInputChange,
    handleSubmitForm,
    handleClearForm
  } = useForm(InitialState);
  const loaderWrapper = useRef<HTMLDivElement>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>();
  const [ResError, setResError] = useState<ResError>();

  const handleSendEmail = async (inputs: FormInput[]) => {
    const loader = loaderWrapper.current as HTMLDivElement;
    loader.classList.remove('hidden');
    setIsSuccess(undefined);

    try {
      const data = {
        from: inputs[2].value,
        to: 'markumtwojdom@gmail.com',
        subject: `${inputs[1].value as string}`,
        name: inputs[0].value,
        message: inputs[3].value
      };

      send('service_axjqgar', 'template_gb0j6b9', data).then(
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

  return (
    <>
      <Head>
        <title>Kontakt | Markum - Twój Dom</title>
        <meta name="description" content="" />
        <meta property="og:title" content="Kontakt | Markum - Twój Dom" />
        <meta property="og:description" content="" />
        <meta property="og:site_name" content="Kontakt" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${process.env.DOMAIN}/kontakt`} />
        <meta property="og:image" content={`${process.env.DOMAIN}/kontakt`} />
      </Head>
      <section className="contact-form-and-info">
        <h1 className="contact-form-and-info__title">Skontaktuj się ze&nbsp;mną</h1>
        <div className="contact-form-and-info__wrapper">
          <div className="contact-form-and-info__info">
            <Image src={posrednik} alt="" priority loading="eager" placeholder="blur" />
            <p className="contact-form-and-info__main-info">
              <span>
                Szukasz dla siebie nieruchomości? A&nbsp;może potrzebujesz fachowej pomocy w
                sprzedaży własnej? Z&nbsp;wielką chęcią odpowiem na Twoje pytania. Napisz lub
                zadzwoń.
              </span>
              <span className="font-semibold">
                Marcin Kumiszczo{' '}
                <TextLink className="!text-darkBlue" isExternalLink to="tel:+48730396827">
                  +48 730 396 827
                </TextLink>{' '}
                <TextLink
                  className="!text-darkBlue"
                  isExternalLink
                  to="mailto:markumtwojdom@gmail.com"
                >
                  markumtwojdom@gmail.com
                </TextLink>{' '}
              </span>
            </p>
          </div>
          {/*@ts-ignore*/}
          <form
            className="contact-form-and-info__form"
            onSubmit={(e: SubmitFormEvent) => handleSubmitForm(e, handleSendEmail)}
          >
            <h2 className="contact-form-and-info__form-title">Wyślij Wiadomość</h2>
            <input
              type="text"
              name="name"
              className={`${styleInput.Input} !font-semibold`}
              value={name}
              onChange={handleInputChange}
              placeholder="Imię"
              data-required="true"
            />
            {errorsInputs && errorsInputs.name !== '' ? (
              <p className={`${stylesFooter.errorP} !row-start-3`} id="error-name">
                {errorsInputs.name}
              </p>
            ) : (
              ''
            )}
            <input
              type="text"
              name="topic"
              className={`${styleInput.Input} !font-semibold`}
              value={topic}
              onChange={handleInputChange}
              placeholder="Temat"
              data-required="false"
            />
            <input
              type="email"
              name="email"
              className={`${styleInput.Input} !font-semibold col-start-1 col-end-3`}
              value={email}
              onChange={handleInputChange}
              placeholder="Adres email"
              data-required="true"
            />
            {errorsInputs && errorsInputs.email !== '' ? (
              <p
                className={`${stylesFooter.errorP} col-start-1 col-end-3 !row-start-auto`}
                id="error-email"
              >
                {errorsInputs.email}
              </p>
            ) : (
              ''
            )}
            <textarea
              name="message"
              className={`${styleInput.Input} textarea-contact !font-semibold col-start-1 col-end-3`}
              value={message}
              onChange={handleInputChange}
              placeholder="Wiadomość"
              data-required="false"
            />
            <TextButton classNames={`!py-2 !px-5 !text-xl relative`} type={BtnTypes.SUBMIT}>
              <span>Wyślij</span>
              <div className={`contact-form-and-info__loader hidden`} ref={loaderWrapper}>
                <svg viewBox="25 25 50 50" className="loader-svg">
                  <circle cx="50" cy="50" r="20" />
                </svg>
              </div>
            </TextButton>
            {isSuccess !== undefined ? (
              <ResponseP
                isSuccess={isSuccess}
                error={ResError}
                message="Dziękuję za wysłanie wiadomości. Odpowiem w wolnej chwili :)."
              />
            ) : (
              ''
            )}
          </form>
        </div>
      </section>
      <section className="localisation">
        <div className="grid gap-4">
          <Logo isBig />
          <address className="not-italic">
            Stacyjna 1/4 <br />
            Wrocław 53-613 <br />
            NIP: 123456789
          </address>
        </div>
        <div className="localisation__map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10018.174978184386!2d16.9989296!3d51.1168777!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x8f63273d7e17d420!2sMarkum%20-%20Tw%C3%B3j%20Dom%20Marcin%20Kumiszczo!5e0!3m2!1spl!2spl!4v1646052931530!5m2!1spl!2spl"
            width="100%"
            height="100%"
            style={{ borderWidth: '0' }}
            allowFullScreen
            loading="lazy"
          />
        </div>
      </section>
    </>
  );
};

export default Contact;
