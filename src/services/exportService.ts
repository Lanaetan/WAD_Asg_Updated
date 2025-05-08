import RNFS from 'react-native-fs';

export async function exportData(data: any[], fileName = 'export.json') {
    const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
    await RNFS.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    return filePath;
  }
  