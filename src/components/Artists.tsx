import Image from 'next/image';
import { ArtistType } from '../types';
import styles from '@/styles/Artists.module.css';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Artist = (props: ArtistType) => {
  const { images, id, href, name, selected, handleChange } = props;

  if (!props.images) return null;
  const src = images[2]?.url || '';
  const width = images[2]?.width;
  return (
    <div className={styles.card}>
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
            onChange={(event) => handleChange(event, id)}
          />
        </span>
      </span>
    </div>
  );
};

const Artists = (props) => {
  const { artists, handleChange, handleSelectAll, handleUnselectAll } = props;
  return (
    <>
      <div>
        <h1>Artists</h1>{' '}
        <Button variant="text" onClick={handleSelectAll}>
          Select All
        </Button>
        <Button variant="text" onClick={handleUnselectAll}>
          Unselect All
        </Button>
      </div>
      <div className={styles.container}>
        {artists.map((artist: ArtistType) => {
          return (
            <Artist key={artist.id} {...artist} handleChange={handleChange} />
          );
        })}
      </div>
    </>
  );
};

export default Artists;
