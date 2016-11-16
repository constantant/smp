// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
    production: false,
    oauth: {
        loginUrl: 'https://oauth.vk.com/authorize',
        logoutUrl: '',
        redirectUri: window.location.origin,
        clientId: '4022476',
        scope: '8192',
        issue: 'https://api.vk.com/method/',
        oidc: false,
    },
    smp: {
        count: 10,
        tagPost: 'spymeplease',
        tagReport: 'spymepleasereport',
        getTagReportByModel: model_vk_id => `hey_${model_vk_id}_look_at_self`
    },
    apiOwnerId: 78725629,
    apiUri: 'https://api.vk.com/method/',
    apiUriProxy: '/api/',
    apiVersion: '5.60',
    googleMapsKey: 'AIzaSyCO8eX3MDiI1EaqnH_0vaDbXet74ss7TDI'
};
