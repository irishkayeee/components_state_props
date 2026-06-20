import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Counter } from '@/components/counter';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="light" />
      <Text style={styles.title}>Components, State & Props</Text>

      <View style={styles.content}>
        <Counter />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A0010',
    alignItems: 'center',
  },
  title: {
    color: '#FFE4F0',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 24,
  },
  subtitle: {
    color: '#A0527A',
    fontSize: 13,
    marginTop: 4,
    marginBottom: 8,
  },
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
});