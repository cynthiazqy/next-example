import { useState, useEffect } from 'react';
import { Button, Tooltip, Carousel, Card, Image } from 'antd';
import { UploadOutlined, StarFilled } from '@ant-design/icons';
import axios from 'axios';
import styles from './index.module.scss';

interface CardItem {
  id: number;
  cardLabel: string;
  cardVal: string;
}

interface PageInfoProps {
  id?: number;
  title: string;
  score: string;
  viewsNum: string;
  para: string;
  subPara1: string;
  subPara2: string;
}

const FlexHome = () => {
  const [pageInfo, setPageInfo] = useState<PageInfoProps>({
    title: '',
    score: '',
    viewsNum: '',
    para: '',
    subPara1: '',
    subPara2: '',
  });

  useEffect(() => {
    getPageInfo();
  }, []);

  const getPageInfo = async () => {
    const { data, status } = await axios.get('/api/getPageInfo');
    if (status === 200) {
      setPageInfo(data);
    }
  };

  const carouselList: string[] = [
    '/flexHome/nico.jpg',
    '/flexHome/messie03.jpeg',
    '/flexHome/neymar01.jpeg',
  ];
  const cardContensList: CardItem[] = [
    {
      id: 1,
      cardLabel: 'Coach',
      cardVal: 'Alberto Nunez',
    },
    {
      id: 2,
      cardLabel: 'Level',
      cardVal: 'Beginner, Novice, Intermediate',
    },
    {
      id: 3,
      cardLabel: 'Equipment',
      cardVal: 'Full Gym',
    },
    {
      id: 4,
      cardLabel: 'Time Per Workout',
      cardVal: '60 minutes',
    },
    {
      id: 5,
      cardLabel: 'Days Per Week',
      cardVal: '4 days',
    },
    {
      id: 6,
      cardLabel: 'Program Length',
      cardVal: '15 weeks',
    },
  ];

  const { title, score, viewsNum, para, subPara1, subPara2 } = pageInfo ?? {};

  return (
    <div className={styles.flexHome}>
      <div className={styles.banner}>
        <div className={styles.image}>
          <img
            src='/flexHome/messie01.jpeg'
            alt=''
          />
        </div>
      </div>
      <div className={styles.title}>
        <div className={styles.leftTitle}>
          <span>{title || '--'}</span>
          <Tooltip
            placement='right'
            title={<span>Link copied!</span>}>
            <UploadOutlined style={{ fontSize: '16px', color: 'purple' }} />
          </Tooltip>
        </div>
        <div className={styles.rightTitle}>
          <StarFilled style={{ color: 'orange' }} />
          <span>
            {score || 0}({viewsNum || 0}&nbsp;reviews)
          </span>
        </div>
      </div>
      <div className={styles.para}>{para || '--'}</div>
      <div className={styles.box}>
        <div className={styles.leftBox}>
          <div className={styles.subTitle}>Program Description</div>
          <div className={styles.subPara}>{subPara1 || '--'}</div>
          <div className={styles.subPara}>{subPara2 || '--'}</div>
          <Carousel
            dotPosition='right'
            autoplay={true}>
            {carouselList.map((item: string) => (
              <Image
                src={item}
                key={item}
                width={'100%'}
                height={400}
                preview={false}
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center center',
                  overflow: 'hidden',
                  border: 'none',
                  boxSizing: 'border-box',
                }}
              />
            ))}
          </Carousel>
        </div>
        <div className={styles.rightBox}>
          <Card bordered={false}>
            <p>Program Overview</p>
            {cardContensList.map((item: CardItem) => (
              <p key={item.id}>
                <span>{item.cardLabel}</span>
                <span>{item.cardVal}</span>
              </p>
            ))}
          </Card>
          <Card bordered={false}>
            <div>Start the program</div>
            <div>On Bootstcamp for free</div>
            <div>
              <img src='/flexHome/neymar.jpeg' />
            </div>
            <div>
              <Button type='primary'>App Store</Button>
              <Button type='primary'>Google Play</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FlexHome;
