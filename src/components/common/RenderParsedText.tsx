import { useNavigation } from "@react-navigation/native";
import { openBrowserAsync } from "expo-web-browser";
import React from "react";
import { Alert, Linking, StyleSheet } from "react-native";
import ParsedText from "react-native-parsed-text";

export function RenderParsedText({ children }: { children: string }) {
  const navigation = useNavigation();

  const handleUrlPress = async (url: string, matchIndex: number) => {
    if (url?.includes("athlerse")) {
      Linking.openURL(url);
    } else {
      await openBrowserAsync(url);
    }
  };

  const handleNamePress = (name: string, matchIndex: number) => {
    // @ts-ignore
    navigation.navigate("GlobalSearch", {
      search: name.slice(1),
      tab: 1,
    });
  };

  const handleHashtagPress = (name: string, matchIndex: number) => {
    // @ts-ignore
    navigation.navigate("GlobalSearch", {
      search: name.slice(1),
    });
  };

  const renderText = (matchingString: string, matches: string[]) => {
    let pattern = /\[(@[^:]+):([^\]]+)\]/i;
    let match = matchingString.match(pattern);
    return `^^${match?.[1]}^^`;
  };

  return (
    <ParsedText
      parse={[
        {
          type: "url",
          style: {
            opacity: 0.7,
            textDecorationLine: "underline",
            fontWeight: "bold"
          },
          onPress: handleUrlPress,
        },
        {
          pattern: /\[(@[^:]+):([^\]]+)\]/i,
          style: styles.text,
          onPress: handleNamePress,
          renderText: renderText,
        },
        { pattern: /#(\w+)/, style: styles.text, onPress: handleHashtagPress },
      ]}
      childrenProps={{ allowFontScaling: false }}
    >
      {children}
    </ParsedText>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#7862E3",
  },
  
});
