import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginHorizontal: 10,
      marginVertical: 5,
      height: 60,
      alignItems: 'center',
    },
    image: {
      width: 55,
      height: 55,
      borderRadius: 30,
      marginRight: 10,
    },
    content: {
      flex: 1,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBlockColor: 'lightgray',
      padding: 5,
    },
    row: {
      flexDirection: 'row',
      marginBottom: 5,
    },
    name: {
      flex: 1,
      fontWeight: 'bold',
      fontSize: 17,
      fontFamily: "Anta-Regular",
    },
    subTitle: {
      color: 'gray',
      fontSize: 14,
    },
    createdAt: {
      fontSize: 13,
      marginRight: 5,
    }
  })

  export default styles;
