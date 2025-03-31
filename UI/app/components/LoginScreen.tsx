import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Title, Button, Card } from 'react-native-paper';

const LoginScreen = ({ navigation }: any) => {
    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '280877952648-3ric5k4f27s6l6ut1kavp6tj53jk18kd.apps.googleusercontent.com',
        });
    }, []);

    const onGoogleButtonPress = async () => {
        try {
            const signInResult = await GoogleSignin.signIn();
            const idToken = signInResult.data?.idToken || null;
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredential);
        } catch (error: any) {
            console.error(error);
        }
    };

    return (
        <View style={LoginStyles.container}>
            <Card style={LoginStyles.card}>
                <Card.Content>
                    <Title style={LoginStyles.title}>Welcome to ClassmateAI! ✨</Title>
                    <Button
                        icon="google"
                        mode="contained"
                        onPress={onGoogleButtonPress}
                        style={LoginStyles.googleButton}
                        labelStyle={LoginStyles.googleButtonLabel}
                    >
                        Sign in with Google
                    </Button>
                </Card.Content>
            </Card>
        </View>
    );
};

const LoginStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F2F0F5',
        paddingHorizontal: 20,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        elevation: 4,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2C2C2C',
        textAlign: 'center',
        marginBottom: 24,
    },
    googleButton: {
        backgroundColor: '#6F4EA0',
        borderRadius: 8,
        paddingVertical: 6,
    },
    googleButtonLabel: {
        fontSize: 16,
        color: '#FFFFFF',
    },
});


export default LoginScreen;