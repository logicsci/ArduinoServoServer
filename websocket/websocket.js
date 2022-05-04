const { Server } = require('ws');
const queryString = require('query-string');
const {json} = require("express");
const PORT = process.env.PORT || 3001
const connectionMap = new Map();
const connectionKeyMap = new Map();

function validateUser(userId, password) {
    if (password === '-9U.Q<fjn:/a=Mq') {
        return true;
    }
    return false;
}

function initial(app) {
    const server = app.listen(PORT);
    console.log(`Listening on ${PORT}`)
    /*const server = app
        .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
        .listen(PORT, () => console.log(`Listening on ${PORT}`));*/

    console.log("http server listening on %d", PORT)

    const wss = new Server({ server });
    console.log("websocket server created")

    wss.on("connection", function(ws, connectionRequest) {
        const [_path, params] = connectionRequest.url.split("?");
        const connectionParams = queryString.parse(params);

        // NOTE: connectParams are not used here but good to understand how to get
        // to them if you need to pass data with the connection to identify it (e.g., a userId).
        console.log('connectionParams ', connectionParams);

        // connectionMap.set(connectionParams.userId, ws);

        console.log("websocket connection open")
        let userId = connectionParams ? connectionParams.userId : '';
        ws.on("message", function message(data) {
            try {
                const jsonData = JSON.parse(data);
                if (jsonData) {
                    console.log('command :', jsonData);
                    switch (jsonData.command) {
                        case 'register': {
                            if (validateUser(jsonData.userId, jsonData.password)) {
                                connectionMap.set(jsonData.userId, ws);
                                userId = jsonData.userId;
                            }
                        }
                    }
                }
                console.log('received: %s', data);
            } catch (e) {
                console.log('message error: ', e);
            }

        });

        ws.on("close", function() {
            console.log("websocket connection close: ", userId);
            connectionMap.delete(userId);
        });

        ws.on("error", function() {
            console.log("websocket connection error: ", userId);
            connectionMap.delete(userId);
        });
    })
}

function getConnectionMap() {
    let keys = Array.from( connectionMap.keys() );
    return keys;
}

function flush(userId) {
    const _ws = connectionMap.get(userId);
    console.log('websocket flush send :', userId);
    // send command to _ws to flush toilet
    if (_ws) {
        console.log('websocket flush send2 :', userId);
        _ws.send(JSON.stringify({ command: 'flush', time: new Date() }), function() {  });
    }
    return true;
}

module.exports = {
    initial,
    getConnectionMap,
    flush
}
