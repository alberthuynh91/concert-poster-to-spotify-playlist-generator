import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';

const LoadingSkeleton = () => {
  return (
    <Grid
      sx={{ padding: '0 0.5rem', marginTop: '2.5rem' }}
      container
      columns={{ xs: 1, sm: 12, md: 12 }}
    >
      {Array.from(Array(6)).map((_, index) => (
        <Grid sx={{ padding: '0 0.2rem' }} item xs={1} sm={6} md={6} key={0}>
          <Skeleton height={70} />
        </Grid>
      ))}
    </Grid>
  );
};
export default LoadingSkeleton;
