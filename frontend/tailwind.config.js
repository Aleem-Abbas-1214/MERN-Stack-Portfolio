/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B0F14',
        surface: '#111820',
        surface2: '#161F29',
        border: '#22303C',
        text: '#E6EDF3',
        muted: '#8B98A5',
        amber: '#F5A623',
        amberDim: '#8A5E19',
        green: '#3FB950',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'monospace'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(245,166,35,0.15), 0 8px 30px rgba(245,166,35,0.08)',
      },
    },
  },
  plugins: [],
};
