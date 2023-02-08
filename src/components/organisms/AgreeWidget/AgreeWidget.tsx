import React, { useState } from 'react';
import Image from 'next/image';
import close from 'public/img/close(1).png';
import styles from 'src/components/organisms/AgreeWidget/AgreeWidget.module.scss';
import { useCookies } from 'react-cookie';
// @ts-ignore
import loadable from '@loadable/component';

const TextLink = loadable(() => import('src/components/atoms/TextLink/TextLink'));
const TextButton = loadable(() => import('src/components/atoms/TextButton/TextButton'));

const AgreeWidget = () => {
  const [cookies, setCookie] = useCookies(['privacy-policy-agree']);
  const [isVisable, setIsVisable] = useState(true);

  const privacyPolicyAgree = cookies['privacy-policy-agree'];

  return (
    <>
      {!privacyPolicyAgree ? (
        <div className={`${styles.wrapper} ${isVisable ? '' : '!hidden'}`}>
          <span className="text-center">
            Ta strona korzysta z ciasteczek. Dalsze korzystanie ze strony oznacza, że zgadzasz się
            na ich użycie oraz akceptujesz politykę prywatności i politykę cookies.{' '}
          </span>
          <TextLink isRouterLink to="/polityka-prywatnosci">
            Polityka Prywatności
          </TextLink>
          <TextButton
            classNames="!rounded-2xl"
            onClick={() => setCookie('privacy-policy-agree', true)}
          >
            Zgoda
          </TextButton>
          <div className={styles.wrapper__close} onClick={() => setIsVisable(false)}>
            <Image src={close} alt="" width={24} height={24} />
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default AgreeWidget;
