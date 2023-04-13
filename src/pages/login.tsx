import { signIn } from 'next-auth/react';
import Image from 'next/image';

const callbackUrl =
  process.env.NEXT_PUBLIC_ENV === 'dev'
    ? 'http://localhost:3000'
    : 'https://concert-poster-to-spotify-playlist.netlify.app';

export default function Login() {
  const handleLogin = () => {
    signIn('spotify', { callbackUrl });
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-20">
      <Image
        src="/images/spotify_logo.png"
        alt="spotify logo"
        width={320}
        height={96}
      />
      <button
        className="flex px-12 py-2 text-lg tracking-widest uppercase rounded-full focus:outline-none bg-primary hover:bg-opacity-80"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
}
