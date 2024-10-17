import * as SecureStore from "expo-secure-store";

export function useStorage() {
  async function save(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
  }

  async function get(key: string) {
    let result = await SecureStore.getItemAsync(key);

    return result;
  }

  async function remove(key: string) {
    await SecureStore.deleteItemAsync(key);
  }

  return {
    save,
    get,
    remove,
  };
}
