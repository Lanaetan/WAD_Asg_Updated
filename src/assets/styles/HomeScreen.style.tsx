import {StyleSheet} from 'react-native';

export default StyleSheet.create({
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
  // Post item
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
  header: {

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
  // Image
  imageContainer: {
    marginTop: 12,
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#eee',
  },
  postImage: {
    width: '100%',
  },
  noImageText: {
    textAlign: 'center',
    padding: 20,
    color: '#999',
  },
  // Footer
  footer: {
    marginTop: 5,
  },
  timeInfo: {
    fontSize: 14,
    color: '#666',
  },
  // Post Buttons
  ButtonTab: {
    flexDirection: 'row',
    
  },
  button: {
    fontSize: 28,
    marginRight: 8,
  },
});
