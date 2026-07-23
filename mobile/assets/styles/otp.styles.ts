import { StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";

export const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: Colors.surface },
    kav: { flex: 1 },
    scroll: { padding: 28, paddingTop: 40 },

    // Logo
    logoRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 40 },
    logoBox: {
        width: 44,
        height: 44,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
    },
    appName: { fontSize: 22, fontWeight: "500", color: Colors.onSurface, letterSpacing: -0.5 },

    // Hero text
    heading: { fontSize: 30, fontWeight: "500", color: Colors.onSurface, letterSpacing: -0.5, marginBottom: 6 },
    subheading: { fontSize: 14, color: Colors.onSurfaceVariant, marginBottom: 32, lineHeight: 20 },

    // OTP boxes
    otpRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 32,
    },
    otpBox: {
        width: 46,
        height: 54,
        borderRadius: 14,
        backgroundColor: Colors.surfaceLow,
        borderWidth: 2,
        borderColor: "transparent",
        fontSize: 20,
        fontWeight: "600",
        color: Colors.onSurface,
    },
    otpBoxFilled: {
        borderColor: Colors.primary,
        backgroundColor: Colors.surfaceLowest,
    },

    // Resend row
    resendRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        marginBottom: 8,
    },
    toggleText: { fontSize: 13, color: Colors.onSurfaceVariant },
    toggleLink: { fontSize: 13, fontWeight: "600", color: Colors.primary },
    timerText: { fontSize: 13, fontWeight: "600", color: Colors.outline },

    // Verify button
    btnWrapper: { marginTop: 8, borderRadius: 18, overflow: "hidden" },
    btn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        paddingVertical: 16,
        paddingHorizontal: 24,
    },
    btnDisabled: {
        opacity: 0.5,
    },
    btnText: { fontSize: 15, fontWeight: "500", color: Colors.onPrimary },
});