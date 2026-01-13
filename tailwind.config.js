/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        label_col: 'rgba(0, 224, 255, 1)',
        text_col: 'rgba(74, 188, 236, 1)',
      },
       screens: {
      mob: '320px',
      tab: '768px',
      desk: '1280px'
      },
    },
    backgroundImage: {
      mainGradient: 'linear-gradient(286.41deg, rgba(2,35,53,0.8) 3.63%, rgba(12,55,61,0.8) 90.98%)',
      formGradient: 'linear-gradient(286.41deg, #033958 3.63%, #0F6B78 90.98%)',
      inputGradient: 'linear-gradient(180deg, rgba(0, 224, 255, 0.11) 0%, rgba(0, 224, 255, 0.0539) 100%)',
      btGradient: 'linear-gradient(180deg, rgba(3, 225, 255, 0.66) 0%, #13CDC2 100%)'
    },
    boxShadow: {
      form_shadow: '0px 20px 50px 0px #00000087',
      bt_shadow: '0px 7px 20px -7px #00E0FF',
    },
  },
  plugins: [],
   corePlugins: {
    preflight: true,
  }
}


