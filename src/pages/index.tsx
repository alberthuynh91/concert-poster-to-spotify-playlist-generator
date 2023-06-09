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
import { ArtistType } from '@/types';

const callbackUrl =
  process.env.NEXT_PUBLIC_ENV === 'dev'
    ? 'http://localhost:3000'
    : 'https://concert-poster-to-spotify-playlist.netlify.app';

const LoggedOut = () => {
  return (
    <Box
      p={1}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        minHeight: '100vh',
        flexDirection: 'column',
        backgroundImage: `linear-gradient(
          to bottom,
          rgba(85, 255, 0, 0.5),
          rgba(0, 0, 255, 0.5)
        ), url("/images/spotify-bg-2.png")`,
        color: 'white',
      }}
    >
      <h1>Concert Poster to Spotify Playlist Generator</h1>
      <p>
        Want to create Spotify playlists from concert posters? Just upload an
        image of the concert poster and we will handle the rest!
      </p>
      <Button
        component={Link}
        variant="contained"
        color="success"
        onClick={() => signIn('spotify', { callbackUrl })}
      >
        Start making playlists
      </Button>
    </Box>
  );
};

const LoggedIn = (props: any) => {
  const { session, artists, setArtists, isLoading, setIsLoading } = props;
  return (
    <Box py={1} px={{ xs: 2, sm: 2, md: 8, lg: 20, xl: 40 }}>
      <Box sx={{ fontWeight: 'light', fontSize: 14, textAlign: 'right' }}>
        Signed in as {session?.token?.email}{' '}
        <Button onClick={() => signOut()}>Sign out</Button>
      </Box>
      <ImageUpload
        artists={artists}
        setArtists={setArtists}
        setIsLoading={setIsLoading}
      />
      {isLoading && <LoadingSkeleton />}
      {artists !== undefined && (
        <Spotify
          artists={artists}
          setArtists={setArtists}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
    </Box>
  );
};

export default function Home() {
  const { data: session, status } = useSession();
  const [artists, setArtists] = useState<ArtistType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  if (status === 'loading') return null;
  return (
    <>
      <Head>
        <title>Concert Poster to Spotify Playlist Generator</title>
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
            artists={artists}
            setArtists={setArtists}
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
