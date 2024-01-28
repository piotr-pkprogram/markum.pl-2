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
          <h2 className="privacy-policy__subtitle">Polityka prywatności opisuje zasady przetwarzania przez nas informacji na Twój temat, w tym danych osobowych oraz ciasteczek, czyli tzw. cookies.</h2>
          <h2 className="privacy-policy__subtitle">
            <strong>1. Informacje ogólne</strong>
          </h2>
          <ol className="privacy-policy__list">
            <li>
              Niniejsza polityka dotyczy Serwisu www, funkcjonującego pod adresem url:{' '}
              <b>marcinkumiszczo.pl</b>
            </li>
            <li>Operatorem serwisu oraz Administratorem danych osobowych jest: MARKUM - TWÓJ DOM MARCIN KUMISZCZO ul. Kolista 9, 54-152 Wrocław</li>

            <li>Adres kontaktowy poczty elektronicznej operatora: markumtwojdom@gmail.com</li>

            <li>Operator jest Administratorem Twoich danych osobowych w odniesieniu do danych podanych dobrowolnie w Serwisie.</li>
            <li>Serwis wykorzystuje dane osobowe w następujących celach:</li>
            <ul className="privacy-policy__list privacy-policy__list--unnumber-list">
              <li>Obsługa zapytań przez formularz</li><li>Realizacja zamówionych usług</li><li>Prezentacja oferty lub informacji</li>
            </ul>
            <li>Serwis realizuje funkcje pozyskiwania informacji o użytkownikach i ich zachowaniu w następujący sposób:
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
            <li>Miejsca logowania i wprowadzania danych osobowych są chronione w warstwie transmisji (certyfikat SSL). Dzięki temu dane osobowe i dane logowania, wprowadzone na stronie, zostają zaszyfrowane w komputerze użytkownika i mogą być odczytane jedynie na docelowym serwerze.</li><li>Dane osobowe przechowywane w bazie danych są zaszyfrowane w taki sposób, że jedynie posiadający Operator klucz może je odczytać. Dzięki temu dane są chronione na wypadek wykradzenia bazy danych z serwera.</li><li>Hasła użytkowników są przechowywane w postaci hashowanej. Funkcja hashująca działa jednokierunkowo - nie jest możliwe odwrócenie jej działania, co stanowi obecnie współczesny standard w zakresie przechowywania haseł użytkowników.</li><li>W celu ochrony danych Operator regularnie wykonuje kopie bezpieczeństwa.</li><li>Istotnym elementem ochrony danych jest regularna aktualizacja wszelkiego oprogramowania, wykorzystywanego przez Operatora do przetwarzania danych osobowych, co w szczególności oznacza regularne aktualizacje komponentów programistycznych.</li>
          </ol>
          <h2 className="privacy-policy__subtitle">
            <strong>3. Hosting</strong>
          </h2>
          <ol className="privacy-policy__list">
            <li>Serwis jest hostowany (technicznie utrzymywany) na serwerach operatora: cyberFolks.pl</li>
            <li>Firma hostingowa w celu zapewnienia niezawodności technicznej prowadzi logi na poziomie serwera. Zapisowi mogą podlegać:
              <ul className="privacy-policy__list privacy-policy__list--unnumber-list">
                <li>zasoby określone identyfikatorem URL (adresy żądanych zasobów – stron, plików),</li>
                <li>czas nadejścia zapytania,</li>
                <li>czas wysłania odpowiedzi,</li>
                <li>nazwę stacji klienta – identyfikacja realizowana przez protokół HTTP,</li>
                <li>informacje o błędach jakie nastąpiły przy realizacji transakcji HTTP,</li>
                <li>adres URL strony poprzednio odwiedzanej przez użytkownika (referer link) – w przypadku gdy przejście do Serwisu nastąpiło przez odnośnik,</li>
                <li>informacje o przeglądarce użytkownika,</li>
                <li>informacje o adresie IP,</li>
                <li>informacje diagnostyczne związane z procesem samodzielnego zamawiania usług poprzez rejestratory na stronie,</li>
                <li>informacje związane z obsługą poczty elektronicznej kierowanej do Operatora oraz wysyłanej przez Operatora.</li>
              </ul>
            </li>
          </ol>
          <h2 className="privacy-policy__subtitle">
            <strong>4. Twoje prawa i dodatkowe informacje o sposobie wykorzystania danych</strong>
          </h2>
          <ol className="privacy-policy__list">
            <li>W niektórych sytuacjach Administrator ma prawo przekazywać Twoje dane osobowe innym odbiorcom, jeśli będzie to niezbędne do wykonania zawartej z Tobą umowy lub do zrealizowania obowiązków ciążących na Administratorze. Dotyczy to takich grup odbiorców:
              <ul className="privacy-policy__list privacy-policy__list--unnumber-list">
                <li>firma hostingowa na zasadzie powierzenia</li><li>operatorzy pocztowi</li><li>upoważnieni pracownicy i współpracownicy, którzy korzystają z danych w celu realizacji celu działania strony</li><li>firmy, świadczące usługi marketingu na rzecz Administratora</li>
              </ul>
            </li>
            <li>Twoje dane osobowe przetwarzane przez Administratora nie dłużej, niż jest to konieczne do wykonania związanych z nimi czynności określonych osobnymi przepisami (np. o prowadzeniu rachunkowości). W odniesieniu do danych marketingowych dane nie będą przetwarzane dłużej niż przez 3 lata.</li>
            <li>Przysługuje Ci prawo żądania od Administratora:
              <ul className="privacy-policy__list privacy-policy__list--unnumber-list">
                <li>dostępu do danych osobowych Ciebie dotyczących,</li>
                <li>ich sprostowania,</li>
                <li>usunięcia,</li>
                <li>ograniczenia przetwarzania,</li>
                <li>oraz przenoszenia danych.</li>
              </ul>
            </li>
            <li>Przysługuje Ci prawo do złożenia sprzeciwu w zakresie przetwarzania wskazanego w pkt 3.2 wobec przetwarzania danych osobowych w celu wykonania prawnie uzasadnionych interesów realizowanych przez Administratora, w tym profilowania, przy czym prawo sprzeciwu nie będzie mogło być wykonane w przypadku istnienia ważnych prawnie uzasadnionych podstaw do przetwarzania, nadrzędnych wobec Ciebie interesów, praw i wolności, w szczególności ustalenia, dochodzenia lub obrony roszczeń.</li>
            <li>Na działania Administratora przysługuje skarga do Prezesa Urzędu Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa.</li>
            <li>Podanie danych osobowych jest dobrowolne, lecz niezbędne do obsługi Serwisu.</li>
            <li>W stosunku do Ciebie mogą być podejmowane czynności polegające na zautomatyzowanym podejmowaniu decyzji, w tym profilowaniu w celu świadczenia usług w ramach zawartej umowy oraz w celu prowadzenia przez Administratora marketingu bezpośredniego.</li>
            <li>Dane osobowe nie są przekazywane od krajów trzecich w rozumieniu przepisów o ochronie danych osobowych. Oznacza to, że nie przesyłamy ich poza teren Unii Europejskiej.</li>
          </ol>
          <h2 className="privacy-policy__subtitle">
            <strong>5. Informacje w formularzach</strong>
          </h2>
          <ol className="privacy-policy__list">
            <li>Serwis zbiera informacje podane dobrowolnie przez użytkownika, w tym dane osobowe, o ile zostaną one podane.</li>
            <li>Serwis może zapisać informacje o parametrach połączenia (oznaczenie czasu, adres IP).</li>
            <li>Serwis, w niektórych wypadkach, może zapisać informację ułatwiającą powiązanie danych w formularzu z adresem e-mail użytkownika wypełniającego formularz. W takim wypadku adres e-mail użytkownika pojawia się wewnątrz adresu url strony zawierającej formularz.</li>
            <li>Dane podane w formularzu są przetwarzane w celu wynikającym z funkcji konkretnego formularza, np. w celu dokonania procesu obsługi zgłoszenia serwisowego lub kontaktu handlowego, rejestracji usług itp. Każdorazowo kontekst i opis formularza w czytelny sposób informuje, do czego on służy.</li>
          </ol>

          <h2 className="privacy-policy__subtitle">
            <strong>6. Istotne techniki marketingowe</strong>
          </h2>
          <ol className="privacy-policy__list">
            <li>Informacje zachowaniu użytkowników w serwisie mogą podlegać logowaniu. Dane te są wykorzystywane w celu administrowania serwisem.</li>
          </ol>
          <h2 className="privacy-policy__subtitle">
            <strong>7. Istotne techniki marketingowe</strong>
          </h2>
          <ol className="privacy-policy__list">
            <li>Operator stosuje analizę statystyczną ruchu na stronie, poprzez Google Analytics (Google Inc. z siedzibą w USA). Operator nie przekazuje do operatora tej usługi danych osobowych, a jedynie zanonimizowane informacje. Usługa bazuje na wykorzystaniu ciasteczek w urządzeniu końcowym użytkownika. W zakresie informacji o preferencjach użytkownika gromadzonych przez sieć reklamową Google użytkownik może przeglądać i edytować informacje wynikające z plików cookies przy pomocy narzędzia: https://www.google.com/ads/preferences/</li><li>Operator stosuje techniki remarketingowe, pozwalające na dopasowanie przekazów reklamowych do zachowania użytkownika na stronie, co może dawać złudzenie, że dane osobowe użytkownika są wykorzystywane do jego śledzenia, jednak w praktyce nie dochodzi do przekazania żadnych danych osobowych od Operatora do operatorom reklam. Technologicznym warunkiem takich działań jest włączona obsługa plików cookie.</li><li>Operator stosuje korzysta z piksela Facebooka. Ta technologia powoduje, że serwis Facebook (Facebook Inc. z siedzibą w USA) wie, że dana osoba w nim zarejestrowana korzysta z Serwisu. Bazuje w tym wypadku na danych, wobec których sam jest administratorem, Operator nie przekazuje od siebie żadnych dodatkowych danych osobowych serwisowi Facebook. Usługa bazuje na wykorzystaniu ciasteczek w urządzeniu końcowym użytkownika.</li><li>Operator stosuje rozwiązanie badające zachowanie użytkowników poprzez tworzenie map ciepła oraz nagrywanie zachowania na stronie. Te informacje są anonimizowane zanim zostaną przesłane do operatora usługi tak, że nie wie on jakiej osoby fizycznej one dotyczą. W szczególności nagrywaniu nie podlegają wpisywane hasła oraz inne dane osobowe.</li>
          </ol>
          <h2 className="privacy-policy__subtitle">
            <strong>8. Informacja o plikach cookies</strong>
          </h2>
          <ol className="privacy-policy__list">
            <li>Serwis korzysta z plików cookies.</li>
            <li>Pliki cookies (tzw. „ciasteczka”) stanowią dane informatyczne, w szczególności pliki tekstowe, które przechowywane są w urządzeniu końcowym Użytkownika Serwisu i przeznaczone są do korzystania ze stron internetowych Serwisu. Cookies zazwyczaj zawierają nazwę strony internetowej, z której pochodzą, czas przechowywania ich na urządzeniu końcowym oraz unikalny numer.</li>
            <li>Podmiotem zamieszczającym na urządzeniu końcowym Użytkownika Serwisu pliki cookies oraz uzyskującym do nich dostęp jest operator Serwisu.</li>
            <li>Pliki cookies wykorzystywane są w następujących celach:
              <ol className="privacy-policy__list privacy-policy__list--sub-list">
                <li>utrzymanie sesji użytkownika Serwisu (po zalogowaniu), dzięki której użytkownik nie musi na każdej podstronie Serwisu ponownie wpisywać loginu i hasła;</li>
                <li>realizacji celów określonych powyżej w części {`"Istotne techniki marketingowe"`}</li>
              </ol>
            </li>
            <li>W ramach Serwisu stosowane są dwa zasadnicze rodzaje plików cookies: „sesyjne” (session cookies) oraz „stałe” (persistent cookies). Cookies „sesyjne” są plikami tymczasowymi, które przechowywane są w urządzeniu końcowym Użytkownika do czasu wylogowania, opuszczenia strony internetowej lub wyłączenia oprogramowania (przeglądarki internetowej). „Stałe” pliki cookies przechowywane są w urządzeniu końcowym Użytkownika przez czas określony w parametrach plików cookies lub do czasu ich usunięcia przez Użytkownika.</li>
            <li>Oprogramowanie do przeglądania stron internetowych (przeglądarka internetowa) zazwyczaj domyślnie dopuszcza przechowywanie plików cookies w urządzeniu końcowym Użytkownika. Użytkownicy Serwisu mogą dokonać zmiany ustawień w tym zakresie.&nbsp;Przeglądarka internetowa umożliwia usunięcie plików cookies. Możliwe jest także automatyczne blokowanie plików cookies Szczegółowe informacje na ten temat zawiera pomoc lub dokumentacja przeglądarki internetowej.</li>
            <li>Ograniczenia stosowania plików cookies mogą wpłynąć na niektóre funkcjonalności dostępne na stronach internetowych Serwisu.</li>
            <li>Pliki cookies zamieszczane w urządzeniu końcowym Użytkownika Serwisu wykorzystywane mogą być również przez współpracujące z operatorem Serwisu podmioty, w szczególności dotyczy to firm: Google (Google Inc. z siedzibą w USA), Facebook (Facebook Inc. z siedzibą w USA), Twitter (Twitter Inc. z siedzibą w USA).</li>
          </ol>
          <h2 className="privacy-policy__subtitle"><strong>9. Zarządzanie plikami cookies – jak w praktyce wyrażać i cofać zgodę?</strong></h2>
          <ol className="privacy-policy__list">
            <li>Jeśli użytkownik nie chce otrzymywać plików cookies, może zmienić ustawienia przeglądarki. Zastrzegamy, że wyłączenie obsługi plików cookies niezbędnych dla procesów uwierzytelniania, bezpieczeństwa, utrzymania preferencji użytkownika może utrudnić,&nbsp;a w skrajnych przypadkach może uniemożliwić korzystanie ze stron www</li>
            <li>W celu zarządzania ustawienia cookies wybierz z listy poniżej przeglądarkę internetową, której używasz i postępuj zgodnie z instrukcjami:
              <ul className="privacy-policy__list privacy-policy__list--unnumber-list">
                <li><TextLink className="privacy-policy__link" to="https://support.microsoft.com/pl-pl/help/10607/microsoft-edge-view-delete-browser-history" isExternalLink>Edge</TextLink></li>
                <li><TextLink className="privacy-policy__link" to="https://support.microsoft.com/pl-pl/help/278835/how-to-delete-cookie-files-in-internet-explorer" isExternalLink>Internet Explorer</TextLink></li>
                <li><TextLink className="privacy-policy__link" to="http://support.google.com/chrome/bin/answer.py?hl=pl&amp;answer=95647" isExternalLink>Chrome</TextLink></li>
                <li><TextLink className="privacy-policy__link" to="http://support.apple.com/kb/PH5042" isExternalLink>Safari</TextLink></li>
                <li><TextLink className="privacy-policy__link" to="http://support.mozilla.org/pl/kb/W%C5%82%C4%85czanie%20i%20wy%C5%82%C4%85czanie%20obs%C5%82ugi%20ciasteczek" isExternalLink>Firefox</TextLink></li>
                <li><TextLink className="privacy-policy__link" to="http://help.opera.com/Windows/12.10/pl/cookies.html" isExternalLink>Opera</TextLink></li>
              </ul>
              <p>Urządzenia mobilne:</p>
              <ul className="privacy-policy__list privacy-policy__list--unnumber-list">
                <li><TextLink className="privacy-policy__link" to="http://support.google.com/chrome/bin/answer.py?hl=pl&amp;answer=95647" isExternalLink>Android</TextLink></li>
                <li><TextLink className="privacy-policy__link" to="http://support.apple.com/kb/HT1677?viewlocale=pl_PL" isExternalLink>Safari (iOS)</TextLink></li>
                <li><TextLink className="privacy-policy__link" to="http://www.windowsphone.com/pl-pl/how-to/wp7/web/changing-privacy-and-other-browser-settings" isExternalLink>Windows Phone</TextLink></li>
              </ul>
            </li>
          </ol>
        </div>
      </section >
    </>
  );
};

export default PrivacyPolicy;
