import { useEffect, useRef, useState } from 'react';
import pkprogram from 'public/img/pk-program-logo.png';
import Image from 'next/image';
import styles from './Footer.module.scss';
import { BtnTypes } from 'types/btnTypes';
import { FormInput, NamePhoneFormState, SubmitFormEvent, ResError } from 'types/FormTypes';
import { useForm } from 'src/hooks/useForm';
import axios from 'axios';
import styleInput from 'src/components/atoms/Input/Input.module.scss';
import homeLogo from 'public/img/home-logo.jpg';
import { useRouter } from 'next/router';
import certificate from 'public/img/marcin-kumiszczo-stopka-maila.jpg';
import { init, send } from '@emailjs/browser';

import Logo from 'src/components/atoms/Logo/Logo';
import Checkbox from 'src/components/atoms/Checkbox/Checkbox';
import TextLink from 'src/components/atoms/TextLink/TextLink';
import ResponseP from 'src/components/atoms/ResponseP/ResponseP';
import TextButton from 'src/components/atoms/TextButton/TextButton';

const InitialState: NamePhoneFormState = {
  name: '',
  contactPhone: ''
};

const Footer = () => {
  const {
    formValues,
    handleInputChange,
    handleSubmitForm,
    handleThrowError,
    handleClearForm
  } = useForm(InitialState);
  const { name, contactPhone, errorsInputs } = formValues as NamePhoneFormState;
  const loaderWrapper = useRef<HTMLDivElement>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>();
  const [ResError, setResError] = useState<ResError>();
  const [isContactPage, setIsContactPage] = useState<boolean>(false);
  const router = useRouter();
  const [link, setLink] = useState(router.pathname);
  const linkTab = link.split('-');

  init('user_lMRCEmHpYEa191SzKn8aZ');

  useEffect(() => {
    if (router.pathname.includes('kontakt')) setIsContactPage(true);
    else setIsContactPage(false);

    if ('location' in router.query)
      setLink(router.pathname.replace('[location]', `${router.query.location}`));
  }, [router.pathname]);

  const sendContact = async (inputs: FormInput[]) => {
    const loader = loaderWrapper.current as HTMLDivElement;
    loader.classList.remove('hidden');
    setIsSuccess(undefined);

    try {
      await axios.post('/api/send-contact', { inputs });

      const dataEmail = {
        from: 'piotrkulakowski@pk-program.pl',
        to: 'markumtwojdom@gmail.com',
        subject: `${inputs[0].value} zostawił Ci swój kontakt.`,
        name: inputs[0].value,
        phoneNumber: inputs[1].value,
        estateId: linkTab[linkTab.length - 1],
        estateLink: `https://marcinkumiszczo.pl${link}`
      };

      send(
        'service_axjqgar',
        linkTab.length > 2 ? 'template_jtjziqf' : 'template_peshgyk',
        dataEmail
      ).then(
        function () {
          setIsSuccess(true);
          handleClearForm(InitialState);
          loader.classList.add('hidden');
        },
        function (err) {
          setIsSuccess(false);
          setResError({
            status: err.status,
            isOfflineError: !navigator?.onLine
          });
          loader.classList.add('hidden');
        }
      );
      // @ts-ignore
    } catch (e: Error) {
      setIsSuccess(false);
      setResError({
        status: e.status,
        isOfflineError: !navigator?.onLine
      });
      loader.classList.add('hidden');
    }
  };

  return (
    <footer id="kontakt" className="text-darkBlue grid max-w-full">
      {!isContactPage ? (
        <div className={styles.addressAndForm}>
          <address className="grid gap-1 not-italic text-sm normal2:row-start-1 normal2:row-end-3 items-center normal2:justify-items-center">
            <Logo isBig />
            <div className="self-start">
              <p>Stacyjna 1/4 (IV piętro)</p>
              <p>Wrocław 53-613</p>
              <TextLink
                className={`${styles.styledLink} !text-darkBlue !text-sm`}
                isExternalLink
                to="tel:730 396 827"
              >
                Tel. 730 396 827
              </TextLink>
              <TextLink
                className={`${styles.styledLink} !text-darkBlue !text-sm`}
                isExternalLink
                to="mailto:markumtwojdom@gmail.com"
              >
                markumtwojdom@gmail.com
              </TextLink>
            </div>
          </address>
          <form
            className={styles.formWrapper}
            onSubmit={(e: SubmitFormEvent) => handleSubmitForm(e, sendContact)}
          >
            <span className="font-bold text-3xl col-1/3 mb-4">Zostaw Kontakt</span>
            <div className={styles.inputsWrapper}>
              <input
                type="text"
                name="name"
                className={`${styleInput.Input} ${styles.styledInput}`}
                value={name}
                onChange={handleInputChange}
                placeholder="Imię"
                data-required="true"
              />
              <input
                type="tel"
                name="contactPhone"
                className={`${styleInput.Input} ${styles.styledInput}`}
                value={contactPhone}
                onChange={handleInputChange}
                placeholder="Telefon"
                data-required="true"
              />
              <TextButton
                classNames={`${styles.sendBtn} !text-lg xs:!text-xl !py-3 !px-7`}
                type={BtnTypes.SUBMIT}
                isFill
              >
                <span>Zostaw Kontakt</span>
                <div className={`${styles.sendBtn__loader} hidden`} ref={loaderWrapper}>
                  <svg viewBox="25 25 50 50" className="loader-svg">
                    <circle cx="50" cy="50" r="20" />
                  </svg>
                </div>
              </TextButton>
              {errorsInputs && errorsInputs?.name !== '' ? (
                <p className={`${styles.errorP} col-start-1`} id="error-name">
                  {errorsInputs.name}
                </p>
              ) : (
                ''
              )}
              {errorsInputs && errorsInputs.contactPhone !== '' ? (
                <p className={`${styles.errorP} col-start-2`} id="error-phone">
                  {errorsInputs.contactPhone}
                </p>
              ) : (
                ''
              )}
              <Checkbox
                className="col-1/3 row-start-3 flex gap-2 items-center"
                opt="agree"
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
                <p className={`${styles.errorP} !row-start-4 col-start-1`} id="error-check">
                  {errorsInputs.checked}
                </p>
              ) : (
                ''
              )}
            </div>
            {isSuccess !== undefined ? (
              <ResponseP
                isSuccess={isSuccess}
                error={ResError}
                classes="col-1/2"
                message="Dziękuję za zostawienie kontaktu. Oddzwonię w wolnej chwili :)"
              />
            ) : (
              ''
            )}
          </form>
          <div className="normal2:row-start-2 justify-self-start">
            <p>
              Partner biznesowy w grupie <b>Home sp z o.o.</b>
            </p>
            <Image
              src={homeLogo}
              alt="Home sp z o.o."
              width="240px"
              height="144px"
              loading="lazy"
            />
          </div>
          <div className="lg2:row-start-2 lg2:col-start-3 normal2:row-start-3 normal2:col-start-1 normal2:col-end-3 justify-self-start">
            <Image
              className="rounded-md"
              src={certificate}
              alt="Certyfikowany Negocjator Na Rynku Nieruchomości"
              height="180px"
              loading="lazy"
            />
          </div>
        </div>
      ) : (
        ''
      )}
      <div className={styles.basicInfo}>
        <span>{new Date().getFullYear()} Markum - Twój Dom | Wszystkie prawa zastrzeżone</span>
        <TextLink
          className={`${styles.styledLink} !text-darkBlue !text-sm`}
          isRouterLink
          to="/polityka-prywatnosci"
        >
          Polityka Prywatności
        </TextLink>
        <TextLink
          className={`${styles.styledLink} !text-darkBlue !text-sm sm:justify-self-end`}
          isExternalLink
          to="https://pk-program.pl/"
        >
          <Image src={pkprogram} alt="Wykonawca: PK Program" width="41" height="22" />
          <span>Made by PK Program</span>
        </TextLink>
      </div>
    </footer>
  );
};

export default Footer;
