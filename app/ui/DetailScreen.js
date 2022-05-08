import { Text, View, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from '../res/styles';


export default function DetailScreen({ route }) {
    const { name, data } = route.params;
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={styles.title}>{name}</Text>

            <View style={styles.paragraph_card}>
            <ScrollView>
                <Text style={{paddingVertical:8}}>{(JSON.stringify(data)).replace(/,/g, '\n').replace(/{/g, '').replace(/}/g, '')}</Text>
            </ScrollView>
            </View>
        </View>
    );
}