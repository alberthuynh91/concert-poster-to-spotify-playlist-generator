import Image from 'next/image';
import { ArtistType } from '../types';
import styles from '@/styles/Artists.module.css';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Artist = (props: ArtistType) => {
  const {
    images,
    id,
    // href,
    name,
    selected,
    // @ts-expect-error
    setArtistListObject,
  } = props;
  if (!props.images) return null;
  const src = images[2]?.url || '';

  const handleCardClick = (selected: boolean) => {
    setArtistListObject((prevList: any) => {
      const newList = prevList.slice();
      const index = newList.findIndex((item: any) => item.id === id);
      newList[index].selected = !selected;
      return newList;
    });
  };

  return (
    <button className={styles.card} onClick={() => handleCardClick(selected)}>
      <Image src={src} alt="artist image" width={50} height={50} />
      <span className={styles.info}>
        <span>{name}</span>
        <span>
          <Checkbox
            {...label}
            name={id}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            checked={selected}
            color="success"
          />
        </span>
      </span>
    </button>
  );
};

const Artists = (props: any) => {
  const {
    artists,
    handleChange,
    handleSelectAll,
    handleUnselectAll,
    setArtistListObject,
  } = props;
  return (
    <>
      <div className={styles.container}>
        <h1>Artists</h1>{' '}
        <Button variant="text" onClick={handleSelectAll} color="success">
          Select All
        </Button>
        <Button variant="text" onClick={handleUnselectAll} color="success">
          Unselect All
        </Button>
      </div>
      <Box mb={4} sx={{ flexGrow: 1 }}>
        <Grid container columns={{ xs: 1, sm: 12, md: 12 }}>
          {artists.map((artist: ArtistType, index: number) => {
            return (
              <Grid item xs={1} sm={6} md={6} key={index}>
                <Artist
                  key={artist.id}
                  {...artist}
                  // @ts-expect-error
                  setArtistListObject={setArtistListObject}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default Artists;
