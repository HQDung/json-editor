const devMode = process.env.NODE_ENV === 'development';

export default {
  DEV: devMode,
  SERVER_URL: devMode
    ? 'http://localhost:5000/api/'
    : '/api/',
};