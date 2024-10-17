/**
 * Copyright (c) JOB TODAY S.A. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useShare } from "../../../../hooks/useShare";
import { Spinner } from "../../Spinner";

type Props = {
  onRequestClose: () => void;
  currentImageUrl: string;
};

const HIT_SLOP = { top: 16, left: 16, bottom: 16, right: 16 };

const ImageDefaultHeader = ({ onRequestClose, currentImageUrl }: Props) => {
  const { shareImageUri } = useShare();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <SafeAreaView style={styles.root}>
        <View className="flex-row items-center justify-between px-4 pt-2">
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onRequestClose}
            hitSlop={HIT_SLOP}
          >
            <Ionicons name="close" size={18} color="white" />
          </TouchableOpacity>

          {!currentImageUrl?.includes("mp4") && (
            <TouchableOpacity
              style={styles.closeButton}
              onPress={async () => {
                setIsLoading(true);
                await shareImageUri(currentImageUrl);
                setIsLoading(false);
              }}
              hitSlop={HIT_SLOP}
              disabled={isLoading}
            >
              {isLoading ? (
                <Spinner color="white" />
              ) : (
                <Ionicons name="ellipsis-horizontal" size={18} color="white" />
              )}
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  root: {},
  closeButton: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "#1C1D22",
  },
  closeText: {
    lineHeight: 22,
    fontSize: 19,
    textAlign: "center",
    color: "#FFF",
    includeFontPadding: false,
  },
});

export default ImageDefaultHeader;
