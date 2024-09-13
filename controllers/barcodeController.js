const axios = require('axios');
const { apiKey, externalUserId } = require('../config/config');

async function createChatSession() {
  try {
    const response = await axios.post(
      'https://api.on-demand.io/chat/v1/sessions',
      {
        pluginIds: [],
        externalUserId: externalUserId
      },
      {
        headers: {
          apikey: apiKey
        }
      }
    );
    return response.data.data.id; // Extract session ID
  } catch (error) {
    console.error('Error creating chat session:', error);
    throw error; // Rethrow the error to be handled by the route
  }
}

async function submitQuery(sessionId, query) {
  try {
    const response = await axios.post(
      `https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`,
      {
        endpointId: 'predefined-openai-gpt4o',
        query: query,
        pluginIds: ['plugin-1726240248'],
        responseMode: 'sync'
      },
      {
        headers: {
          apikey: apiKey
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error submitting query:', error);
    throw error; // Rethrow the error to be handled by the route
  }
}

// Route handler for barcode scanning
exports.handleBarcodeScan = async (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: 'Query is required in the request body' });
  }

  try {
    const sessionId = await createChatSession();
    if (sessionId) {
      const queryResponse = await submitQuery(sessionId, query);
      res.json(queryResponse);
    } else {
      res.status(500).json({ error: 'Failed to create chat session' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error processing the request' });
  }
};
