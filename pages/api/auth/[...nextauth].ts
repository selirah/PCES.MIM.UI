/* eslint-disable no-debugger */
import NextAuth, { Account, Profile, User } from 'next-auth';
import axios from 'axios';
import { Agent } from 'https';
import CredentialsProvider from 'next-auth/providers/credentials';
import { ENV } from '../../../env';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(
            `${ENV.NEXT_PUBLIC_USERSERVICE_URL}/AspNetUsers/login`,
            { data: credentials },
            { httpsAgent: new Agent({ rejectUnauthorized: false }) }
          );
          if (response) {
            return response.data;
          } else {
            return null;
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }: any) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    error: '/auth/login',
  },
  secret: ENV.NEXT_PUBLIC_AUTH_SECRET,
});
