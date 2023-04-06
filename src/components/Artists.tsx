import Image from 'next/image';
import { ArtistType } from '../types';
import styles from '@/styles/Artists.module.css';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';

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
      <div className={styles.artistsContainer}>
        {artists.map((artist: ArtistType) => {
          return (
            <Artist
              key={artist.id}
              {...artist}
              // @ts-expect-error
              setArtistListObject={setArtistListObject}
            />
          );
        })}
      </div>
    </>
  );
};

export default Artists;
