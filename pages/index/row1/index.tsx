import React from 'react';
import styles from './row.scss';
import LargeSlide from '../cells/large/index';
import MiddleSlide from '../cells/middle/index';
import { IArticlePreview } from '../../../types/article';

interface Props {
  slides: IArticlePreview[];
}
export default ({ slides }: Props) => (
  <section className={styles.row}>
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.grid}>
          <div className={styles.item1}>
            <LargeSlide {...slides[0]} />
          </div>
          <div className={styles.item2}>
            <MiddleSlide {...slides[1]} />
          </div>
          <div className={styles.item3}>
            <MiddleSlide {...slides[2]} />
          </div>
          <div className={styles.item4}>
            <MiddleSlide {...slides[3]} />
          </div>
        </div>
      </div>
    </div>
  </section>
);
