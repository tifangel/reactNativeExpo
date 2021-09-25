import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { RootStackScreenProps } from '_types';

const SplashScreen = ({ navigation }: RootStackScreenProps<'Splash'>) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Root');
        }, 3000);

        return () => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Root' }]
            });
        }

    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Splash Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default SplashScreen
