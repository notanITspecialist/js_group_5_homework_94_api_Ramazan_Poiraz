const path = require('path');
const rootPath = __dirname;

module.exports = {
    rootPath,
    uploads: path.join(rootPath, 'public', 'uploads'),
    baseUrl: 'mongodb://localhost/messanger',
    baseConfig: {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true},
    facebook: {
        appId: '263479881481167',
        appSecret: '0b0915a323401e1df745659f4eb2da4f'
    }
};