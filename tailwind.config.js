/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/views/commands/**/*.{html,js,hbs}'],
    theme: {
        extend: {
            padding: {
                sm: '8px',
            },
            maxWidth: {
                container: '1366px',
                bxContainer: '490px',
            },
            fontSize: {
                title: '32px',
                'def-sm': '16px',
            },
            lineHeight: {
                lg: '40px',
            },
            fontFamily: {
                proxima: ['Proxima Nova', 'sans-serif'],
            },
            colors: {
                'curious-blue': {
                    50: '#f3f7fc',
                    100: '#e5eff9',
                    200: '#c6def1',
                    300: '#94c4e5',
                    400: '#479ad1',
                    500: '#3589c2',
                    600: '#256da4',
                    700: '#1f5885',
                    800: '#1d4b6f',
                    900: '#1d3f5d',
                    950: '#14293d',
                },
            },
        },
    },
    plugins: [],
}
