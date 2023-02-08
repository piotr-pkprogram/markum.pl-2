import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { QuestionType } from 'types/questionType';
import arrow from 'public/img/down-arrow.svg';
import styles from './QuestionElement.module.scss';
import deletePolishChars from 'utils/deletePolishChars';
import { textShorted } from 'utils/textShorted';
// @ts-ignore
import loadable from '@loadable/component';

const TextLink = loadable(() => import('src/components/atoms/TextLink/TextLink'));

type Props = {
  question: QuestionType;
  className?: string;
  isMore?: boolean;
};

const QuestionElement = ({ question, className = '', isMore = false }: Props) => {
  const [isAnswerVisable, setIsAnswerVisable] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);
  let answer: string | string[] = '';

  if (isMore) {
    answer = textShorted(question.answer, 360);
  }

  const switchAnswerVisibility = () => {
    const arrow = document.querySelector('#arrow-down');
    const questWrapper = wrapper.current as HTMLDivElement;

    if (isAnswerVisable) {
      arrow?.classList.remove('rotate-90');
      questWrapper.classList.remove('!pb-3');
      setIsAnswerVisable(false);
    } else {
      arrow?.classList.add('rotate-90');
      questWrapper.classList.add('!pb-3');
      setIsAnswerVisable(true);
    }
  };

  return (
    <div
      id={!isMore ? `/faq#${deletePolishChars(question.question).toLowerCase()}` : ''}
      className={`${styles.wrapper} ${className}`}
      ref={wrapper}
    >
      <Image
        id="arrow-down"
        className="transition-transform cursor-pointer"
        src={arrow}
        alt=""
        onClick={switchAnswerVisibility}
      />
      <h3 className="font-semibold text-2xl row-start-1">{question.question}</h3>
      {isAnswerVisable ? (
        <p id="description" className="row-start-2">
          {isMore ? answer : question.answer}{' '}
          {question.answer.length > 360 && isMore ? (
            <TextLink
              isRouterLink
              to={`/faq#${deletePolishChars(question.question).toLowerCase()}`}
            >
              Czytaj więcej...
            </TextLink>
          ) : (
            ''
          )}
        </p>
      ) : (
        ''
      )}
    </div>
  );
};

export default QuestionElement;
