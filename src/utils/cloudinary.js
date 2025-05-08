export const uploadImageToCloudinary = async (imageUri) => {
    const data = new FormData();
    data.append('file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'upload.jpg',
    });
    data.append('upload_preset', 'default');
    data.append('cloud_name', 'dnwjfkzcn');
  
    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dnwjfkzcn/image/upload', {
        method: 'POST',
        body: data,
      });
      const json = await res.json();
      console.log('Cloudinary Upload Response:', json);
  
      return json.secure_url.replace('/upload/', '/upload/c_fill,g_auto,w_800,h_300,q_auto/');
    } catch (err) {
      console.error('Cloudinary Upload Error:', err);
      return null;
    }
  };
  