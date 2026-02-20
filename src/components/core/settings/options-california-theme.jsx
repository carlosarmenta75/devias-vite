"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";

import { californiaThemes } from "@/styles/theme/california-themes";

import { Option } from "./option";

const themeColors = {
	oceanside: "#046b99",
	delta: "#0d4f8b",
	eureka: "#2e5266",
	sacramento: "#003d5b",
	mono: "#004876",
	orangeCounty: "#a15801",
	santaBarbara: "#275e42",
	santaCruz: "#0f4fa8",
	shasta: "#336b35",
	sierra: "#3f6e2e",
	trinity: "#21576a",
	pasoRobles: "#6a3420",
};

export function OptionsCaliforniaTheme({ onChange, value }) {
	return (
		<Stack spacing={1}>
			<InputLabel>California Theme</InputLabel>
			<Stack direction="row" spacing={2} sx={{ alignItems: "center", flexWrap: "wrap" }}>
				{californiaThemes.map((theme) => (
					<Option
						icon={
							<Box
								sx={{
									bgcolor: themeColors[theme.id],
									borderRadius: "50%",
									flex: "0 0 auto",
									height: "24px",
									width: "24px",
								}}
							/>
						}
						key={theme.id}
						label={theme.name}
						onClick={() => {
							onChange?.(theme.id);
						}}
						selected={theme.id === value}
					/>
				))}
			</Stack>
		</Stack>
	);
}
