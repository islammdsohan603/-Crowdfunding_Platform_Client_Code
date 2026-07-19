const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const getFundedData = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/funded/data`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Failed Data");
    return await res.json();
  } catch (error) {
    console.error("Data Error", error);
  }
};

// All campaigns fetch with pagination support
export const getAllData = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/all/data?page=1&limit=6`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Error in data call");
    return await res.json();
  } catch (error) {
    console.error("All Data Error", error);
    return { success: false, data: [], totalPages: 1 };
  }
};