const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';

export const getFundedData = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/funded/data`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Failed Data");
    return await res.json();
  } catch (error) {
    console.error("Data Error", error);
  }
};

// All campaigns fetch with pagination and filtering support
export const getAllData = async (page = 1, limit = 6, category = 'all') => {
  try {
    let url = `${baseUrl}/api/all/data?page=${page}&limit=${limit}`;


    if (category && category !== 'all') {
      url += `&category=${encodeURIComponent(category)}`;
    }

    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error("Error in data call");
    return await res.json();
  } catch (error) {
    console.error("All Data Error", error);
    return { success: false, data: [], totalPages: 1 };
  }
};

// Single data api

export const getSingleData = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/api/details/${id}`, { cache: 'no-store' })

    if (!res) {
      throw new Error("Error in data call");
    }

    return await res.json()

  } catch (error) {
    console.error("Data Error", error);
  }
}

