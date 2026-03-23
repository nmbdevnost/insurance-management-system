export type ResponseMetaData<T> = {
  response: {
    responseCode: string;
    responseMessage: string;
  };
  result: T;
};
