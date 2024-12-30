export interface APIRequestQuery {
  method: string;
  endpoint: string;
  params?: Iterable<[string, string]>;
}

export interface APIRequestPromise {
  query: APIRequestQuery;
  resolve: (response: Promise<Response>) => void;
}
