import { useState } from 'react';
import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import ImageUpload from '@/components/ImageUpload';
import Spotify from '@/components/Spotify';
import { useSession, signIn, signOut } from 'next-auth/react';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

const callbackUrl =
  process.env.NEXT_PUBLIC_ENV === 'dev'
    ? 'http://localhost:3000'
    : 'https://concert-poster-to-spotify-playlist.netlify.app';

const LoggedOut = () => {
  return (
    <>
      <h1>Concert Poster to Spotify Playlist Generator</h1>
      <p>
        Ever wanted to create a Spotify playlist from a concert poster? Well now
        you can! Just simply upload an image of the concert poster!
      </p>
      <Button
        component={Link}
        variant="contained"
        color="success"
        onClick={() => signIn('spotify', { callbackUrl })}
      >
        Start making playlists
      </Button>
    </>
  );
};

const LoggedIn = (props: any) => {
  const {
    session,
    artistListObject,
    setArtistListObject,
    isLoading,
    setIsLoading,
  } = props;
  return (
    <>
      <Box sx={{ fontWeight: 'light', fontSize: 14, textAlign: 'right' }}>
        Signed in as {session?.token?.email}{' '}
        <Button onClick={() => signOut()}>Sign out</Button>
      </Box>
      <ImageUpload
        setArtistListObject={setArtistListObject}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      {isLoading && <LoadingSkeleton />}
      {artistListObject !== undefined && (
        <Spotify
          artistListObject={artistListObject}
          setArtistListObject={setArtistListObject}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
    </>
  );
};

export default function Home() {
  const { data: session, status } = useSession();
  const [artistListObject, setArtistListObject] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  if (status === 'loading') return null;
  return (
    <>
      <Head>
        <title>Concert Poster to Spotify Playlist</title>
        <meta
          name="description"
          content="create spotify playlists from concert poster images"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {status === 'authenticated' ? (
          <LoggedIn
            session={session}
            artistListObject={artistListObject}
            setArtistListObject={setArtistListObject}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        ) : (
          <LoggedOut />
        )}
      </main>
    </>
  );
}
