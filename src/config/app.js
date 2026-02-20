import { AuthStrategy } from "@/lib/auth-strategy";
import { LogLevel } from "@/lib/logger";

export const appConfig = {
	name: "Devias Kit Pro",
	description: "",
	direction: "ltr",
	language: "en",
	theme: "light",
	themeColor: "#090a0b",
	primaryColor: "neonBlue",
	logLevel: import.meta.env.VITE_LOG_LEVEL || LogLevel.ALL,
	authStrategy: import.meta.env.VITE_AUTH_STRATEGY || AuthStrategy.NONE,
};
