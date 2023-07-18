import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const jsonData = JSON.stringify(data);

    // Write JSON data to a file
    const filePath = path.join(process.cwd(), 'info.json');
    fs.writeFile(filePath, jsonData, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to save data.' });
        return;
      }
      res.status(200).json({ message: 'Data saved successfully.' });
    });

  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }

}