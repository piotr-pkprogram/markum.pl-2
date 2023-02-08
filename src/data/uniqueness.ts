import shield from 'public/img/shield.svg';
import deal from 'public/img/deal.svg';
import handshake from 'public/img/handshake.svg';
import clock from 'public/img/clock.svg';
import { v4 as uuidv4 } from 'uuid';

export const uniqueness = [
  {
    id: uuidv4(),
    icon: shield,
    name: 'Gwarancja bezpieczeństwa',
    desc: 'Zapewniam bezpieczeństwo przeprowadzenia transakcji, tak aby przebiegła ona zgodnie z ustaleniami.'
  },
  {
    id: uuidv4(),
    icon: deal,
    name: 'Bliski kontakt z&nbsp;klientem',
    desc: 'Podczas współpracy masz mnie na wyłączność i w każdym momencie możesz napisać lub zadzwonić.'
  },
  {
    id: uuidv4(),
    icon: handshake,
    name: 'Sprzedaję szybko i&nbsp;drogo',
    desc: 'Jako certyfikowany negocjator na rynku nieruchomości potrafię wynegocjować dla Ciebie najlepsze warunki.'
  },
  {
    id: uuidv4(),
    icon: clock,
    name: 'Oszczędzam twój czas',
    desc: 'Współpracuję także z fotografem, notariuszem lub prawnikiem, po to aby jak najbardziej uwolnić Twój czas.'
  }
];
