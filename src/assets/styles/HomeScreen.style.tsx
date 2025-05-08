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
  // Header
  caption: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
  },
  readMoreText: {
    color: 'grey',
    marginTop: 4,
    fontSize: 14,
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
    marginTop: 5,
    marginBottom: 10,
  },
  button: {
    fontSize: 28,
    marginRight: 8,
  },
  count: {
    marginLeft: 4
  },
  // User info
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },  
});
