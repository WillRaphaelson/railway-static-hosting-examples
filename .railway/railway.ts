import {defineRailway, github, project, service} from 'railway/iac';

export default defineRailway(() => {
  const api = service('api', {
    source: github('WillRaphaelson/railway-static-hosting-examples', {branch:'main',rootDirectory:'/apps/api'}),
    start: 'npm start',
    healthcheck: '/health',
    env: {PORT:'3000'}
  });
  const web = service('web', {
    source: github('WillRaphaelson/railway-static-hosting-examples', {branch:'main',rootDirectory:'/apps/web'}),
    healthcheck: '/health',
    env: {API_HOST:api.env.RAILWAY_PRIVATE_DOMAIN,API_PORT:'3000'}
  });
  const docs = service('docs', {
    source: github('WillRaphaelson/railway-static-hosting-examples', {branch:'main',rootDirectory:'/apps/docs'}),
    build: 'npm run build',
    healthcheck: '/',
    env: {RAILPACK_SPA_OUTPUT_DIR:'build'}
  });
  return project('static-hosting-field-guide', {resources:[web,api,docs]});
});
