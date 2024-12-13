import { Image, StyleSheet, Platform, View } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { Bar, CartesianChart } from "victory-native";
import { LinearGradient, useFont, vec } from "@shopify/react-native-skia";
//👇 Also import a ttf file for the font you want to use.
import spaceMonoRegular from "../../assets/fonts/SpaceMono-Regular.ttf";

const data = Array.from({ length: 6 }, (_, index) => ({
  // Starting at 1 for Jaunary
  month: index + 1,
  // Randomizing the listen count between 100 and 50
  listenCount: Math.floor(Math.random() * (100 - 50 + 1)) + 50,
}));

export default function HomeScreen() {
  const font = useFont(spaceMonoRegular, 12); //👈 Create a font object with the font file and size.
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>

      <View style={styles.chart}>
        <CartesianChart
          data={data}
          xKey="month"
          yKeys={["listenCount"]}
          // 👇 Add domain padding to the chart to prevent the first and last bar from being cut off.
          domainPadding={{ left: 50, right: 50, top: 30 }}
          axisOptions={{
            /**
             * 👇 Pass the font object to the axisOptions.
             * This will tell CartesianChart to render axis labels.
             */
            font,
            /**
             * 👇 We will also use the formatXLabel prop to format the month number
             * from a number to a month name.
             */
            formatXLabel: (value) => {
              const date = new Date(2023, value - 1);
              return date.toLocaleString("default", { month: "short" });
            },
          }}
        >
          {({ points, chartBounds }) => (
            <Bar
              chartBounds={chartBounds} // 👈 chartBounds is needed to know how to draw the bars
              points={points.listenCount} // 👈 points is an object with a property for each yKey
            >
              <LinearGradient
                start={vec(0, 0)} // 👈 The start and end are vectors that represent the direction of the gradient.
                end={vec(0, 400)}
                colors={[
                  // 👈 The colors are an array of strings that represent the colors of the gradient.
                  "#a78bfa",
                  "#a78bfa50", // 👈 The second color is the same as the first but with an alpha value of 50%.
                ]}
              />
            </Bar>
          )}
        </CartesianChart>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  chart: {
    height: 200,
    width: Platform.OS === "web" ? 400 : "100%",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
