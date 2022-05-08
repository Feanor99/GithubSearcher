import { StyleSheet, StatusBar } from 'react-native';
import colors from './colors';

const styles = StyleSheet.create({
    title: {
        marginTop: StatusBar.currentHeight,
        textAlign: "center",
        fontSize: 24,
        fontWeight: "bold"
    },

    container: {
        flex: 1,
        backgroundColor: '#fff'
    },

    input: {
        flex: 1,
        height: 40,
        marginStart: 12,
        marginVertical: 12,
        borderWidth: 1,
        padding: 10,
    },

    container_list: {
        flex: 1,
        backgroundColor: '#fff',
        marginHorizontal: 6
    },

    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        borderRadius: 4,
        marginHorizontal: 2,
        marginVertical: 4,
        elevation: 4,
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: colors.secondary,
    },

    item: {
        flex: 1,
        fontSize: 18,
        alignSelf: 'center',
        color: 'black',
    },

    item_row: {
        flexDirection: "row",
        paddingStart: 10,
        marginVertical: 4,
        marginHorizontal: 2,
        elevation: 4,
        borderRadius: 8,
        backgroundColor: 'white'
    },
});

export default styles