export type ResponseStatus = {
  responseCode: string;
  responseMessage: string;
};
export type ResponseMetaData<T> = {
  response: ResponseStatus;
  result: T;
};
