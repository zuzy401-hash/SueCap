
import { GoogleGenAI, Modality, Type, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

// Custom hook-like service logic to ensure we get a fresh instance
const getAIClient = () => new GoogleGenAI({ apiKey: API_KEY });

export const checkVeoKey = async () => {
  if (typeof window.aistudio?.hasSelectedApiKey === 'function') {
    return await window.aistudio.hasSelectedApiKey();
  }
  return false;
};

export const openVeoKeyDialog = async () => {
  if (typeof window.aistudio?.openSelectKey === 'function') {
    await window.aistudio.openSelectKey();
    return true;
  }
  return false;
};

export const generateImage = async (prompt: string, styleModifier: string, quality: '1K' | '2K' | '4K' = '1K') => {
  const ai = getAIClient();
  const model = quality === '1K' ? 'gemini-2.5-flash-image' : 'gemini-3-pro-image-preview';
  
  const fullPrompt = `${prompt}. Style: ${styleModifier}`;
  
  const response = await ai.models.generateContent({
    model: model,
    contents: { parts: [{ text: fullPrompt }] },
    config: {
      imageConfig: {
        aspectRatio: "1:1",
        imageSize: quality
      }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  throw new Error("No image data received from API");
};

export const generateVideo = async (prompt: string, aspectRatio: '16:9' | '9:16' = '16:9') => {
  const ai = getAIClient();
  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: prompt,
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio: aspectRatio
    }
  });

  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 8000));
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (!downloadLink) throw new Error("Video generation failed to return a link");
  
  const response = await fetch(`${downloadLink}&key=${API_KEY}`);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};

export const generateTTS = async (text: string, voice: string = 'Kore') => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: `Say this precisely: ${text}` }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: voice },
        },
      },
    },
  });

  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!base64Audio) throw new Error("No audio data received");
  return base64Audio;
};

// Utils for audio handling
export const decodeBase64Audio = async (base64: string, ctx: AudioContext) => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  const dataInt16 = new Int16Array(bytes.buffer);
  const buffer = ctx.createBuffer(1, dataInt16.length, 24000);
  const channelData = buffer.getChannelData(0);
  for (let i = 0; i < dataInt16.length; i++) {
    channelData[i] = dataInt16[i] / 32768.0;
  }
  return buffer;
};
