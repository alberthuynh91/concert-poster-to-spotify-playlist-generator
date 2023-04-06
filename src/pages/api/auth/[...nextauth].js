import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

const scope =
  'user-read-private,user-read-email,playlist-modify-public,playlist-modify-private';

export default NextAuth({
  providers: [
    SpotifyProvider({
      authorization: {
        params: { scope },
      },
      clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
      refreshToken: process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.refresh_token;
      }
      return token;
    },
    async session(session, user) {
      session.user = user;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});
