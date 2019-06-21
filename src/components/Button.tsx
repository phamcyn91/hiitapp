import * as React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native";
import colors from "../config/colors";

interface Props {
    label: string;
    onPress: () => void;
}

class Button extends React.Component<Props> {
    render() {
        const { label, onPress } = this.props;
        // If the button is disabled we lower its opacity
        const containerStyle = [
            styles.container
        ];
        return (
            <TouchableOpacity
                style={containerStyle}
                onPress={onPress}
            >
                <Text style={styles.text}>{label}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.NEW_ORANGE,
        elevation: 3,
        marginBottom: 12,
        paddingVertical: 12,
        borderRadius: 4,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.ORANGE
    },
    text: {
        color: colors.WHITE,
        textAlign: "center",
        height: 20
    }
});

export default Button;