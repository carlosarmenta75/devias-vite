import { AuthStrategy } from "@/lib/auth-strategy";
import { LogLevel } from "@/lib/logger";

export const appConfig = {
	name: "ImolaSolutions",
	description: "",
	direction: "ltr",
	language: "en",
	theme: "light",
	themeColor: "#090a0b",
	primaryColor: "oceanside",
	californiaTheme: "oceanside",
	logLevel: import.meta.env.VITE_LOG_LEVEL || LogLevel.ALL,
	authStrategy: import.meta.env.VITE_AUTH_STRATEGY || AuthStrategy.NONE,
};
