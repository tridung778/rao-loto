import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const NUM_LOTO = 90;
const NUM_COLUMNS = 10;
const lotoNumbers = Array.from({ length: NUM_LOTO }, (_, i) => i + 1);

export default function HomeScreen() {
  const [sound, setSound] = useState();
  const [selected, setSelected] = useState<number[]>([]);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("@/assets/sounds/hello.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const handleLotoPress = (num: number) => {
    setSelected((prev) =>
      prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]
    );
  };

  const handleReset = () => {
    setSelected([]);
  };

  const renderLoto = ({ item }: { item: number }) => (
    <TouchableOpacity
      style={[styles.loto, selected.includes(item) && styles.lotoSelected]}
      onPress={() => handleLotoPress(item)}
      activeOpacity={0.7}
    >
      <ThemedText style={styles.lotoText}>{item}</ThemedText>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={lotoNumbers}
        renderItem={renderLoto}
        keyExtractor={(item) => item.toString()}
        numColumns={NUM_COLUMNS}
        scrollEnabled={false}
        contentContainerStyle={styles.lotoGrid}
      />
      <View style={styles.bottomRow}>
        <TouchableOpacity style={styles.soundBtn} onPress={playSound}>
          <IconSymbol
            name="paperplane.fill"
            size={48}
            color={Colors.light.tint}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
          <IconSymbol
            name="chevron.left.forwardslash.chevron.right"
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
    backgroundColor: Colors.light.background,
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
    color: Colors.light.background,
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
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
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
});
