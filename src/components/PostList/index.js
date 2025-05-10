import React from 'react';
import { View, Image, Dimensions, FlatList } from 'react-native';
import styles from './styles';

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


