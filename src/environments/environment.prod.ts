export const environment = {
    production: true,
    smp: {
        ownerId: 78725629,
        count: 10,
        tagPost: 'spymeplease',
        tagReport: 'spymepleasereport',
        getTagReportByModel: model_vk_id => `hey_${model_vk_id}_look_at_self`
    },
    db:{
        name: 'spymeplease'
    },
    vk: {
        apiVersion: '5.60',
        apiId: 4022476,
        scope: 8196
    },
    googleMapsKey: 'AIzaSyCO8eX3MDiI1EaqnH_0vaDbXet74ss7TDI'
};
