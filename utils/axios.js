var axios = require('axios');

const instance = axios.create({
    baseURL: 'https://9cffe8fbtrial-trial.integrationsuitetrial-apim.us10.hana.ondemand.com:443/9cffe8fbtrial/GWSAMPLE_BASIC'
    //BusinessPartnerSet?$filter=CompanyName eq 'Talpa'&$format=json
});

instance.defaults.headers.common['Authorization'] = `Basic ${Buffer.from('P2004472604:Admin@123').toString('base64')}`;

module.exports = instance;