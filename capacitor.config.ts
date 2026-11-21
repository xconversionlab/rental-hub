import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.xconversionlab.rentalhub",
  appName: "Rental Hub",
  webDir: "www",
  server: {
    // Client-demo APK: loads the deployed preview so the existing TanStack
    // Start server routes and data flows continue to work inside Android.
    // This is intentionally online-only; production must use a real backend
    // and a reviewed native deployment configuration.
    url:
      process.env.CAPACITOR_SERVER_URL ??
      "https://rental-hub-client-preview-git-c-4c3341-xconversionlabs-projects.vercel.app",
    cleartext: false,
  },
};

export default config;
