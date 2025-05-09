import React from 'react';
import { View, Image, StyleSheet, Dimensions, FlatList } from 'react-native';

const numColumns = 3;
const screenWidth = Dimensions.get('window').width;
const padding = 2;
const itemSize = (screenWidth - (numColumns + 1) * padding - 8) / numColumns;

const PostList = ({posts}) => {
    return (
        <FlatList
            data={posts}
            keyExtractor={(item) => item.id.toString()}
            numColumns={numColumns}
            key={numColumns} // Important to avoid FlatList column crash
            renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
                </View>
            )}
        /> 
    )
}

export default PostList;

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


