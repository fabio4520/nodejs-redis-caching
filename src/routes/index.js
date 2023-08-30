const express = require('express');
const axios = require('axios');
const router = express.Router();
const client = require('../database');

router.get('/character', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  try {
     await client.get('character', async (err, reply) => {
      //  console.log('en el get');

      if (reply) return res.json(JSON.parse(reply));
    });
    
    const response = await axios.get('https://rickandmortyapi.com/api/character');
    await client.set('character', JSON.stringify(response.data), (err, reply)=> {
      // console.log('en el set');
      // console.log(err);
      // console.log(reply); // 'OK'
      if (reply) return res.json(response.data);
    });
    
  } catch (error) {
    console.log(error);
  }
});

router.get('/character/:id', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  // console.log(req.originalUrl); // character/123
  try {
    await client.get(`character/${req.params.id}`, async (err, reply) => {
      if (reply) return res.json(JSON.parse(reply));
    });
    const response = await axios.get(`https://rickandmortyapi.com/api/character/${req.params.id}`);
    await client.set(`character/${req.params.id}`, JSON.stringify(response.data), (err, reply) => {
      if (reply) return res.json(response.data);
    });
  } catch (error) {
    return res.status(404).json({ error: 'Character not found' });
  }
});

module.exports = router;