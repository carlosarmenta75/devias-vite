"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useColorScheme } from "@mui/material/styles";

import { NoSsr } from "@/components/core/no-ssr";

const HEIGHT = 40;
const WIDTH = 40;

export function Logo({ color = "dark", emblem, height = HEIGHT, width = WIDTH, showText = true }) {
	const url = "/assets/imola-logo.png";

	if (!showText) {
		return (
			<Box
				alt="Imola Solutions logo"
				component="img"
				src={url}
				sx={{
					height: height,
					width: height,
					objectFit: "contain",
				}}
			/>
		);
	}

	return (
		<Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
			<Box
				alt="Imola Solutions logo"
				component="img"
				src={url}
				sx={{
					height: height,
					width: height,
					objectFit: "contain",
				}}
			/>
			<Typography
				variant="h5"
				sx={{
					fontWeight: 700,
					fontSize: height * 0.6,
					letterSpacing: "-0.02em",
					lineHeight: 1,
				}}
			>
				Imola Solutions
			</Typography>
		</Stack>
	);
}

export function DynamicLogo({ colorDark = "light", colorLight = "dark", height = HEIGHT, width = WIDTH, showText = true, ...props }) {
	const { colorScheme } = useColorScheme();
	const color = colorScheme === "dark" ? colorDark : colorLight;

	const fallbackWidth = showText ? `${width * 5}px` : `${width}px`;

	return (
		<NoSsr fallback={<Box sx={{ height: `${height}px`, width: fallbackWidth }} />}>
			<Logo color={color} height={height} width={width} showText={showText} {...props} />
		</NoSsr>
	);
}
