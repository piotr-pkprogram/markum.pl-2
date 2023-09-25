import type { NextPage } from 'next';
import mKumiszczoPng from 'public/img/marcin-kumiszczo-agent-nieruchomosci.png';
import { values } from 'src/data/values';
import Image from 'next/image';
import React from 'react';
import agentNieruchomosci from 'public/img/agent-nieruchomosci-wroclaw.png';
import Head from 'next/head';
// @ts-ignore
import loadable from '@loadable/component';

const ShortDesc = loadable(() => import('src/components/molecules/ShortDesc/ShortDesc'));

const AboutMe: NextPage = () => {
  return (
    <>
      <Head>
        <title>O Mnie | Markum - Twój Dom</title>
        <meta
          name="description"
          content="Cześć, chcesz dowiedzieć się więcej o mnie i zobacz dlaczego warto mi zaufać, jeśli zastaniawiasz nad kupnem lub sprzedażą nieruchomości na rynku Wrocławskim. Zajrzyj tutaj. Serdecznie Zapraszam."
        />
        <meta property="og:title" content="O Mnie | Markum - Twój Dom" />
        <meta
          property="og:description"
          content="Cześć, chcesz dowiedzieć się więcej o mnie i zobacz dlaczego warto mi zaufać, jeśli zastaniawiasz nad kupnem lub sprzedażą nieruchomości na rynku Wrocławskim. Zajrzyj tutaj. Serdecznie Zapraszam."
        />
        <meta property="og:site_name" content="O Mnie" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${process.env.DOMAIN}/o-mnie`} />
        <meta
          property="og:image"
          content={`${process.env.DOMAIN}/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.2f16cc6a.png&w=256&q=75`}
        />
      </Head>
      <ShortDesc
        title="O Mnie"
        desc="Jestem agentem nieruchomości dbającym o wysoki profesjonalizm i jakość wykonywanych usług. Wierzę, że najlepszą reklamą są zadowoleni klienci, dlatego w swojej pracy kieruję się wartościami, które pomogą mi doprowadzić do sytuacji <b>win-win</b>, gdzie zarówno ja, jak i Ty będziemy zadowoleni."
        images={{ desktop: mKumiszczoPng, phone: 'marcin-kumiszczo-agent-nieruchomosci.jpg' }}
        height="303px"
      />
      <section className="main-benefits !bg-white !p-6">
        <div className="main-benefits__title-wrapper">
          <h2 className="main-benefits__title sm:text-5xl sm:font-semibold">Moje wartości</h2>
        </div>
        <div className="main-benefits__wrapper !pr-0">
          {values.map((value, index) => (
            <div
              key={`benefit-${index}`}
              className={`main-benefits__benefit ${index > 2 ? `sm:row-start-2 sm:col-start-${index - 2}` : ''
                }`}
            >
              <div style={{ height: '102px', width: '102px' }}>
                <Image src={value.svg} alt="" />
              </div>
              <span className="main-benefits__benefit-name !font-bold xs:text-2xl">
                {value.name}
              </span>
            </div>
          ))}
        </div>
      </section>
      <section className="about-section">
        <div className="about-section__main-desc">
          <Image src={agentNieruchomosci} alt="" loading="lazy" placeholder="blur" />
          <div className="about-section__personal">
            <h3 className="about-section__title">Marcin Kumiszczo</h3>
            <span className="about-section__span">Agent Nieruchomości</span>
            <p className="text-lg">
              Praca jako pośrednik w obrocie nieruchomościami jest dla mnie wyzwaniem, która pomaga mi się realizować spełniając swoje marzenia i pragnienia innych ludzi. Doświadczenie zdobyte w pracy trenera personalnego nauczyło mnie  budować relacje z drugim człowiekiem, wsłuchiwać się w jego oczekiwania i realizować wyznaczony cel.
              <br />
              <br />
              Specjalizuję się w sprzedaży mieszkań oraz zarządzaniu najmem długoterminowym nieruchomości.
              Współpracuje z inwestorami przeprowadzając ich przez cały proces: od zbadania potrzeb i możliwości, pomoc w uzyskaniu finansowania, wybór oraz zakup nieruchomości, przystosowanie do wynajmu, znalezienie najemców, zarządzanie najmem.
            </p>
          </div>
        </div>
        <p className="about-section__desc">
          Pomagam sprzedać nieruchomość przejmując wszystkie niezbędne obowiązki mające na celu do doprowadzenia do transakcji, jak najszybciej i jak najdrożej.
          Jestem licencjonowanym pośrednikiem i certyfikowanym negocjatorem na rynku nieruchomości.
          Od ponad 20 lat uprawiam sport, który stał się moją pasją, a starty w zawodach biegowych czy triathlonowych dają dużo satysfakcji i uczą pokory.
          <br />
          <br />
          <b>W swojej pracy kieruję się profesjonalizmem, bezpieczeństwem i zasadą win-win.</b>{' '}
          Chętnie pomagam i służę innym. <br />
          <br />
          <b>Moje motto:</b>{' '}
          <i>
            „Jeśli nie możesz latać, biegnij. Jeśli nie możesz biec, idź. Jeśli nie możesz chodzić,
            czołgaj się. Ale bez względu na wszystko – posuwaj się naprzód.”
          </i>
        </p>
      </section>
    </>
  );
};

export default AboutMe;
