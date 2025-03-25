const config = {
  development: {
    apiUrl: 'http://localhost:3000',
    assetsPath: '/assets',
    componentsPath: '/components'
  },
  production: {
    apiUrl: 'https://api.wombat.ai',
    assetsPath: '/assets',
    componentsPath: '/components'
  }
};

const environment = window.location.hostname === 'localhost' ? 'development' : 'production';
export default config[environment]; 