const express = require('express');
const bodyParser = require('body-parser');
const { OAuth2Client } = require('google-auth-library');

const app = express();
const port = 5001;

const clientId = '220683273277-rjmqi70tunn6cq6516qs0iemij5jheuv.apps.googleusercontent.com';
const client = new OAuth2Client(clientId);

app.use(bodyParser.json());

// Add this route to handle GET requests to "/"
app.get('/', (req, res) => {
  res.send('Welcome to the server! The Google login server is up and running.');
});

// Handle Google authentication route
app.post('/auth/google', async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: clientId,
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    
    // Send user information as a response (or you can add it to a database)
    res.status(200).json({ user: payload });
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});