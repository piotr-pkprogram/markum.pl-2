import styles from './ResponseP.module.scss';
import { ResError } from 'types/FormTypes';

type Props = {
  isSuccess: boolean;
  message: string;
  classes?: string;
  error?: ResError;
};

const ResponseP = ({ isSuccess, error, message, classes }: Props) => {
  if (isSuccess)
    return (
      <p id="response" className={`${styles.response} ${classes}`}>
        {message}
      </p>
    );
  else if (error?.isOfflineError)
    return (
      <p id="response" className={`${styles.response} !text-red-500 !border-red-500 ${classes}`}>
        Brak połączenia. Prosimy połączyć się z internetem i wysłać kontakt ponownie.
      </p>
    );
  else
    return (
      <p id="response" className={`${styles.response} !text-red-500 !border-red-500 ${classes}`}>
        Wystąpił błąd {error?.status ? error.status : 500}. Proszę spróbować wysłać kontakt później.
      </p>
    );
};

export default ResponseP;
