import { useCallback, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const START_VALUE = 100;
const HOLD_INITIAL_DELAY = 400;
const HOLD_REPEAT_INTERVAL = 80;

export function Counter() {
  const [count, setCount] = useState(START_VALUE);
  const holdTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const holdInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopHold = useCallback(() => {
    if (holdTimeout.current) { clearTimeout(holdTimeout.current); holdTimeout.current = null; }
    if (holdInterval.current) { clearInterval(holdInterval.current); holdInterval.current = null; }
  }, []);

  const startHold = useCallback((step: number) => {
    setCount((c) => c + step);
    holdTimeout.current = setTimeout(() => {
      holdInterval.current = setInterval(() => {
        setCount((c) => c + step);
      }, HOLD_REPEAT_INTERVAL);
    }, HOLD_INITIAL_DELAY);
  }, []);

  const tally = Array.from({ length: Math.min(Math.abs(count), 50) }, (_, i) =>
    (i > 0 && (i + 1) % 5 === 0) ? '|||| ' : '| '
  ).join('');

  return (
    <View style={styles.page}>
      {/* Spiral holes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <View key={i} style={[styles.ring, { top: 40 + i * 56 }]} />
      ))}
      <View style={styles.spiralLine} />

      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.tape} />
          <Text style={styles.pageTitle}>Ako ang Parent Screen</Text>
          <Text style={styles.pageSubtitle}>index.tsx — useState counter demo</Text>
          <View style={styles.stamp}><Text style={styles.stampText}>PARENT</Text></View>
        </View>

        {/* State locker */}
        <Text style={styles.sectionTag}>state locker</Text>
        <View style={styles.stateBox}>
          <Text style={styles.stateLabel}>CURRENT COUNT</Text>
          <Text style={styles.stateValue}>count: {count}</Text>
          <View style={styles.stateUnderline} />
          <View style={styles.cornerFold} />
        </View>

        {/* Child component */}
        <View style={styles.childHeader}>
          <Text style={styles.childHeaderText}>CHILD COMPONENT — CounterDisplay</Text>
        </View>
        <View style={styles.childBox}>
          <View style={styles.blueTape} />
          <Text style={styles.childTitle}>Ako ang Child Component</Text>

          <View style={styles.arrowRow}>
            <Text style={styles.arrowIcon}>↓</Text>
            <Text style={styles.arrowText}>PROPS DATA (Galing sa Parent State)</Text>
          </View>

          <View style={styles.countArea}>
            <Text style={styles.countNum}>{count}</Text>
            <Text style={styles.tally}>{tally || '—'}</Text>
          </View>

          <View style={styles.arrowRow}>
            <Text style={styles.arrowIcon}>↑</Text>
            <Text style={styles.arrowText}>PROPS FUNCTION (Triggers Parent State)</Text>
          </View>

          <View style={styles.btnRow}>
            <Pressable
              style={({ pressed }) => [styles.btn, styles.btnAdd, pressed && styles.btnPressed]}
              onPressIn={() => startHold(1)}
              onPressOut={stopHold}>
              <Text style={styles.btnAddText}>+ Add</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.btn, styles.btnMinus, pressed && styles.btnPressed]}
              onPressIn={() => startHold(-1)}
              onPressOut={stopHold}>
              <Text style={styles.btnMinusText}>- Minus </Text>
            </Pressable>
          </View>

          <Pressable
            style={({ pressed }) => [styles.btnReset, pressed && styles.btnPressed]}
            onPress={() => setCount(START_VALUE)}>
            <Text style={styles.btnResetText}>↺ Reset Count</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const PAPER = '#f5f0e8';
const INK = '#2a1f0e';
const GOLD = '#8B6914';
const MUTED = '#7a6040';
const RULE = 'rgba(150,180,220,0.35)';

const styles = StyleSheet.create({
  page: {
    backgroundColor: PAPER,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#c8b89a',
    width: '100%',
    maxWidth: 360,
    position: 'relative',
    overflow: 'hidden',
  },
  spiralLine: {
    position: 'absolute',
    left: 44,
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: '#c8b89a',
  },
  ring: {
    position: 'absolute',
    left: 36,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#a89070',
    backgroundColor: '#d4c4a8',
    zIndex: 2,
  },
  content: {
    marginLeft: 60,
    padding: 16,
    paddingBottom: 24,
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: GOLD,
    paddingBottom: 10,
    marginBottom: 14,
    position: 'relative',
  },
  tape: {
    position: 'absolute',
    top: -8,
    left: '40%',
    width: 50,
    height: 16,
    backgroundColor: 'rgba(255,240,160,0.75)',
    borderRadius: 2,
  },
  pageTitle: {
    fontFamily: 'serif',
    fontSize: 20,
    fontWeight: '800',
    color: INK,
    marginTop: 8,
  },
  pageSubtitle: {
    fontSize: 12,
    color: MUTED,
    marginTop: 2,
  },
  stamp: {
    position: 'absolute',
    top: 8,
    right: 0,
    borderWidth: 2,
    borderColor: GOLD,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  stampText: {
    fontSize: 10,
    color: GOLD,
    fontWeight: '700',
    letterSpacing: 1,
  },
  sectionTag: {
    fontSize: 11,
    color: '#6a5500',
    backgroundColor: '#fff9c4',
    borderWidth: 1,
    borderColor: '#e0c840',
    paddingHorizontal: 7,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  stateBox: {
    backgroundColor: '#fffde7',
    borderWidth: 1.5,
    borderColor: GOLD,
    borderRadius: 3,
    padding: 10,
    marginBottom: 14,
    position: 'relative',
  },
  stateLabel: {
    fontSize: 10,
    color: MUTED,
    letterSpacing: 1,
    marginBottom: 2,
  },
  stateValue: {
    fontFamily: 'serif',
    fontSize: 24,
    fontWeight: '700',
    color: INK,
  },
  stateUnderline: {
    borderBottomWidth: 2,
    borderBottomColor: GOLD,
    marginTop: 6,
  },
  cornerFold: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 16,
    height: 16,
    backgroundColor: '#e8dfc8',
  },
  childHeader: {
    borderLeftWidth: 3,
    borderLeftColor: '#b0a080',
    paddingLeft: 8,
    marginBottom: 8,
  },
  childHeaderText: {
    fontSize: 10,
    color: GOLD,
    letterSpacing: 1,
  },
  childBox: {
    backgroundColor: '#fafaf5',
    borderWidth: 1.5,
    borderColor: '#b0a080',
    borderRadius: 3,
    padding: 12,
    position: 'relative',
  },
  blueTape: {
    position: 'absolute',
    top: -7,
    left: '30%',
    width: 36,
    height: 16,
    backgroundColor: 'rgba(180,220,255,0.7)',
    borderRadius: 2,
  },
  childTitle: {
    fontSize: 14,
    color: '#4a3820',
    marginBottom: 10,
    marginTop: 4,
  },
  arrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginVertical: 4,
  },
  arrowIcon: {
    color: GOLD,
    fontSize: 14,
  },
  arrowText: {
    fontSize: 10,
    color: GOLD,
    letterSpacing: 0.5,
    flex: 1,
  },
  countArea: {
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#c8b89a',
    marginVertical: 6,
  },
  countNum: {
    fontFamily: 'serif',
    fontSize: 72,
    fontWeight: '800',
    color: INK,
    lineHeight: 80,
  },
  tally: {
    fontSize: 11,
    color: MUTED,
    letterSpacing: 1,
    marginTop: 2,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  btn: {
    flex: 1,
    borderRadius: 3,
    paddingVertical: 13,
    alignItems: 'center',
  },
  btnAdd: {
    backgroundColor: '#d4e8d0',
    borderWidth: 1.5,
    borderColor: '#5a8a50',
  },
  btnMinus: {
    backgroundColor: '#f5d8d8',
    borderWidth: 1.5,
    borderColor: '#c07070',
  },
  btnReset: {
    marginTop: 8,
    backgroundColor: '#e8e0cc',
    borderWidth: 1.5,
    borderColor: '#a09060',
    borderRadius: 3,
    paddingVertical: 12,
    alignItems: 'center',
  },
  btnAddText: {
    color: '#1a4a10',
    fontSize: 15,
    fontWeight: '700',
  },
  btnMinusText: {
    color: '#5a1010',
    fontSize: 15,
    fontWeight: '700',
  },
  btnResetText: {
    color: '#4a3820',
    fontSize: 14,
    fontWeight: '600',
  },
  btnPressed: {
    opacity: 0.8,
  },
});