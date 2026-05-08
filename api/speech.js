import { tts } from 'openai-edge-tts';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { input, voice = 'zh-CN-XiaoxiaoNeural' } = req.body;
    if (!input) return res.status(400).json({ error: 'input 不能为空' });

    const audioStream = await tts(input, voice);
    res.setHeader('Content-Type', 'audio/mpeg');
    audioStream.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

export const config = {
  api: {
    bodyParser: true,
    responseLimit: false,
  },
};
