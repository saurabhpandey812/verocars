// ============================================================
// ENV — yahi edit karo (jaise .env.local). Baaki touch mat karo.
// ============================================================

// Atlas (active)
export const MONGODB_URI =
  "mongodb+srv://saurabhpandey081220_db_user:8WEuUtRmCafeAENn@cluster0.v8wdvaa.mongodb.net/verocars?retryWrites=true&w=majority";

// Local Mongo — Atlas band karo to upar comment, ye uncomment:
// export const MONGODB_URI = "mongodb://127.0.0.1:27017/verocars";

export const NEXT_PUBLIC_SITE_URL = "http://localhost:3000";
export const NEXT_PUBLIC_DEMO_ACCOUNT = false;

// ============================================================
// App use (change mat karo)
// ============================================================

export const publicEnv = {
  siteUrl: NEXT_PUBLIC_SITE_URL.replace(/\/$/, ""),
  demoAccount: NEXT_PUBLIC_DEMO_ACCOUNT,
} as const;

export const env = {
  isProd: process.env.NODE_ENV === "production",
  siteUrl: publicEnv.siteUrl,
  demoAccount: NEXT_PUBLIC_DEMO_ACCOUNT,
  mongodbUri: MONGODB_URI,
} as const;
