import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  imageWrapper: {
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 5,
  },
  overlayText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -75 }, { translateY: -10 }],
    width: 150,
    textAlign: 'center',
    color: '#555',
  },
  postButton: {
    backgroundColor: '#102E50',
    padding: 15,
    borderRadius: 5,
  },
  postButtonDisabled: {
    backgroundColor: '#7a93a9',
  },
  postButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
