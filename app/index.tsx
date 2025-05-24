import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const NUM_LOTO = 90;
const NUM_COLUMNS = 10;
const lotoNumbers = Array.from({ length: NUM_LOTO }, (_, i) => i + 1);

// Import tất cả các file âm thanh
const sounds: Record<number, any> = {
  0: require("@/assets/sounds/intro.mp3"),
  1: require("@/assets/sounds/list/1.mp3"),
  2: require("@/assets/sounds/list/2.mp3"),
  3: require("@/assets/sounds/list/3.mp3"),
  4: require("@/assets/sounds/list/4.mp3"),
  5: require("@/assets/sounds/list/5.mp3"),
  6: require("@/assets/sounds/list/6.mp3"),
  7: require("@/assets/sounds/list/7.mp3"),
  8: require("@/assets/sounds/list/8.mp3"),
  9: require("@/assets/sounds/list/9.mp3"),
  10: require("@/assets/sounds/list/10.mp3"),
  11: require("@/assets/sounds/list/11.mp3"),
  12: require("@/assets/sounds/list/12.mp3"),
  13: require("@/assets/sounds/list/13.mp3"),
  14: require("@/assets/sounds/list/14.mp3"),
  15: require("@/assets/sounds/list/15.mp3"),
  16: require("@/assets/sounds/list/16.mp3"),
  17: require("@/assets/sounds/list/17.mp3"),
  18: require("@/assets/sounds/list/18.mp3"),
  19: require("@/assets/sounds/list/19.mp3"),
  20: require("@/assets/sounds/list/20.mp3"),
  21: require("@/assets/sounds/list/21.mp3"),
  22: require("@/assets/sounds/list/22.mp3"),
  23: require("@/assets/sounds/list/23.mp3"),
  24: require("@/assets/sounds/list/24.mp3"),
  25: require("@/assets/sounds/list/25.mp3"),
  26: require("@/assets/sounds/list/26.mp3"),
  27: require("@/assets/sounds/list/27.mp3"),
  28: require("@/assets/sounds/list/28.mp3"),
  29: require("@/assets/sounds/list/29.mp3"),
  30: require("@/assets/sounds/list/30.mp3"),
  31: require("@/assets/sounds/list/31.mp3"),
  32: require("@/assets/sounds/list/32.mp3"),
  33: require("@/assets/sounds/list/33.mp3"),
  34: require("@/assets/sounds/list/34.mp3"),
  35: require("@/assets/sounds/list/35.mp3"),
  36: require("@/assets/sounds/list/36.mp3"),
  37: require("@/assets/sounds/list/37.mp3"),
  38: require("@/assets/sounds/list/38.mp3"),
  39: require("@/assets/sounds/list/39.mp3"),
  40: require("@/assets/sounds/list/40.mp3"),
  41: require("@/assets/sounds/list/41.mp3"),
  42: require("@/assets/sounds/list/42.mp3"),
  43: require("@/assets/sounds/list/43.mp3"),
  44: require("@/assets/sounds/list/44.mp3"),
  45: require("@/assets/sounds/list/45.mp3"),
  46: require("@/assets/sounds/list/46.mp3"),
  47: require("@/assets/sounds/list/47.mp3"),
  48: require("@/assets/sounds/list/48.mp3"),
  49: require("@/assets/sounds/list/49.mp3"),
  50: require("@/assets/sounds/list/50.mp3"),
  51: require("@/assets/sounds/list/51.mp3"),
  52: require("@/assets/sounds/list/52.mp3"),
  53: require("@/assets/sounds/list/53.mp3"),
  54: require("@/assets/sounds/list/54.mp3"),
  55: require("@/assets/sounds/list/55.mp3"),
  56: require("@/assets/sounds/list/56.mp3"),
  57: require("@/assets/sounds/list/57.mp3"),
  58: require("@/assets/sounds/list/58.mp3"),
  59: require("@/assets/sounds/list/59.mp3"),
  60: require("@/assets/sounds/list/60.mp3"),
  61: require("@/assets/sounds/list/61.mp3"),
  62: require("@/assets/sounds/list/62.mp3"),
  63: require("@/assets/sounds/list/63.mp3"),
  64: require("@/assets/sounds/list/64.mp3"),
  65: require("@/assets/sounds/list/65.mp3"),
  66: require("@/assets/sounds/list/66.mp3"),
  67: require("@/assets/sounds/list/67.mp3"),
  68: require("@/assets/sounds/list/68.mp3"),
  69: require("@/assets/sounds/list/69.mp3"),
  70: require("@/assets/sounds/list/70.mp3"),
  71: require("@/assets/sounds/list/71.mp3"),
  72: require("@/assets/sounds/list/72.mp3"),
  73: require("@/assets/sounds/list/73.mp3"),
  74: require("@/assets/sounds/list/74.mp3"),
  75: require("@/assets/sounds/list/75.mp3"),
  76: require("@/assets/sounds/list/76.mp3"),
  77: require("@/assets/sounds/list/77.mp3"),
  78: require("@/assets/sounds/list/78.mp3"),
  79: require("@/assets/sounds/list/79.mp3"),
  80: require("@/assets/sounds/list/80.mp3"),
  81: require("@/assets/sounds/list/81.mp3"),
  82: require("@/assets/sounds/list/82.mp3"),
  83: require("@/assets/sounds/list/83.mp3"),
  84: require("@/assets/sounds/list/84.mp3"),
  85: require("@/assets/sounds/list/85.mp3"),
  86: require("@/assets/sounds/list/86.mp3"),
  87: require("@/assets/sounds/list/87.mp3"),
  88: require("@/assets/sounds/list/88.mp3"),
  89: require("@/assets/sounds/list/89.mp3"),
  90: require("@/assets/sounds/list/90.mp3"),
};

export default function HomeScreen() {
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);
  const [selected, setSelected] = useState<number[]>([]);
  const [lastCalled, setLastCalled] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const scaleAnim = new Animated.Value(1);
  const fadeAnim = new Animated.Value(1);

  async function playSound(number: number) {
    if (isMuted) return;

    if (sound) {
      await sound.unloadAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync(
      sounds[number as keyof typeof sounds]
    );
    setSound(newSound);
    console.log("Playing... ", number);

    await newSound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const handleReset = () => {
    setSelected([]);
    setLastCalled(null);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleCallNumber = () => {
    const availableNumbers = lotoNumbers.filter(
      (num) => !selected.includes(num)
    );
    if (availableNumbers.length === 0) {
      return;
    }
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const calledNumber = availableNumbers[randomIndex];
    setLastCalled(calledNumber);
    setSelected((prev) => [...prev, calledNumber]);
    playSound(calledNumber);
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.5,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const renderLoto = ({ item }: { item: number }) => (
    <Animated.View style={{ opacity: fadeAnim }}>
      <TouchableOpacity
        style={[styles.loto, selected.includes(item) && styles.lotoSelected]}
        activeOpacity={0.7}
      >
        <ThemedText style={styles.lotoText}>{item}</ThemedText>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <ThemedView style={styles.container}>
      {lastCalled !== null && (
        <Animated.View
          style={[styles.lastCalled, { transform: [{ scale: scaleAnim }] }]}
        >
          <ThemedText style={styles.lastCalledText}>Số vừa kêu</ThemedText>
          <ThemedText style={styles.lastCalledNumber}>{lastCalled}</ThemedText>
        </Animated.View>
      )}
      <FlatList
        data={lotoNumbers}
        renderItem={renderLoto}
        keyExtractor={(item) => item.toString()}
        numColumns={NUM_COLUMNS}
        scrollEnabled={false}
        contentContainerStyle={styles.lotoGrid}
      />
      <View style={styles.bottomRow}>
        <TouchableOpacity style={styles.resetBtn} onPress={toggleMute}>
          <IconSymbol
            name={isMuted ? "speaker.slash.fill" : "speaker.wave.2.fill"}
            size={32}
            color={Colors.light.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.soundBtn} onPress={handleCallNumber}>
          <ThemedText style={styles.soundBtnText}>Kêu</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
          <IconSymbol
            name="arrow.counterclockwise"
            size={32}
            color={Colors.light.icon}
          />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const lotoSize =
  Math.floor((Dimensions.get("window").width - 40) / NUM_COLUMNS) - 4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    alignItems: "center",
    backgroundColor: "#ff4757",
  },
  lotoGrid: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  loto: {
    width: lotoSize,
    height: lotoSize,
    margin: 2,
    borderRadius: lotoSize / 2,
    backgroundColor: Colors.light.tabIconDefault,
    alignItems: "center",
    justifyContent: "center",
  },
  lotoSelected: {
    backgroundColor: Colors.light.tint,
  },
  lotoText: {
    color: "#2f3542",
    fontWeight: "bold",
    fontSize: 16,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    marginBottom: 32,
  },
  soundBtn: {
    backgroundColor: Colors.light.tint,
    borderRadius: 32,
    padding: 16,
    marginRight: 48,
    marginLeft: 48,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 120,
  },
  soundBtnText: {
    color: "#2f3542",
    fontWeight: "bold",
    fontSize: 24,
  },
  resetBtn: {
    backgroundColor: Colors.light.background,
    borderRadius: 32,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.light.icon,
    alignItems: "center",
    justifyContent: "center",
  },
  lastCalled: {
    marginTop: 16,
    padding: 16,
    backgroundColor: Colors.light.tint,
    borderRadius: 8,
    marginBottom: 32,
  },
  lastCalledText: {
    color: "#2f3542",
    fontWeight: "bold",
    fontSize: 18,
  },
  lastCalledNumber: {
    color: "#2f3542",
    fontWeight: "bold",
    fontSize: 32,
    textAlign: "center",
  },
});
