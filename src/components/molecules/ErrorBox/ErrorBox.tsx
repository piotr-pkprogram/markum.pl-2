import Image from 'next/image';
import styles from './ErrorBox.module.scss';
import errorServer from 'public/img/error.png';
import offline from 'public/img/web.png';
import notFound from 'public/img/no-results.svg';
import TextButton from 'src/components/atoms/TextButton/TextButton';

export type ServerError = {
  statusCode: number;
  originalStatus?: number;
  message?: string;
}

const ErrorBox = ({ error }: { error: ServerError }) => {
  console.log(error);

  if (error && error.statusCode != 404) {
    return (
      <div className={styles.warpper}>
        <div className={styles.img}>
          <Image src={errorServer} alt="" />
        </div>
        <span>
          Wystąpił błąd{' '}
          {Number.isInteger(error.statusCode)
            ? error.statusCode
            : 'originalStatus' in error
              ? error.originalStatus
              : 500}
        </span>
        <span>Nie mozna wczytać nieruchomości</span>
        <span>Prosimy odświeżyć stronę później.</span>
      </div>
    );
  } else if (error && error.statusCode == 404) {
    return (
      <div className={styles.warpper}>
        <div className={styles.img}>
          <Image src={notFound} alt="" />
        </div>
        <span>
          Wystąpił błąd{' '}
          {error.statusCode}
        </span>
        <span>Niestety nie znaleziono takiej strony</span>
        <span>Zapraszam jednak na przejście na stronę główną i sprawdzenie innych podstron.</span>
        <TextButton classNames="m-3" to={'/'} isFill isRouterLink>Strona Główna</TextButton>
        <span>Jeśli szukasz oferty z nieruchomościami na wynajem lub na sprzedaż to przejdź na:</span>
        <TextButton classNames="m-3" to={'/nieruchomosci/na-sprzedaz'} isFill isRouterLink>Nieruchomości</TextButton>
      </div>
    );
  } else if (error)
    return (
      <div className={styles.warpper}>
        <div className={styles.img}>
          <Image src={offline} alt="" />
        </div>
        <span>Brak Połączenia</span>
        <span>Nie mozna wczytać nieruchomości</span>
        <span>Prosimy połączyć się z internetm i odświeżyć stronę.</span>
      </div>
    );
  else return null;
};

export default ErrorBox;
