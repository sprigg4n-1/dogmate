import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        vegetation: '#5DD88E',
        punchOutGlove: '#7187F5',
        astronaut: '#464d71',
        kittenEye: '#8eaeff',
        phthaloBlue: '#000D83',
        poolBlue: '#64BCB2',
        silver: '#D9D9D9',
      },
      dropShadow: {
        account: '10px 10px 4px rgba(20, 236, 223, .25)',
      },
    },
  },
  plugins: [],
};
export default config;
