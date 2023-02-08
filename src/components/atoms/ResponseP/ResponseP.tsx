import React from 'react';
import styles from './ResponseP.module.scss';
import { ResError } from 'types/FormTypes';

type Props = {
  isSuccess: boolean;
  message: string;
  error?: ResError;
};

const ResponseP = ({ isSuccess, error, message }: Props) => {
  if (isSuccess)
    return (
      <p id="response" className={styles.response}>
        {message}
      </p>
    );
  else if (error?.isOfflineError)
    return (
      <p id="response" className={`${styles.response} !text-red-500 !border-red-500`}>
        Brak połączenia. Prosimy połączyć się z internetem i wysłać kontakt ponownie.
      </p>
    );
  else
    return (
      <p id="response" className={`${styles.response} !text-red-500 !border-red-500`}>
        Wystąpił błąd {error?.status ? error.status : 500}. Proszę sprubować wysłać kontakt później.
      </p>
    );
};

export default ResponseP;
