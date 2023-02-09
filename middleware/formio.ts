import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "react-query";
import { ENV } from '../env';

type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH";
type MutationHTTPMethod = "POST" | "PUT" | "PATCH";

type MutationOptions = {
  path: string;
  method?: MutationHTTPMethod;
};

//const { FORMIO_ORIGIN } = process.env;
const baseUrl = ENV.NEXT_PUBLIC_FORMIO_ORIGIN;
const baseHeader = { "Content-Type": "application/json" };

const buildHeaders = async () => {
  // TODO: Get Auth Token from Auth Middleware
  const accessToken = (await localStorage?.token) ?? false;
  const headers = new Headers(baseHeader);
  if (accessToken) {
    headers.set("Authorization", accessToken);
  }

  return headers;
};

async function fetcher<Body = unknown>(
  path: string,
  method: HTTPMethod = "GET",
  body?: Body
) {
  const headers = await buildHeaders();
  const fullPath=`${baseUrl}?path=${path}`
  // const fullPath=`${baseUrl}/${path}`
  console.log('Full Path: '+fullPath)
  const response = await fetch(fullPath, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

export function useFormFetch<Result = unknown>({
  path,
}: {
  path: string;
}): UseQueryResult<Result> {
  return useQuery(path, () => fetcher(path));
}

export function useFormMutation<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
>(
  { path, method }: MutationOptions,
  options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    "mutationFn"
  >
): UseMutationResult<TData, TError, TVariables, TContext> {
  return useMutation<TData, TError, TVariables, TContext>(
    (body) => fetcher(path, method ?? "POST", body),
    options
  );
}
