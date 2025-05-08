import RNFS from 'react-native-fs';

// Generate a user-specific file path
function getDraftFilePath(userId: string) {
  return `${RNFS.DocumentDirectoryPath}/draft_${userId}.json`;
}

export async function saveDraftToFile(draft: any, userId: string) {
  const content = JSON.stringify({ text: draft, date: new Date() });
  const path = getDraftFilePath(userId);
  await RNFS.writeFile(path, content, 'utf8');
  console.log(path);
}
export async function loadDraftFromFile(userId: string) {
  try {
    const path = getDraftFilePath(userId);
    const exists = await RNFS.exists(path);
    if (!exists) return null;

    const content = await RNFS.readFile(path, 'utf8');
    return JSON.parse(content);
  } catch (e) {
    console.error('Failed to load draft', e);
    return null;
  }
}

export async function deleteDraftFile(userId: string) {
  const path = getDraftFilePath(userId);
  const exists = await RNFS.exists(path);
  if (exists) {
    await RNFS.unlink(path);
  }
}


  
