const https = require('https');

const cli = exports;

const fs = require('fs');
const path = require('path');
const homedir = require('os').homedir();
const configFile = path.join(homedir, '.statuscakeconfig');

if (!fs.existsSync(configFile)) {
    console.error('No configuration file found at ~/.statuscakeconfig');
    console.error('Please create a configuration file with your API key');
    console.error('Example:');
    console.error('  echo \'{"API_KEY":"your api key"}\' > ~/.statuscakeconfig');
    process.exit(1);
}

async function contactAPI(method, path, queryParams, contentType = 'application/json') {
    const credentials = JSON.parse(fs.readFileSync(configFile));
    const apiToken = credentials.API_KEY;

    if (queryParams && queryParams.length > 0) {
        queryParams = queryParams.reduce((acc, curr, index) => {
            if (index % 2 === 0) {
                acc.push(`${curr.replace('--', '')}=${queryParams[index + 1]}`);
            }
            return acc;
        }, []);
        path += `?${queryParams.join('&')}`;
    }

    const options = {
        hostname: 'api.statuscake.com',
        path,
        method,
        headers: {
            'Authorization': `Bearer ${apiToken}`,
            'Content-Type': contentType
        }
    };

    const req = https.request(options, res => {
        let data = '';
        res.on('data', chunk => { data += chunk; });
        res.on('end',  () => {
            try {
                const response = JSON.parse(data);
                console.log(JSON.stringify(response, null, 2));
            } catch (error) {
                console.error('Error: ', error);
            }
        });
    });
    req.end();
}

const help                = require('./help');
const uptimeHelp          = require('./uptimeHelp');
const uptimeListOptions   = require('./uptimeListOptions');
const uptimeCreateOptions = require('./uptimeCreateOptions');

const start = () => {
    const args        = process.argv.slice(2);
    const feature     = args[0];
    const action      = args[1];
    const options     = args.slice(2);

    switch (feature) {
        case 'heartbeat':
            switch(action) {
                case 'list':
                    console.log('listing heartbeats');
                    break;
                case 'create':
                    console.log('creating heartbeat');
                    break;
                case 'read':
                    console.log('reading heartbeat');
                    break;
                case 'update':
                    console.log('updating heartbeat');
                    break;
                case 'delete':
                    console.log('deleting heartbeat');
                    break;
                case 'help':
                default:
                    console.log('helping with heartbeat');
                    break;
            }
            break;
        case 'pagespeed':
            switch(action) {
                case 'list':
                    console.log('listing pagespeeds');
                    break;
                case 'create':
                    console.log('creating pagespeed');
                    break;
                case 'read':
                    console.log('reading pagespeed');
                    break;
                case 'update':
                    console.log('updating pagespeed');
                    break;
                case 'delete':
                    console.log('deleting pagespeed');
                    break;
                case 'history':
                    console.log('pagespeed history');
                    break;
                case 'help':
                default:
                    console.log('helping with pagespeed');
                    break;
            }
            break;
        case 'ssl':
            switch(action) {
                case 'list':
                    console.log('listing ssls');
                    break;
                case 'create':
                    console.log('creating ssl');
                    break;
                case 'read':
                    console.log('reading ssl');
                    break;
                case 'update':
                    console.log('updating ssl');
                    break;
                case 'delete':
                    console.log('deleting ssl');
                    break;
                case 'help':
                default:
                    console.log('helping with ssl');
                    break;
            }
            break;
        case 'uptime':
            switch(action) {
                case 'list':

                    if (options.includes('--help')) {
                        uptimeListOptions();
                        break;
                    }

                    contactAPI('GET', '/v1/uptime', options);
                    break;
                case 'create':

                    if (options.includes('--help')) {
                        uptimeCreateOptions();
                        break;
                    }

                    contactAPI('POST', '/v1/uptime', options, 'application/x-www-form-urlencoded');
                    break;
                case 'read':
                    console.log('reading uptime check');
                    break;
                case 'update':
                    console.log('updating uptime check');
                    break;
                case 'delete':
                    console.log('deleting uptime check');
                    break;
                case 'history':
                    console.log('uptime history');
                    break;
                case 'periods':
                    console.log('uptime periods');
                    break;
                case 'alerts':
                    console.log('uptime alerts');
                    break;
                case 'help':
                default:
                    uptimeHelp();
                    break;
            }
            break;
        case 'help':
        default:
            help();
            break;
    }
};

cli.start = start;
