export const environment = {
    production: true,
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