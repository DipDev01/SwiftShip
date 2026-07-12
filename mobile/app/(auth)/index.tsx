import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '@/assets/styles/AuthScreen.styles';
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from '@/constants/Colors';
import { SvgXml } from 'react-native-svg'
import { TextInput } from 'react-native-gesture-handler';
import { Ionicons } from "@expo/vector-icons"

type Mode = "login" | "register"

export default function AuthScreen() {
    const router = useRouter();

    const [mode, setMode] = useState<Mode>("register")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState<boolean>(false)

    const svgMarkup = `<svg width="55" height="86" viewBox="0 0 55 86" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m11.896 85.203 4.879-28.693 24.182-24.286 11.895 11.843zM43.104 0l-4.879 28.693-24.182 24.286L2.148 41.136z" fill="#005eff"/></svg>`

    const handleSubmit = async () => {
        setLoading(true);
        try {
            if (mode === 'login') {
                console.log("Logging in with:", { email, password });
            } else {
                console.log("Registering with:", { name, email, password });
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safe}>
            <KeyboardAvoidingView style={styles.kav} behavior={Platform.OS === "ios" ? "padding" : undefined}>
                <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

                    {/* Logo */}
                    <View style={styles.logoRow}>
                        <LinearGradient colors={[Colors.primary, Colors.primaryContainer]} style={styles.logoBox}>
                            <SvgXml xml={svgMarkup} width="50%" height="50%" />
                        </LinearGradient>
                        <Text style={styles.appName}>SwiftShip</Text>
                    </View>

                    {/* Hero text */}
                    <Text style={styles.heading}>{mode === "login" ? "Welcome back 👋" : "Create account"}</Text>
                    <Text style={styles.subheading}>{mode === "login" ? "Sign in to ship items." : "Fill in your details to get started."}</Text>

                    {/* Form */}
                    <View style={styles.form}>
                        {mode === "register" && (
                            <View style={styles.field}>
                                <Text style={styles.fieldLabel}>Full Name</Text>
                                <TextInput
                                    style={styles.input}
                                    value={name}
                                    onChangeText={setName}
                                    placeholder='Your name'
                                    placeholderTextColor={Colors.outlineVariant}
                                    autoCapitalize='words' 
                                />
                            </View>
                        )}

                        <View style={styles.field}>
                            <Text style={styles.fieldLabel}>Email</Text>
                            <TextInput
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                                placeholder='example@gmail.com'
                                placeholderTextColor={Colors.outlineVariant}
                                keyboardType='email-address'
                                autoCapitalize='none' 
                            />
                        </View>

                        <View style={styles.field}>
                            <Text style={styles.fieldLabel}>Password</Text>
                            <TextInput
                                style={styles.input}
                                value={password}
                                onChangeText={setPassword}
                                placeholder='*******'
                                placeholderTextColor={Colors.outlineVariant}
                                secureTextEntry 
                            />
                        </View>

                        {/* Toggle mode */}
                        <View style={styles.toggleRow}>
                            <Text style={styles.toggleText}>
                                {mode === "login" ? "Don't have an account?" : "Already have an account?"}
                            </Text>
                            <TouchableOpacity onPress={() => setMode(mode === "login" ? "register" : "login")}>
                                <Text style={styles.toggleLink}>{mode === 'login' ? 'Sign up' : 'Sign in'}</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Submit Button */}
                        <TouchableOpacity 
                            disabled={loading} 
                            activeOpacity={0.88} 
                            style={styles.btnWrapper}
                            onPress={handleSubmit}
                        >
                            <LinearGradient 
                                colors={[Colors.primary, Colors.primaryContainer]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.btn}
                            >
                                {loading ? (
                                    <ActivityIndicator color={Colors.onPrimary} size="small" />
                                ) : (
                                    <>
                                        <Text style={styles.btnText}>
                                            {mode === 'login' ? "Sign In" : "Create Account"}
                                        </Text>
                                        <Ionicons name='arrow-forward' size={18} color={Colors.onPrimary} />
                                    </>
                                )}
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}