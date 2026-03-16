export {};

declare global {
  interface Window {
    __RUNTIME_CONFIG__: {
      API_BASE_URL: string;
      NODE_ENV: string;
    };
  }
}
