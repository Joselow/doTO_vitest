import fs from 'node:fs/promises'


export const writeTasks = async (path, data) => {
  try {
    await fs.writeFile(path, JSON.stringify(data, null, 2))
    return {
      success: true
    }
  } catch (error) {
    console.log(error);
    return {
      success: false
    }
  }
}