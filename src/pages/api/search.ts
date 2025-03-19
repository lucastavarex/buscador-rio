import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { q } = req.query;
  const token = process.env.NEXT_PUBLIC_TYPESENSE_API_KEY;
  const headers = { Authorization: `Bearer ${token}` };

  try {
    const response = await fetch(
      `https://busca.dados.rio/search/hybrid?q=${q}&c=carioca-digital-gemini&use_gemini=true`,
      {
        headers,
      }
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
} 