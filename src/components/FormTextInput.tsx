import * as React from "react";
import {
    Animated,
    NativeSyntheticEvent,
    Platform,
    StyleSheet,
    TextInput,
    TextInputFocusEventData,
    TextInputProps,
    View
} from "react-native";
import colors from "../config/colors";

type Props = TextInputProps & {
    label: string;
};

interface State {
    isFocused: boolean;
    position: Animated.Value;
}

class FormTextInput extends React.Component<Props, State> {
    textInputRef = React.createRef<TextInput>();

    readonly state: State = {
        isFocused: false,
        position: new Animated.Value(0)
    };

    focus = () => {
        if (this.textInputRef.current) {
            this.textInputRef.current.focus();
        }
    };

    handleFocus = (
        e: NativeSyntheticEvent<TextInputFocusEventData>
    ) => {
        this.setState({ isFocused: true });
        Animated.timing(this.state.position, {
            toValue: 1,
            duration: 150,
        }).start();
        // Remember to propagate the `onFocus` event to the
        // parent as well (if set)
        if (this.props.onFocus) {
            this.props.onFocus(e);
        }
    };

    handleBlur = (
        e: NativeSyntheticEvent<TextInputFocusEventData>
    ) => {
        this.setState({ isFocused: false });
        Animated.timing(this.state.position, {
            toValue: 0,
            duration: 150,
        }).start();
        if (this.props.value) {
            this.setState({ position: new Animated.Value(1) })
        }
        // Remember to propagate the `onBlur` event to the
        // parent as well (if set)
        if (this.props.onBlur) {
            this.props.onBlur(e);
        }
    };

    _returnAnimatedLabelStyles = () => {
        const isFocused = this.state.isFocused;
        return {
            top: this.state.position.interpolate({
                inputRange: [0, 1],
                outputRange: [14, 0],
            }),
            fontSize: isFocused ? 12 : this.props.value ? 12 : 15
        }
    }

    render() {
        // On Android we want to change the color of the input
        // underline when it is focused. To do so this component
        // must be aware of being focused, so we'll use the
        // TextInput `onFocus` and `onBlur` callbacks to set
        // a variable in the state that keeps track of when the
        // TextInput is focused.
        // We should also make sure to remove the `onFocus` and
        // `onBlur` props from the `...otherProps`, otherwise
        // they would override our own handlers.
        const {
            onFocus,
            onBlur,
            style,
            placeholder,
            ...otherProps
        } = this.props;
        const { isFocused } = this.state;

        return (
            <View style={[styles.container, style]}>
                <Animated.Text
                    style={[styles.label, this._returnAnimatedLabelStyles()]}
                >
                    {this.props.label}
                </Animated.Text>
                <TextInput
                    ref={this.textInputRef}
                    selectionColor={colors.BLACK}
                    placeholderTextColor={colors.BLACK}
                    underlineColorAndroid={
                        isFocused
                            ? colors.ORANGE
                            : colors.LIGHT_GRAY
                    }
                    style={styles.textInput}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    {...otherProps}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 4,
        width: "100%",
        height: 50
    },
    textInput: {
        height: 40,
        marginTop: 5,
        color: 'dimgrey',
        ...Platform.select({
            ios: {
                borderColor: colors.BLACK,
                borderBottomWidth: StyleSheet.hairlineWidth
            },
            // The underline on Android is slightly misaligned so
            // we fix it by adding a left padding here...
            android: {
                paddingLeft: 6
            }
        })
    },
    label: {
        position: 'absolute',
        left: 5
    }
});

export default FormTextInput;