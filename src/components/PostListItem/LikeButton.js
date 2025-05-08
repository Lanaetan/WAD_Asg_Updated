import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../assets/styles/HomeScreen.style';

const Button = () => {
    const [isLiked, setIsLiked] = useState(false);

    const toggleLike = () => {
        setIsLiked(!isLiked);
    };

    console.log("Like set to: ", isLiked);

    return (
        <View>
            {/* Like Button */}
            <TouchableOpacity onPress={() => toggleLike()}>
                <Ionicons  
                    style={styles.button}
                    name={isLiked ? 'heart-outline' : 'heart'}
                    color="#ff6347"
                />
            </TouchableOpacity>
        </View>
    );
};

export default Button;