const express = require('express');
const crypto = require('crypto');
const app = express();

app.use(express.json());

let tours = [
    { id: 1, name: "aaa", customers: [] },
    { id: 2, name: "bbb", customers: [] },
];

// Set to Date.now
// let lastModifiedDate = new Date().toUTCString();

// Seting to const value so test requests work as intented 
let lastModifiedDate = "Sun, 27 Oct 2024 09:21:54 GMT";
const maxAge = 200;

// Create hash from all object data as strong ETag
function generateStrongETag(data) {
    return crypto.createHash('md5').update(JSON.stringify(data)).digest('hex');
}

// Create hash only from id and name as weak ETag
function generateWeakETag(data) {
    const weakData = data.map(item => ({ id: item.id, name: item.name }));
    return `W/${crypto.createHash('md5').update(JSON.stringify(weakData)).digest('hex')}`;
}

app.get('/tours', (req, res) => {
    const strongETag = generateStrongETag(tours);
    const weakETag = generateWeakETag(tours);

    res.setHeader('Cache-Control', `private, max-age=${maxAge}`);
    res.setHeader('Last-Modified', lastModifiedDate);

    // Check which ETag to use 
    const useWeakETag = req.query.weak === 'true';
    const currentETag = useWeakETag ? weakETag : strongETag;
    
    res.setHeader('ETag', currentETag);

    const ifNoneMatch = req.headers['if-none-match'];

    // If ETag matches return 304 Not Modified
    if (ifNoneMatch === currentETag) {
        return res.status(304).end(); 
    }

    const ifModifiedSince = req.headers['if-modified-since'];

    // If Last-Modified before If-Modified-Since return 304 Not Modified
    if (ifModifiedSince && new Date(ifModifiedSince) >= new Date(lastModifiedDate)) {
        return res.status(304).end(); 
    }

    res.json(tours);
})

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});