declare global {
  interface Window {
    __env: EnvironmentVariables;
  }
}

interface EnvironmentVariables {
  NODE_TLS_REJECT_UNAUTHORIZED: string;
  NEXT_PUBLIC_USERSERVICE_URL: string;
  NEXT_PUBLIC_AUTH_SECRET: string;
  NEXT_PUBLIC_FORMIO_ORIGIN: string;
  NEXTAUTH_URL: string;
  NEXT_PUBLIC_API_ENDPOINT: string;
  NEXT_PUBLIC_IMAGE_ENDPOINT: string;
  NEXT_PUBLIC_SCANNER_ENDPOINT: string;
}

const defaultBuildValues: EnvironmentVariables = {
  NODE_TLS_REJECT_UNAUTHORIZED: process.env.NODE_TLS_REJECT_UNAUTHORIZED ?? '0',
  NEXT_PUBLIC_USERSERVICE_URL: process.env.NEXT_PUBLIC_USERSERVICE_URL ?? '',
  NEXT_PUBLIC_AUTH_SECRET: process.env.NEXT_PUBLIC_AUTH_SECRET ?? '',
  NEXT_PUBLIC_FORMIO_ORIGIN: process.env.NEXT_PUBLIC_FORMIO_ORIGIN ?? '',
  NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? '',
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT ?? '',
  NEXT_PUBLIC_IMAGE_ENDPOINT: process.env.NEXT_PUBLIC_IMAGE_ENDPOINT ?? '',
  NEXT_PUBLIC_SCANNER_ENDPOINT: process.env.NEXT_PUBLIC_SCANNER_ENDPOINT ?? '',
};

// const isNotProd = process.env.NODE_ENV !== "production";

/** Overwrites default build-time "production" environment variables with actual
 *  server-side environment variables, if supplied to container environment. */
export const ENV = Object.freeze(defaultBuildValues); //Object.assign(defaultBuildValues, window.__env)
