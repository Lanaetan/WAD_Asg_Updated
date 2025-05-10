import { StyleSheet, Dimensions } from "react-native";

const numColumns = 3;
const screenWidth = Dimensions.get('window').width;
const padding = 2;
const itemSize = (screenWidth - (numColumns + 1) * padding - 8) / numColumns;

const styles = StyleSheet.create({
  itemContainer: {
    width: itemSize,
    height: itemSize,
    margin: padding,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
}); 

export default styles;
