"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { useColorScheme } from "@mui/material/styles";

import { NoSsr } from "@/components/core/no-ssr";

const HEIGHT = 40;
const WIDTH = 40;

export function Logo({ color = "dark", emblem, height = HEIGHT, width = WIDTH }) {
	const url = "/assets/image.png";

	return (
		<Box
			alt="ImolaSolutions logo"
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

export function DynamicLogo({ colorDark = "light", colorLight = "dark", height = HEIGHT, width = WIDTH, ...props }) {
	const { colorScheme } = useColorScheme();
	const color = colorScheme === "dark" ? colorDark : colorLight;

	return (
		<NoSsr fallback={<Box sx={{ height: `${height}px`, width: `${width}px` }} />}>
			<Logo color={color} height={height} width={width} {...props} />
		</NoSsr>
	);
}
