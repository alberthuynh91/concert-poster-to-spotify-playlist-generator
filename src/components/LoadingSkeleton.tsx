import Skeleton from '@mui/material/Skeleton';
import styles from '@/styles/LoadingSkeleton.module.css';

const LoadingSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeletonWrapper}>
        <Skeleton height={70} />
        <Skeleton height={70} />
      </div>
      <div className={styles.skeletonWrapper}>
        <Skeleton height={70} />
        <Skeleton height={70} />
      </div>
      <div className={styles.skeletonWrapper}>
        <Skeleton height={70} />
        <Skeleton height={70} />
      </div>
      <div className={styles.skeletonWrapper}>
        <Skeleton height={70} />
        <Skeleton height={70} />
      </div>
    </div>
  );
};
export default LoadingSkeleton;
