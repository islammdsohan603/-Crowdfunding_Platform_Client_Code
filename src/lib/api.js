'use client';

export const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const getAccessToken = () => {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('access-token') || '';
};

export const saveAccessToken = token => {
  if (typeof window !== 'undefined' && token) {
    localStorage.setItem('access-token', token);
  }
};

export const clearAccessToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access-token');
  }
};

export const apiRequest = async (path, options = {}) => {
  const token = getAccessToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${serverUrl}${path}`, {
    ...options,
    headers,
  });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
};

export const createAccessToken = async email => {
  const res = await fetch(`${serverUrl}/api/jwt`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  if (!res.ok || !data.token) {
    throw new Error(data.message || 'Token request failed');
  }
  saveAccessToken(data.token);
  return data.token;
};

export const uploadToImgBB = async file => {
  const apiKey = process.env.NEXT_PUBLIC_IMAGE_BB_API_KEY || process.env.IMAGE_BB_API_KEY;
  if (!file || !apiKey) return '';

  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: 'POST',
    body: formData,
  });
  const data = await res.json();
  if (!res.ok || !data?.data?.url) {
    throw new Error('Image upload failed');
  }
  return data.data.url;
};
