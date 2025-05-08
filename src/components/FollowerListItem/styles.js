import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20
    },
    input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      paddingHorizontal: 15,
      marginTop: 10,
      marginBottom: 10,
      borderRadius: 20,
      backgroundColor: 'lightgrey',
    },
    item: {
      fontSize: 16,
      marginVertical: 6,
      paddingHorizontal: 15,
    },
    content: {
      flexDirection: 'row',
      paddingVertical: 5,
      alignItems: 'center',
    },
    image: {
      width: 55,
      height: 55,
      borderRadius: 40,
    }
  });

  export default styles;
  