import React from 'react';
import { Button } from 'antd'; // Assuming you're using Ant Design for buttons
import styles from './UpdateButton.module.scss';

const UpdateButton = () => {
  return (
    <div className={styles.buttonContainer}>
      <Button type="default" className={styles.updateBtn}>
        Update Profile
      </Button>
      <Button type="default" className={styles.updateBtn}>
        Update Resume
      </Button>
    </div>
  );
};

export default UpdateButton;
