import { Store, registerInDevtools } from "pullstate";
import { SignUpStore } from "./SignUpStore";
import { LocationStore } from "./LocationStore";
import { AuthStore } from "./AuthStore";

registerInDevtools({ AuthStore, SignUpStore, LocationStore });
