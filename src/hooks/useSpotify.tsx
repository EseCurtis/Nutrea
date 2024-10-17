import * as WebBrowser from "expo-web-browser";
import { useAuthRequest } from "expo-auth-session";
import { useEffect, useState } from "react";
import axios from "axios";
import * as Linking from "expo-linking";

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

export function useSpotify() {
  const [isLoading, setIsLoading] = useState(false);
  const [tracksUris, setTracksUris] = useState<string[]>([]);
  const [token, setToken] = useState("");

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: "152af7942926499681152ed960ea5177",
      scopes: ["user-read-email", "playlist-modify-public", "user-top-read"],
      // To follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: Linking.createURL(""),
    },
    discovery
  );

  const axiosHandler = axios.create({
    baseURL: "https://api.spotify.com",
  });

  useEffect(() => {
    const handleSpotify = async () => {
      try {
        if (response?.type) {
          if (response.type === "success") {
            const { code } = response.params;
            const tokenData = await getTokenData(code);

            if (tokenData?.access_token) {
              axiosHandler.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${tokenData?.access_token}`;

              setToken(tokenData?.access_token);

              const topTracks = await axiosHandler.get(
                "/v1/me/top/tracks?time_range=long_term&limit=5"
              );

              const topTracksIds = topTracks.data.items.map(
                (track: any) => track.id
              );

              const recommendedTracks = await axiosHandler.get(
                `/v1/recommendations?limit=10&seed_tracks=${topTracksIds.join(
                  ","
                )}`
              );

              setTracksUris(
                recommendedTracks.data.tracks.map((track: any) => track.uri)
              );
            }
          }
        }
      } catch (error: any) {
        console.log(error?.response?.data);
      } finally {
        setIsLoading(false);
      }
    };

    handleSpotify();
  }, [response]);

  const getTokenData = async (code: string) => {
    return await axios
      .post(
        "https://accounts.spotify.com/api/token",
        {
          grant_type: "authorization_code",
          code,
          redirect_uri: Linking.createURL(""),
          client_id: "152af7942926499681152ed960ea5177",
          client_secret: "455b64d57cf64200acc980f76288cd79",
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((data) => {
        return data.data;
      })
      .catch((error) => {
        console.log(error.response?.data);
      });
  };

  return {
    promptAsync: () => {
      setIsLoading(true);
      promptAsync();
    },
    isLoading,
    token,
    tracksUris,
  };
}
