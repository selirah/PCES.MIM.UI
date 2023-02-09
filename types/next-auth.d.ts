// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';

declare module 'next-auth' {
  /**
   *  Returned by `useSession`, `getSession` and received as a prop on the SessionProvider context
   */
  interface Session {
    user: {
      userDTO: {
        userId: number;
        username: string;
        email: string;
        isActive: boolean;
        password: string;
        fullName: string;
        requires2StepVerification: boolean;
        isLoggedIn: boolean;
        lastLoginDate: Date;
        primaryPhoneNo: string;
        specialUser: boolean;
        secondaryPhoneNo: string;
        modifiedById: number;
        roleId: number;
        role: {
          roleId: number;
          role: string;
          description: string;
          isEnabled: boolean;
          modifiedById: number;
        };
      };
      authMode: null;
    };
    expires: Date;
  }
}
