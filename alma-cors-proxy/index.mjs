export default async function (context, req) {
    context.log.info('*** Alma Cors Proxy ***');
    const apikey = process.env['ALMA_API_KEY'];

    if (!req.query.path) {
        context.log.warn('No API path set, exiting with 400');
        return context.res = {
            status: 400,
            body: "No API path present, set url paramter"
        };
    }
    if (!apikey) {
        context.log.warn('No apikey set, exiting with 400');
        return context.res = {
            status: 400,
            body: "No API key present, set apikey as env-var"
        };
    }
    const path = req.query.path;
    const almaApi = 'https://api-eu.hosted.exlibrisgroup.com/almaws/v1/';
    const almaUrl = almaApi + path;
    context.log.info('Calling URL', almaUrl);
    try {
        const response = await fetch(almaUrl, { headers: { 'Authorization': `apikey ${apikey}` }, redirect: 'follow', follow: 10 });
        return context.res = {
            headers: {
                'Content-Type': response.headers.get('Content-Type'),
                'Access-Control-Allow-Origin': '*'
            },
            body: await response.text()
        };
    } catch (error) {
        context.log.error(error);
        context.res = {
            status: 500,
            body: 'An error occurred while processing the request.'
        };
    }
}
