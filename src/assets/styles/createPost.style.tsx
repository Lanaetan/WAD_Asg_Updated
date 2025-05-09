import { StyleSheet, Dimensions } from 'react-native';

// Get device width for responsive sizing
const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 16,
  },
  // Header styling
  header: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  placeholder: {
    width: 40,
  },
  // Input fields
  input: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    textAlignVertical: 'top',
    backgroundColor: '#fafafa',
    fontSize: 16,
  },
  captionInput: {
    minHeight: 100,
    marginBottom: 24,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  // Image handling
  imageWrapper: {
    width: '100%',
    height: width * 0.8,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    backgroundColor: '#f8f8f8',
  },
  imageWrapperWithImage: {
    borderStyle: 'solid',
    borderColor: '#eee',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  overlayText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -75 }, { translateY: -10 }],
    width: 150,
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
  },
  // Button styling
  postButton: {
    backgroundColor: '#102E50',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postButtonDisabled: {
    backgroundColor: '#7a93a9',
    elevation: 1,
  },
  postButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  draftMessage: {
    marginHorizontal: 50,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffcc',
    borderWidth: 1,
    borderColor: 'darkyellow',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    zIndex: 9999,
  },
});