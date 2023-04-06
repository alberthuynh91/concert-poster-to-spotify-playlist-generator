import { useState } from 'react';
import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import ImageUpload from '@/components/ImageUpload';
import Spotify from '@/components/Spotify';
import { useSession, signIn, signOut } from 'next-auth/react';
import LoadingSkeleton from '@/components/LoadingSkeleton';

export default function Home() {
  const { data: session } = useSession();
  const [artistListObject, setArtistListObject] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  if (session) {
    console.log(`got session: `, session);
    return (
      <>
        <Head>
          <title>Concert Poster to Spotify Playlist</title>
          <meta
            name="description"
            content="create spotify playlist from concert poster image"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <div>
            {/* @ts-expect-error */}
            Signed in as {session?.token?.email}{' '}
            <button onClick={() => signOut()}>Sign out</button>
          </div>
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
        </main>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
