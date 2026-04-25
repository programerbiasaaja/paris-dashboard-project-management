export const VERSION_TAG = "0.0.67";

export const CONFIG = {
    domain: process.env.DOMAIN || "https://umrohqu.id",
    env: process.env.NODE_ENV || "development",
    query_enc_key:
        process.env.NEXT_PUBLIC_QUERY_ENC_KEY ||
        "39d0c547dc14ee537db2f641a97ee1d62381652aa14921bc5dfdfb3970e26398",
    session: {
        secret:
            process.env.SESSION_SECRET ||
            "39d0c547dc14ee537db2f641a97ee1d62381652aa14921bc5dfdfb3970e26398",
        session_name: process.env.SESSION_NAME || "travelqu",
    },
    geolocation: {
        token: process.env.GEOLOCATION_BEARER_TOKEN || "",
    },
    base_url: {
        user: process.env.BASE_URL_USER,
        core: process.env.BASE_URL_CORE,
        content: process.env.BASE_URL_CONTENT,
        transaction: process.env.BASE_URL_TRANSACTION,
        finance: process.env.BASE_URL_FINANCE,
        geolocation: process.env.BASE_URL_GEOLOCATION,
        islamic_pqu:
            process.env.BASE_URL_ISLAMIC_PQU || "https://islam.pesantrenqu.id",
    },
    google_api: {
        place:
            process.env.GOOGLE_KEY_API_PLACE ||
            "AIzaSyCXfnC5KrYLNiYc4RC6osEtwHEhJVjyB9M",
    },
    google: {
        GCP_PROJECT_ID: process.env.GCP_PROJECT_ID || "",
        GCP_SERVICE_CLIENT_EMAIL: process.env.GCP_SERVICE_CLIENT_EMAIL || "",
        GCP_PRIVATE_KEY: process.env.GCP_PRIVATE_KEY || "",
        GCP_BUCKET_NAME: process.env.GCP_BUCKET_NAME || "",
        GCP_KEY_JSON: JSON.stringify({
            type: "service_account",
            project_id: process.env.GCP_PROJECT_ID || "",
            private_key_id: process.env.GCP_PRIVATE_KEY_ID || "",
            private_key: process.env.GCP_PRIVATE_KEY || "",
            client_email: process.env.GCP_SERVICE_CLIENT_EMAIL || "",
            client_id: process.env.GCP_SERVICE_CLIENT_ID || "",
            auth_uri: "https://accounts.google.com/o/oauth2/auth",
            token_uri: "https://oauth2.googleapis.com/token",
            auth_provider_x509_cert_url:
                "https://www.googleapis.com/oauth2/v1/certs",
            client_x509_cert_url:
                process.env.GCP_CLIENT_X509_CERT_URL ||
                "https://www.googleapis.com/robot/v1/metadata/x509/client-service%40travelqu-20917.iam.gserviceaccount.com",
            universe_domain: "googleapis.com",
        }),
    },
    firebase: {
        apiKey:
            process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
            "AIzaSyDtxKqxqJuhxq4rhBkcFR4UhE0wGYPNk-8",
        authDomain:
            process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
            "wisataqu-production.firebaseapp.com",
        projectId:
            process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
            "wisataqu-production",
        storageBucket:
            process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "292912318231",
        messagingSenderId:
            process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||
            "521733090531",
        appId:
            process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
            "1:521733090531:web:58415e18b15adcce5129d6",
        measurementId:
            process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-SX5079L8QN",
    },
    fcm: {
        vapid_key: process.env.NEXT_PUBLIC_FCM_VAPID_KEY || "",
    },
} as const;

export type BaseURLKey = keyof typeof CONFIG.base_url;
