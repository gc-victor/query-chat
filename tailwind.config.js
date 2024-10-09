/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/pages/*.{html,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                cal: ["Cal Sans", "sans-serif"],
            },
        },
    },
    plugins: [],
};
