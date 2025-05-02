import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';


const MainLayout = () => {
    const {isAuthenticated} = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        // Check if user is authenticated and redirect accordingly
        if (isAuthenticated === undefined) return;
        const inApp = segments[0] === 'app';
        if(isAuthenticated && !inApp) {
            // Redirect to app
            router.place('home');
        }else if (!isAuthenticated===false) {
            // Redirect to login
            router.replace('signin');
            
        }
    }, [isAuthenticated]);

  return (
    <View style={styles.container}>
      <Text>Main Layout</Text>
    </View>
  );
}

export default function _layout() {
  return (
    <View>
      <Slot />
    </View>
  );
}