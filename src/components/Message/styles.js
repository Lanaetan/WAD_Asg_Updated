import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      margin: 3,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 10,
      maxWidth: '80%',
      minWidth: '40%',
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      flexDirection: 'column',
    },
    text: {
      color: 'black',
      fontSize: 15,
    },
    timeRow: {
      flexDirection: 'row',
      justifyContent: 'flex-end', 
      marginTop: 3,
    },
    time: {
      color: 'gray',
      fontSize: 12,
    },
  });

  export default styles;