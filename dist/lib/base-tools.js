// src/lib/base-tools
import EventEmitter from 'events';
class BaseTools extends EventEmitter {
    // class constructor
    constructor(options) {
        super();
        this.options = options;
    }
    /**
     * parsing the raw heading and keep them in original format (no lower case)
     * @param {*} req request object
     * @return {object}
     */
    parseHeader(req) {
        const headers = req.rawHeaders;
        const ctn = headers.length;
        const h = {};
        for (let i = 0; i < ctn; i += 2) {
            h[headers[i]] = headers[i + 1];
        }
        return h;
    }
    /**
     * Extract the json payload
     * @param {object} req the request Object
     * @return {object} Promise
     */
    parsePayload(req) {
        return new Promise((resolver, rejecter) => {
            // V.2 here we also need to parse the header and add to the json
            // and the result object will become { payload: Object, header: Object }
            const header = this.parseHeader(req);
            let body = [];
            req
                .on('data', (chunk) => {
                body.push(chunk);
            })
                .on('end', () => {
                // should catch error here as well
                try {
                    const json = Buffer.concat(body).toString();
                    resolver({
                        header,
                        payload: JSON.parse(json)
                    });
                }
                catch (e) {
                    rejecter(e);
                }
            })
                .on('error', rejecter); // just throw the rejecter in to handle it
        });
    }
    /**
     * @param {object} res the respond object unable to get a correct type IncomingMessage?
     * @param {string} err error string, this might or might not have, therefore make it optional
     * @return {void} nothing
     */
    resError(res, err) {
        res.writeHead(400, { 'content-type': 'application/json' });
        res.end(JSON.stringify({
            error: err
        }));
        this.emit('error', new Error(err));
    }
}
export { BaseTools };
