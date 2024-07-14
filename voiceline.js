const express = require('express');
const twilio = require('twilio');
const app = express();

// Serve static files from the current directory
app.use(express.static(__dirname));

app.use(express.urlencoded({ extended: true }));

app.post('/answer', (req, res) => {
    try {
        console.log('Incoming request:', req.body);
        const twiml = new twilio.twiml.VoiceResponse();
        // Point to the local file served by Express
        twiml.play(`http://${req.headers.host}/audio.mp3`);
        res.type('text/xml');
        res.send(twiml.toString());
        console.log('Response sent:', twiml.toString());
    } catch (error) {
        console.error('Error handling /answer:', error);
        res.status(500).send('Internal Server Error');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
