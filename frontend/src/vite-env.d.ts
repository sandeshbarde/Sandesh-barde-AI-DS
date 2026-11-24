/// <reference types="vite/client" />

declare global {
  interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    // add other env vars here if needed
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export {};
