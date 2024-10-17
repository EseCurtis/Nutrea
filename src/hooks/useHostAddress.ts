import { useState, useEffect } from "react";
import { Platform } from "react-native";
import * as Network from 'expo-network';

const useHostAddress = () => {
    const [hostAddress, setHostAddress] = useState<string | null>(null);

    useEffect(() => {
        const getHostAddress = async () => {
            if (Platform.OS === "android" || Platform.OS === "ios") {
                let ip = await Network.getIpAddressAsync();

                let splitIP = ip?.split(".");
                splitIP = splitIP?.reverse() || [];
                splitIP[0] = "1";
                splitIP = splitIP.reverse();

                ip = splitIP.join(".");

                setHostAddress(ip);
            } else {
                // Assuming a specific host if not on a mobile platform
                setHostAddress("localhost");
            }
        };

        getHostAddress();
    }, []);

    return hostAddress;
};

export default useHostAddress;
