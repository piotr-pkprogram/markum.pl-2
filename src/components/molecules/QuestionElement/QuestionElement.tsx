import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { QuestionType } from 'types/questionType';
import arrow from 'public/img/down-arrow.svg';
import styles from './QuestionElement.module.scss';
import deletePolishChars from 'utils/deletePolishChars';
import parseHTML from 'html-react-parser';

type Props = {
  question: QuestionType;
  className?: string;
  isMore?: boolean;
};

const QuestionElement = ({ question, className = '' }: Props) => {
  const [isAnswerVisable, setIsAnswerVisable] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);

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
      id={deletePolishChars(question.question).toLowerCase().replace("?", "")}
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
        <p id="description" className="row-start-2 pb-7 pr-5">
          {parseHTML(question.answer.replaceAll("\n", "<br>"))}
        </p>
      ) : (
        ''
      )}
    </div>
  );
};

export default QuestionElement;
