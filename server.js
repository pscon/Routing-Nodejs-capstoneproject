const http = require('http');
const fs = require('fs');
const os = require('os')
const port = 4000;
const hostName = '127.0.0.1';

const server = http.createServer((req, res) => {
    
    const urlPath = req.url
    if (urlPath == '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html')
        fs.readFile('./pages/index.html', (err, data) => {
            if (err) {
                console.log(err)
            }else {
                res.write(data)
            }
            res.end()
        })
    }else if (urlPath == '/about') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        fs.readFile('./pages/about.html', (err, data) => {
            if (err) {
                console.log(err)
            }else {
                res.write(data)
            }
            res.end()
        })
    }else if (urlPath == '/sys') {
        const data = {
            hostname : os.hostname(),
            platform : os.platform(),
            architecture : os.arch(),
            numberOfCPUS : os.cpus(),
            networkInterfaces : os.networkInterfaces(),
            uptime : os.uptime()
        }

        fs.writeFile('osinfo.json', JSON.stringify(data), (err) => {
            if (err) {
                console.log(err)
            }else {
                console.log('File successfully created')
            }
        })

        res.statusCode = 201;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Your os info has been saved successfully!')
    }else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        fs.readFile('./pages/404.html', (err, data) => {
            if (err) {
                console.log(err)
            }else {
                res.write(data)
            }
            res.end()
        })
    }
})

server.listen(port, hostName,() => {
    console.log(`Listening for request at: http://${hostName}:${port}`)
})