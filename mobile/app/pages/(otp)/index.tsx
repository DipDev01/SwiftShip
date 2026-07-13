import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput as RNTextInput,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "@/assets/styles/otp.styles";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { SvgXml } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";

const OTP_LENGTH = 6;
const RESEND_TIMEOUT = 60;

export default function OtpScreen() {
  const router = useRouter();

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState<boolean>(false);
  const [resending, setResending] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(RESEND_TIMEOUT);

  const inputRefs = useRef<Array<RNTextInput | null>>([]);

  const svgMarkup = `<svg width="55" height="86" viewBox="0 0 55 86" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m11.896 85.203 4.879-28.693 24.182-24.286 11.895 11.843zM43.104 0l-4.879 28.693-24.182 24.286L2.148 41.136z" fill="#005eff"/></svg>`;

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (text: string, index: number) => {
    const value = text.replace(/[^0-9]/g, "");
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const isOtpComplete = otp.every((digit) => digit.length === 1);

  const handleVerify = async () => {
    if (!isOtpComplete || loading) return;
    setLoading(true);
    try {
      console.log("Verifying OTP:", otp.join(""));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0 || resending) return;
    setResending(true);
    try {
      console.log("Resending OTP");
      setOtp(Array(OTP_LENGTH).fill(""));
      setTimer(RESEND_TIMEOUT);
      inputRefs.current[0]?.focus();
    } catch (error) {
      console.error(error);
    } finally {
      setResending(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.kav}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo */}
          <View style={styles.logoRow}>
            <LinearGradient
              colors={[Colors.primary, Colors.primaryContainer]}
              style={styles.logoBox}
            >
              <SvgXml xml={svgMarkup} width="50%" height="50%" />
            </LinearGradient>
            <Text style={styles.appName}>SwiftShip</Text>
          </View>

          {/* Hero text */}
          <Text style={styles.heading}>Verify Your Account 🔐</Text>
          <Text style={styles.subheading}>
            We sent a 6-digit verification code to your email.
          </Text>

          {/* OTP Boxes */}
          <View style={styles.otpRow}>
            {otp.map((digit, index) => (
              <RNTextInput
                key={index}
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                style={[styles.otpBox, digit ? styles.otpBoxFilled : undefined]}
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
              />
            ))}
          </View>

          {/* Resend row */}
          <View style={styles.resendRow}>
            <Text style={styles.toggleText}>Didnot receive the code? </Text>
            {timer > 0 ? (
              <Text style={styles.timerText}>Resend in {timer}s</Text>
            ) : (
              <TouchableOpacity onPress={handleResend} disabled={resending}>
                {resending ? (
                  <ActivityIndicator color={Colors.primary} size="small" />
                ) : (
                  <Text style={styles.toggleLink}>Resend Code</Text>
                )}
              </TouchableOpacity>
            )}
          </View>

          {/* Verify Button */}
          <TouchableOpacity
            disabled={!isOtpComplete || loading}
            activeOpacity={0.88}
            style={styles.btnWrapper}
            onPress={handleVerify}
          >
            <LinearGradient
              colors={[Colors.primary, Colors.primaryContainer]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.btn, !isOtpComplete && styles.btnDisabled]}
            >
              {loading ? (
                <ActivityIndicator color={Colors.onPrimary} size="small" />
              ) : (
                <>
                  <Text style={styles.btnText}>Verify</Text>
                  <Ionicons
                    name="arrow-forward"
                    size={18}
                    color={Colors.onPrimary}
                  />
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
