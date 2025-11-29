import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#4f46e5", // Indigo-600
                secondary: "#f8fafc", // Slate-50
                accent: "#10b981", // Emerald-500
            },
        },
    },
    plugins: [],
};
export default config;
