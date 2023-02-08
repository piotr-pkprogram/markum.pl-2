import React from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import Image from 'next/image';
import styles from './ErrorBox.module.scss';
import errorServer from 'public/img/error.png';
import offline from 'public/img/web.png';

const ErrorBox = ({ error }: { error: FetchBaseQueryError }) => {
  if (error && navigator.onLine)
    return (
      <div className={styles.warpper}>
        <div className={styles.img}>
          <Image src={offline} alt="" />
        </div>
        <span>
          Wystąpił błąd{' '}
          {Number.isInteger(error.status)
            ? error.status
            : 'originalStatus' in error
            ? error.originalStatus
            : 500}
        </span>
        <span>Nie mozna wczytać nieruchomości</span>
        <span>Prosimy odświeżyć stronę później.</span>
      </div>
    );
  else if (error)
    return (
      <div className={styles.warpper}>
        <div className={styles.img}>
          <Image src={errorServer} alt="" />
        </div>
        <span>Brak Połączenia</span>
        <span>Nie mozna wczytać nieruchomości</span>
        <span>Prosimy połączyć się z internetm i odświeżyć stronę.</span>
      </div>
    );
  else return null;
};

export default ErrorBox;
