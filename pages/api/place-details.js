// pages/api/place-details.js

// export default async function handler(req, res) {
//     const { placeId } = req.query;
//     const apiKey = process.env.NEXT_PUBLIC_MAP_API_KEY; // Assuming you've stored your API key as an environment variable
  
//     try {
//       const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`);
//       const data = await response.json();
//       res.status(response.status).json(data);
//     } catch (error) {
//       console.error('Error fetching place details:', error);
//       res.status(500).json({ error: 'Error fetching place details' });
//     }
//   }
  

export default async function handler(req, res) {
    const {key } = req.query;
    const apiKey = process.env.NEXT_PUBLIC_MAP_API_KEY; // Assuming you've stored your API key as an environment variable
    // const apiUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(key)}&inputtype=textquery&fields=place_id&key=${apiKey}`;
    const apiUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(key)}&inputtype=textquery&fields=place_id,formatted_address,geometry,name,photos,rating,opening_hours,types&key=${apiKey}`;


    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status === 'OK' && data.candidates && data.candidates.length > 0) {
        console.log("data",{data})
        res.status(response.status).json(data);
      } else {
        throw new Error('Place ID not found');
      }
    } catch (error) {
      console.error('Error fetching place details:', error);
      res.status(500).json({ error: 'Error fetching place details' });
    }
  }