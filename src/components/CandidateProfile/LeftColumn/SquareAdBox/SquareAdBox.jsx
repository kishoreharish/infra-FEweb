import React from 'react';
import { Card } from 'antd'; // Make sure you have 'antd' installed: npm install antd
import styles from './SquareAdBox.module.scss';

const { Meta } = Card;

const SquareAdBox = () => {
  return (
    <Card
      hoverable
      className={styles.adCard}
      cover={<img alt="example" src="https://images.unsplash.com/photo-1729368112752-352c47d929f6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29uc3RydWN0aW9uJTIwc3VwZXJ2aXNvcnxlbnwwfHwwfHx8MA%3D%3D" />}
    >
      <Meta title="This IS Ad Post" description="www.instagram.com" />
    </Card>
  );
};

export default SquareAdBox;
