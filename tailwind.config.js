export default {
  content: ['index.html', './src/**/*.{js,jsx,ts,tsx,vue,html}'],
  theme: {
    extend: {
      colors: {
        'primary-color': 'var(--primary-color)',
        'secondary-color': 'var(--secondary-color)',
        'text-color': 'var(--text-color)',
        'background-color': 'var(--background-color)',
        'text-accent-color': 'var(--text-accent-color)',
      },
      height: {
        'modal-height': 'var(--modal-height)',
      },
      width: {
        'modal-width': 'var(--modal-width)',
      },
    },
  },
  plugins: [],
};
