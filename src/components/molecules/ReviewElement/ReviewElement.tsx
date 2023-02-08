import React from 'react';
import Image from 'next/image';
import ReactHtmlParser from 'react-html-parser';
import { ReviewType, ReviewTypes } from 'types/reviewType';
import styles from './ReviewElement.module.scss';
import ReactPlayer from 'react-player/lazy';
// @ts-ignore
import loadable from '@loadable/component';

const StarRating = loadable(() => import('src/components/atoms/StarRating/StarRating'));

const ReviewElement = ({ review, className }: { review: ReviewType; className?: string }) => {
  if (review.reviewType === ReviewTypes.text)
    return (
      <div className={`${styles.wrapper} ${className}`}>
        <p className="text-base sm2:col-1/2">
          {ReactHtmlParser(review.review.replaceAll('/n', '<br />'))}
        </p>
        <span className="text-3xl font-medium col-start-1 row-start-2">
          {review.name} {review.surname}
        </span>
        {review.image && review.image !== '' ? (
          <div className="row-start-3 col-start-1 self-end">
            <Image
              src={`https:${review.image}`}
              alt=""
              width={55}
              height={55}
              loading="lazy"
            />
          </div>
        ) : (
          ''
        )}
        <StarRating
          rating={review.rating}
          readonly
          className={`row-start-4 ${
            review.image && review.image !== '' ? 'sm2:row-start-3' : 'sm2:row-start-2'
          } sm2:justify-self-end self-end`}
        />
      </div>
    );
  else
    return (
      <div className={`${styles.wrapper} ${className}`}>
        <ReactPlayer
          style={{
            gridColumn: '1 / 3',
            borderRadius: '25px',
            overflow: 'hidden',
            minHeight: '312px'
          }}
          controls
          url={review.review}
          width="100%"
          height="100%"
        />
        <span className="text-3xl font-medium col-start-1 row-start-2">
          {review.name} {review.surname}
        </span>
        {review.image && review.image !== '' ? (
          <div className="row-start-3 col-start-1 self-end">
            <Image
              src={`https:${review.image}`}
              alt=""
              width={55}
              height={55}
              loading="lazy"
            />
          </div>
        ) : (
          ''
        )}
        <StarRating
          rating={review.rating}
          readonly
          className={`row-start-4 ${
            review.image && review.image !== '' ? 'sm2:row-start-3' : 'sm2:row-start-2'
          } sm2:justify-self-end self-end`}
        />
      </div>
    );
};

export default ReviewElement;
