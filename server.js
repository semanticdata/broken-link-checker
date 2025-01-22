const express = require('express');
const cors = require('cors');
const blc = require('broken-link-checker');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/check-links', (req, res) => {
    const { url } = req.body;
    const brokenLinks = [];
    const workingLinks = [];

    const options = {
        filterLevel: 0,
        excludeExternalLinks: false,
        excludeInternalLinks: false,
        excludeLinksToSamePage: false,
    };

    const siteChecker = new blc.SiteChecker(options, {
        link: (result) => {
            const linkInfo = {
                url: result.url.resolved,
                text: result.html.text || '',
                broken: result.broken,
                brokenReason: result.broken ? result.brokenReason : null
            };
            
            if (result.broken) {
                brokenLinks.push(linkInfo);
            } else {
                workingLinks.push(linkInfo);
            }
        },
        end: () => {
            res.json({ brokenLinks, workingLinks });
        },
        error: (error) => {
            console.error(error);
        }
    });

    siteChecker.enqueue(url);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 