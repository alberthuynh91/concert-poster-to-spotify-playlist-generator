import Image from 'next/image';
import { ArtistType } from '../types';
import styles from '@/styles/Artists.module.css';

const Artist = (props: ArtistType) => {
  const { images, id, href, name } = props;

  if (!props.images) return null;
  const src = images[2]?.url || '';
  const width = images[2]?.width;
  return (
    <div className={styles.card}>
      <Image src={src} alt="artist image" width={50} height={50} />
      <span>{name}</span>
    </div>
  );
};

const Artists = (props) => {
  const { artists } = props;
  return (
    <>
      <h1>Artists</h1>
      <div className={styles.container}>
        {artists.map((artist: ArtistType) => {
          return <Artist key={artist.id} {...artist} />;
        })}
      </div>
    </>
  );
};

export default Artists;
