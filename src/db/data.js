
const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const getFundedData = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/funded/data`, { cache: 'no-store' });

    if (!res.ok) {
      throw new Error("Faild Data")
    }

    return await res.json()

  } catch (error) {
    console.log("Data Error", error)
  }
}

// all data call api

export const getAllData = async () => {
  try {

    const res = await fetch(`${baseUrl}/api/all/data`, { cache: 'no-store' })

    if (!res.ok) {
      throw new Error("Error in data call")
    }

    return await res.json()

  } catch (error) {
    console.log("All Data Error", error)
  }
}
