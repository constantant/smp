// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  vk: {
    sdk: '//vk.com/js/api/openapi.js',
    apiVersion: '5.62',
    apiId: 4022476,
    scope: 1
  },
  smp: {
    ownerId: 78725629,
    count: 20,
    tagPost: 'spymeplease',
    tagReport: 'spymepleasereport',
    pingDuration: 6000
  },
  db: {
    name: 'spymeplease',
    storeList: 'list',
    storeUsers: 'users',
    version: 1,
    limit: 20
  },
  googleMapsKey: 'AIzaSyCO8eX3MDiI1EaqnH_0vaDbXet74ss7TDI'
};
