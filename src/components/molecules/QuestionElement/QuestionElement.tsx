import React, { useRef, useState } from 'react';
import { QuestionType } from 'types/questionType';
import styles from './QuestionElement.module.scss';
import deletePolishChars from 'utils/deletePolishChars';
import parseHTML from 'html-react-parser';

type Props = {
  question: QuestionType;
  className?: string;
};

const QuestionElement = ({ question, className = '' }: Props) => {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);
  const arrowEl = useRef<HTMLImageElement>(null);

  const switchAnswerVisibility = () => {
    const questArrow = arrowEl.current as HTMLImageElement;
    const questWrapper = wrapper.current as HTMLDivElement;

    if (isAnswerVisible) {
      questArrow?.classList.remove('rotate-90');
      questWrapper.classList.remove('!pb-3');
      setIsAnswerVisible(false);
    } else {
      questArrow?.classList.add('rotate-90');
      questWrapper.classList.add('!pb-3');
      setIsAnswerVisible(true);
    }
  };

  return (
    <div
      id={deletePolishChars(question.question).toLowerCase().replace("?", "")}
      className={`${styles.wrapper} ${className}`}
      ref={wrapper}
      onClick={switchAnswerVisibility}
    >
      <img
        id="arrow-down"
        className="transition-transform cursor-pointer"
        src={'/img/down-arrow.svg'}
        alt=""
        ref={arrowEl}
      />
      <h3 className="font-semibold text-2xl row-start-1">{question.question}</h3>
      {isAnswerVisible ? (
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
