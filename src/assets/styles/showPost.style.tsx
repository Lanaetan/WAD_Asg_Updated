import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: '100%',
  },
  postCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 2,
  },
  caption: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  postInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  imageContainer: {
    marginTop: 12,
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#eee',
  },
  postImage: {
    width: '100%',
    // Height will be dynamically calculated based on the image's aspect ratio
  },
  noImageText: {
    textAlign: 'center',
    padding: 20,
    color: '#999',
  },
});
