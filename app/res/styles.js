import { StyleSheet } from 'react-native';
import colors from './colors';

const styles = StyleSheet.create({
    title: {
        marginTop: "10%",
        textAlign: "center",
        fontSize: 24,
        fontWeight: "bold"
    },

    container: {
        flex: 1,
        backgroundColor: '#fff'
    },

    statusbar: {
        backgroundColor: colors.secondary
    },

    input: {
        flex: 1,
        height: 40,
        marginStart: 12,
        marginVertical: 12,
        borderWidth: 1,
        padding: 10,
      },
});

export default styles