/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        zen: {
          50: '#f7f6f2',
          100: '#edeae1',
          200: '#dcd6c5',
          300: '#c5bba2',
          400: '#ab9c80',
          500: '#948366',
          600: '#796951',
          700: '#615341',
          800: '#504437',
          900: '#433b31',
          950: '#231e18',
        },
        sage: {
          50: '#f4f7f4',
          100: '#e5ece5',
          200: '#cddbcdu',
          300: '#a7bfa7',
          400: '#7c9e7c',
          500: '#5c805c',
          600: '#476547',
          700: '#395139',
          800: '#304230',
          900: '#283728',
        }
      },
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'sans-serif'],
        serif: ['Nanum Myeongjo', 'Batang', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
