import View, { StyleSheet } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import styles from './styles';

const Loading = () => {
    return (
        <View style={styles.container}>
            <LottieView
                source={require('../../assets/animations/loading.json')}
                autoPlay
                loop
                style={styles.loading}
            />
        </View>
    )
}

export default Loading;