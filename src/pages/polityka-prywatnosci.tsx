import type { NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
// @ts-ignore
import loadable from '@loadable/component';

const TextLink = loadable(() => import('src/components/atoms/TextLink/TextLink'));

const PrivacyPolicy: NextPage = () => {
  return (
    <>
      <Head>
        <title>Polityka Prywatności | Markum - Twój Dom</title>
        <meta
          name="description"
          content="Polityka prywatności opisuje zasady przetwarzania przez nas informacji na Twój temat, w tym danych osobowych oraz ciasteczek, czyli tzw. cookies."
        />
        <meta property="og:title" content="Polityka Prywatności | Markum - Twój Dom" />
        <meta name="robots" content="noindex" />
        <meta
          property="og:description"
          content="Polityka prywatności opisuje zasady przetwarzania przez nas informacji na Twój temat, w tym danych osobowych oraz ciasteczek, czyli tzw. cookies."
        />
        <meta property="og:site_name" content="Polityka Prywatności" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${process.env.DOMAIN}/polityka-prywatnosci`} />
        <meta
          property="og:image"
          content={`${process.env.DOMAIN}/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.2f16cc6a.png&w=256&q=75`}
        />
      </Head>
      <section className="privacy-policy">
        <h1 className="privacy-policy__title">Polityka Prywatności</h1>

        <div className="privacy-policy__content">
          <h2 className="privacy-policy__subtitle">
            <strong>1. Informacje ogólne</strong>
          </h2>
          <ol className="privacy-policy__list">
            <li>
              Niniejsza polityka dotyczy Serwisu www, funkcjonującego pod adresem url:{' '}
              <b>marcinkumiszczo.pl</b>
            </li>
            <li>
              Operatorem serwisu oraz Administratorem danych osobowych jest: Marcin Kumiszczo
              Stacyjna 1/4 Wrocław 53-613
            </li>

            <li>Adres kontaktowy poczty elektronicznej operatora: markumtwojdom@gmail.com</li>

            <li>
              Operator jest Administratorem Twoich danych osobowych w odniesieniu do danych podanych
              dobrowolnie w Serwisie.
            </li>
            <li>Serwis wykorzystuje dane osobowe w następujących celach:</li>
            <ul className="privacy-policy__list privacy-policy__list--unnumber-list">
              <li>Prowadzenie systemu ogłoszeń drobnych</li>
              <li>Obsługa zapytań przez formularz</li>
              <li>Realizacja zamówionych usług</li>
              <li>Prezentacja oferty lub informacji</li>
            </ul>
            <li>
              Serwis realizuje funkcje pozyskiwania informacji o użytkownikach i ich zachowaniu w
              następujący sposób:
              <ol className="privacy-policy__list privacy-policy__list--sub-list">
                <li>
                  Poprzez dobrowolnie wprowadzone w formularzach dane, które zostają wprowadzone do
                  systemów Operatora.
                </li>
                <li>
                  Poprzez zapisywanie w urządzeniach końcowych plików cookie (tzw. „ciasteczka”).
                </li>
              </ol>
            </li>
          </ol>
          <h2 className="privacy-policy__subtitle">
            <strong>2. Wybrane metody ochrony danych stosowane przez Operatora</strong>
          </h2>
          <ol className="privacy-policy__list">
            <li>
              Miejsca wprowadzania danych osobowych są chronione w warstwie transmisji (certyfikat
              SSL). Dzięki temu dane osobowe i dane logowania, wprowadzone na stronie, zostają
              zaszyfrowane w komputerze użytkownika i mogą być odczytane jedynie na docelowym
              serwerze.
            </li>
            <li>Operator okresowo zmienia swoje hasła administracyjne.</li>
            <li>
              Istotnym elementem ochrony danych jest regularna aktualizacja wszelkiego
              oprogramowania, wykorzystywanego przez Operatora do przetwarzania danych osobowych, co
              w szczególności oznacza regularne aktualizacje komponentów programistycznych.
            </li>
          </ol>
          <h2 className="privacy-policy__subtitle">
            <strong>3. Hosting</strong>
          </h2>
          <ol className="privacy-policy__list">
            <li>
              Serwis jest hostowany (technicznie utrzymywany) na serwera operatora: www.netlify.com
            </li>
            <li>
              Pod adresem{' '}
              <TextLink
                className="privacy-policy__link"
                isExternalLink
                to="https://www.netlify.com/l"
              >
                https://www.netlify.com/
              </TextLink>{' '}
              możesz dowiedzieć się więcej o hostingu i sprawdzić politykę prywatności firmy
              hostingowej.
            </li>
            <li>
              Firma hostingowa:
              <ul className="privacy-policy__list privacy-policy__list--unnumber-list">
                <li>
                  stosuje środki ochrony przed utratą danych (np. macierze dyskowe, regularne kopie
                  bezpieczeństwa),
                </li>
                <li>
                  stosuje adekwatne środki ochrony miejsc przetwarzania na wypadek pożaru (np.
                  specjalne systemy gaśnicze),
                </li>
                <li>
                  stosuje adekwatne środki ochrony systemów przetwarzania na wypadek nagłej awarii
                  zasilania (np. podwójne tory zasilania, agregaty, systemy podtrzymania napięcia
                  UPS),
                </li>
                <li>
                  stosuje środki fizycznej ochrony dostępu do miejsc przetwarzania danych (np.
                  kontrola dostępu, monitoring),
                </li>
                <li>
                  stosuje środki zapewnienia odpowiednich warunków środowiskowych dla serwerów jako
                  elementów systemu przetwarzania danych (np. kontrola warunków środowiskowych,
                  specjalistyczne systemy klimatyzacji),
                </li>
                <li>
                  stosuje rozwiązania organizacyjne dla zapewnienia możliwie wysokiego stopnia
                  ochrony i poufności (szkolenia, wewnętrzne regulaminy, polityki haseł itp.),
                </li>
                <li>powołała Inspektora Ochrony Danych.</li>
              </ul>
            </li>
          </ol>
          <h2 className="privacy-policy__subtitle">
            <strong>4. Twoje prawa i dodatkowe informacje o sposobie wykorzystania danych</strong>
          </h2>
          <ol className="privacy-policy__list">
            <li>
              W niektórych sytuacjach Administrator ma prawo przekazywać Twoje dane osobowe innym
              odbiorcom, jeśli będzie to niezbędne do wykonania zawartej z Tobą umowy lub do
              zrealizowania obowiązków ciążących na Administratorze. Dotyczy to takich grup
              odbiorców:
              <ul className="privacy-policy__list privacy-policy__list--unnumber-list">
                <li>firma hostingowa na zasadzie powierzenia</li>
                <li>kancelarie prawne i windykatorzy</li>
                <li>
                  upoważnieni pracownicy i współpracownicy, którzy korzystają z danych w celu
                  realizacji celu działania strony
                </li>
              </ul>
            </li>
            <li>
              Twoje dane osobowe są przetwarzane przez Administratora nie dłużej, niż jest to
              konieczne do wykonania związanych z nimi czynności określonych osobnymi przepisami
              (np. o prowadzeniu rachunkowości). W odniesieniu do danych marketingowych dane nie
              będą przetwarzane dłużej niż przez 3 lata.
            </li>
            <li>
              Przysługuje Ci prawo żądania od Administratora:
              <ul className="privacy-policy__list privacy-policy__list--unnumber-list">
                <li>dostępu do danych osobowych Ciebie dotyczących,</li>
                <li>ich sprostowania,</li>
                <li>usunięcia,</li>
                <li>ograniczenia przetwarzania,</li>
                <li>oraz przenoszenia danych.</li>
              </ul>
            </li>
            <li>
              Przysługuje Ci prawo do złożenia sprzeciwu w zakresie przetwarzania wskazanego w pkt
              3.3 c) wobec przetwarzania danych osobowych w celu wykonania prawnie uzasadnionych
              interesów realizowanych przez Administratora, w tym profilowania, przy czym prawo
              sprzeciwu nie będzie mogło być wykonane w przypadku istnienia ważnych prawnie
              uzasadnionych podstaw do przetwarzania, nadrzędnych wobec Ciebie interesów, praw i
              wolności, w szczególności ustalenia, dochodzenia lub obrony roszczeń.
            </li>
            <li>
              Na działania Administratora przysługuje skarga do Prezesa Urzędu Ochrony Danych
              Osobowych, ul. Stawki 2, 00-193 Warszawa.
            </li>
            <li>Podanie danych osobowych jest dobrowolne, lecz niezbędne do obsługi Serwisu.</li>
            <li>
              W stosunku do Ciebie mogą być podejmowane czynności polegające na zautomatyzowanym
              podejmowaniu decyzji, w tym profilowaniu w celu świadczenia usług w ramach zawartej
              umowy oraz w celu prowadzenia przez Administratora marketingu bezpośredniego.
            </li>
            <li>
              Dane osobowe nie są przekazywane od krajów trzecich w rozumieniu przepisów o ochronie
              danych osobowych. Oznacza to, że nie przesyłamy ich poza teren Unii Europejskiej.
            </li>
          </ol>
          <h2 className="privacy-policy__subtitle">
            <strong>5. Informacje w formularzach</strong>
          </h2>
          <ol className="privacy-policy__list">
            <li>
              Serwis zbiera informacje podane dobrowolnie przez użytkownika, w tym dane osobowe, o
              ile zostaną one podane.
            </li>
            <li>
              Serwis może zapisać informacje o parametrach połączenia (oznaczenie czasu, adres IP).
            </li>
            <li>
              Serwis, w niektórych wypadkach, może zapisać informację ułatwiającą powiązanie danych
              w formularzu z adresem e-mail użytkownika wypełniającego formularz. W takim wypadku
              adres e-mail użytkownika pojawia się wewnątrz adresu url strony zawierającej
              formularz.
            </li>
            <li>
              Dane podane w formularzu są przetwarzane w celu wynikającym z funkcji konkretnego
              formularza, np. w celu dokonania procesu obsługi zgłoszenia serwisowego lub kontaktu
              handlowego, rejestracji usług itp. Każdorazowo kontekst i opis formularza w czytelny
              sposób informuje, do czego on służy.
            </li>
          </ol>

          <h2 className="privacy-policy__subtitle">
            <strong>6. Istotne techniki marketingowe</strong>
          </h2>
          <ol className="privacy-policy__list">
            <li>
              Operator może stosować profilowanie w rozumieniu przepisów o ochronie danych osobowych
            </li>
          </ol>
          <h2 className="privacy-policy__subtitle">
            <strong>7. Informacja o plikach cookies</strong>
          </h2>
          <ol className="privacy-policy__list">
            <li>Serwis korzysta z plików cookies.</li>
            <li>
              Pliki cookies (tzw. „ciasteczka”) stanowią dane informatyczne, w szczególności pliki
              tekstowe, które przechowywane są w urządzeniu końcowym Użytkownika Serwisu i
              przeznaczone są do korzystania ze stron internetowych Serwisu. Cookies zazwyczaj
              zawierają nazwę strony internetowej, z której pochodzą, czas przechowywania ich na
              urządzeniu końcowym oraz unikalny numer.
            </li>
            <li>
              Podmiotem zamieszczającym na urządzeniu końcowym Użytkownika Serwisu pliki cookies
              oraz uzyskującym do nich dostęp jest operator Serwisu.
            </li>
            <li>
              Pliki cookies wykorzystywane są w następujących celach:
              <ol className="privacy-policy__list privacy-policy__list--sub-list">
                <li>
                  realizacji celów określonych powyżej w części &quot;Istotne techniki marketingowe&quot;;
                </li>
              </ol>
            </li>
            <li>
              W ramach Serwisu stosowane są dwa zasadnicze rodzaje plików cookies: „sesyjne”
              (session cookies) oraz „stałe” (persistent cookies). Cookies „sesyjne” są plikami
              tymczasowymi, które przechowywane są w urządzeniu końcowym Użytkownika do czasu
              wylogowania, opuszczenia strony internetowej lub wyłączenia oprogramowania
              (przeglądarki internetowej). „Stałe” pliki cookies przechowywane są w urządzeniu
              końcowym Użytkownika przez czas określony w parametrach plików cookies lub do czasu
              ich usunięcia przez Użytkownika.
            </li>
            <li>
              Oprogramowanie do przeglądania stron internetowych (przeglądarka internetowa)
              zazwyczaj domyślnie dopuszcza przechowywanie plików cookies w urządzeniu końcowym
              Użytkownika. Użytkownicy Serwisu mogą dokonać zmiany ustawień w tym
              zakresie.&nbsp;Przeglądarka internetowa umożliwia usunięcie plików cookies. Możliwe
              jest także automatyczne blokowanie plików cookies Szczegółowe informacje na ten temat
              zawiera pomoc lub dokumentacja przeglądarki internetowej.
            </li>
            <li>
              Ograniczenia stosowania plików cookies mogą wpłynąć na niektóre funkcjonalności
              dostępne na podstronach Serwisu.
            </li>
            <li>
              Pliki cookies zamieszczane w urządzeniu końcowym Użytkownika Serwisu wykorzystywane
              mogą być również przez współpracujące z operatorem Serwisu podmioty, w szczególności
              dotyczy to firmy Google (Google Inc. z siedzibą w USA).
            </li>
          </ol>
          <h2 className="privacy-policy__subtitle">
            <strong>8. Zarządzanie plikami cookies – jak w praktyce wyrażać i cofać zgodę?</strong>
          </h2>
          <ol className="privacy-policy__list">
            <li>
              Jeśli użytkownik nie chce otrzymywać plików cookies, może zmienić ustawienia
              przeglądarki. Zastrzegamy, że wyłączenie obsługi plików cookies niezbędnych dla
              procesów uwierzytelniania, bezpieczeństwa, utrzymania preferencji użytkownika może
              utrudnić,&nbsp;a w skrajnych przypadkach może uniemożliwić korzystanie ze stron www
            </li>
            <li>
              W celu zarządzania ustawienia cookies wybierz z listy poniżej przeglądarkę
              internetową, której używasz i postępuj zgodnie z instrukcjami:
              <ul className="privacy-policy__list privacy-policy__list--unnumber-list">
                <li>
                  <TextLink
                    className="privacy-policy__link"
                    isExternalLink
                    to="https://support.microsoft.com/pl-pl/help/10607/microsoft-edge-view-delete-browser-history"
                  >
                    Edge
                  </TextLink>
                </li>
                <li>
                  <TextLink
                    className="privacy-policy__link"
                    isExternalLink
                    to="https://support.microsoft.com/pl-pl/help/278835/how-to-delete-cookie-files-in-internet-explorer"
                  >
                    Internet Explorer
                  </TextLink>
                </li>
                <li>
                  <TextLink
                    className="privacy-policy__link"
                    isExternalLink
                    to="http://support.google.com/chrome/bin/answer.py?hl=pl&amp;answer=95647"
                  >
                    Chrome
                  </TextLink>
                </li>
                <li>
                  <TextLink
                    className="privacy-policy__link"
                    isExternalLink
                    to="http://support.apple.com/kb/PH5042"
                  >
                    Safari
                  </TextLink>
                </li>
                <li>
                  <TextLink
                    className="privacy-policy__link"
                    isExternalLink
                    to="http://support.mozilla.org/pl/kb/W%C5%82%C4%85czanie%20i%20wy%C5%82%C4%85czanie%20obs%C5%82ugi%20ciasteczek"
                  >
                    Firefox
                  </TextLink>
                </li>
                <li>
                  <TextLink
                    className="privacy-policy__link"
                    isExternalLink
                    to="http://help.opera.com/Windows/12.10/pl/cookies.html"
                  >
                    Opera
                  </TextLink>
                </li>
              </ul>
              <p>Urządzenia mobilne:</p>
              <ul className="privacy-policy__list privacy-policy__list--unnumber-list">
                <li>
                  <TextLink
                    className="privacy-policy__link"
                    isExternalLink
                    to="http://support.google.com/chrome/bin/answer.py?hl=pl&amp;answer=95647"
                  >
                    Android
                  </TextLink>
                </li>
                <li>
                  <TextLink
                    className="privacy-policy__link"
                    isExternalLink
                    to="httport.apple.com/kb/HT1677?viewlocale=pl_PL"
                  >
                    Safari (iOS)
                  </TextLink>
                </li>
                <li>
                  <TextLink
                    to="http://www.windowsphone.com/pl-pl/how-to/wp7/web/changing-privacy-and-other-browser-settings"
                    className="privacy-policy__link"
                    isExternalLink
                  >
                    Windows Phone
                  </TextLink>
                </li>
              </ul>
            </li>
          </ol>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;
