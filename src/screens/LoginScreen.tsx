import * as React from "react";
import {
    Image,
    KeyboardAvoidingView,
    StyleSheet,
    View
} from "react-native";
import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";
import { imageLogo } from "../assets/images/index";
import colors from "../config/colors";
import strings from "../config/strings";
import constants from "../config/constants";

interface State {
    email: string;
    password: string;
    emailTouched: boolean;
    passwordTouched: boolean;
}

class LoginScreen extends React.Component<{}, State> {
    passwordInputRef = React.createRef<FormTextInput>();

    readonly state: State = {
        email: "",
        password: "",
        emailTouched: false,
        passwordTouched: false
    };

    handleEmailChange = (email: string) => {
        this.setState({ email: email });
    };

    handlePasswordChange = (password: string) => {
        this.setState({ password: password });
    };

    handleEmailSubmitPress = () => {
        if (this.passwordInputRef.current) {
            this.passwordInputRef.current.focus();
        }
    };

    handleEmailBlur = () => {
        this.setState({ emailTouched: true });
    };

    handlePasswordBlur = () => {
        this.setState({ passwordTouched: true });
    };

    handleLoginPress = () => {
        console.log("Login button pressed");
    };

    render() {
        const {
            email,
            password,
            emailTouched,
            passwordTouched
        } = this.state;
        return (
            <KeyboardAvoidingView
                style={styles.container}
                // On Android the keyboard behavior is handled
                // by Android itself, so we should disable it
                // by passing `undefined`.
                behavior={constants.IS_IOS ? "padding" : undefined}
            >
                <Image source={imageLogo} style={styles.logo} />
                <View style={styles.form}>
                    <FormTextInput
                        value={this.state.email}
                        onChangeText={this.handleEmailChange}
                        onSubmitEditing={this.handleEmailSubmitPress}
                        autoCorrect={false}
                        keyboardType="email-address"
                        returnKeyType="next"
                        onBlur={this.handleEmailBlur}
                        label={strings.EMAIL_PLACEHOLDER}
                        // `blurOnSubmit` causes a keyboard glitch on
                        // Android when we want to manually focus the
                        // next input.
                        blurOnSubmit={constants.IS_IOS}
                    />
                    <FormTextInput
                        ref={this.passwordInputRef}
                        value={this.state.password}
                        onChangeText={this.handlePasswordChange}
                        secureTextEntry={true}
                        returnKeyType="done"
                        onBlur={this.handlePasswordBlur}
                        label={strings.PASSWORD_PLACEHOLDER}
                    />
                    <Button
                        label={strings.LOGIN}
                        onPress={this.handleLoginPress}
                    />
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 20
    },
    logo: {
        flex: 1,
        width: "100%",
        resizeMode: "contain",
        alignSelf: "center"
    },
    form: {
        flex: 1,
        justifyContent: "center",
        width: "80%",
        color: colors.WHITE
    }
});

export default LoginScreen;