import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import ImageUpload from '@/components/ImageUpload';
import SpotifyExample from '@/components/SpotifyExample';
import { useSession, signIn, signOut } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { data: session } = useSession();
  const [currentData, setCurrentData] = useState(undefined);
  if (session) {
    console.log(`got session: `, session);
    return (
      <>
        Signed in as {session?.token?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <ImageUpload setCurrentData={setCurrentData} />
        {currentData !== undefined && (
          <SpotifyExample currentData={currentData} />
        )}
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

// export default function Home() {
//   return (
//     <>
//       <Head>
//         <title>Create Next App</title>
//         <meta name="description" content="Generated by create next app" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <main className={styles.main}>
//         <ImageUpload />
//         <SpotifyExample />
//       </main>
//     </>
//   );
// }
