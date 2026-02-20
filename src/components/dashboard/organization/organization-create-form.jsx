"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CameraIcon } from "@phosphor-icons/react/dist/ssr/Camera";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z as zod } from "zod";

import { paths } from "@/paths";
import { logger } from "@/lib/default-logger";
import { Option } from "@/components/core/option";
import { toast } from "@/components/core/toaster";

const countryOptions = [
	{ label: "United States", value: "us" },
	{ label: "Germany", value: "de" },
	{ label: "Spain", value: "es" },
];

function fileToBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.addEventListener("load", () => {
			resolve(reader.result);
		});
		reader.addEventListener("error", () => {
			reject(new Error("Error converting file to base64"));
		});
	});
}

const schema = zod.object({
	logo: zod.string().optional(),
	name: zod.string().min(1, "Organization name is required").max(255),
	email: zod.string().email("Must be a valid email").min(1, "Email is required").max(255),
	phone: zod.string().min(1, "Phone is required").max(15),
	website: zod.string().max(255).optional(),
	address: zod.object({
		country: zod.string().min(1, "Country is required").max(255),
		state: zod.string().min(1, "State is required").max(255),
		city: zod.string().min(1, "City is required").max(255),
		zipCode: zod.string().min(1, "Zip code is required").max(255),
		line1: zod.string().min(1, "Street line 1 is required").max(255),
		line2: zod.string().max(255).optional(),
	}),
	taxId: zod.string().max(255).optional(),
	timezone: zod.string().min(1, "Timezone is required").max(255),
	currency: zod.string().min(1, "Currency is required").max(255),
});

const defaultValues = {
	logo: "",
	name: "",
	email: "",
	phone: "",
	website: "",
	address: { country: "us", state: "", city: "", zipCode: "", line1: "", line2: "" },
	taxId: "",
	timezone: "America/New_York",
	currency: "USD",
};

export function OrganizationCreateForm() {
	const navigate = useNavigate();

	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = useForm({ defaultValues, resolver: zodResolver(schema) });

	const logo = watch("logo");

	const onSubmit = React.useCallback(
		async (values) => {
			try {
				logger.debug("Organization creation", values);
				toast.success("Organization created");
				navigate(paths.dashboard.organizations.list);
			} catch (err) {
				logger.error("Error creating organization", err);
				toast.error("Something went wrong!");
			}
		},
		[navigate]
	);

	const handleLogoChange = React.useCallback(
		async (event) => {
			const file = event.target.files?.[0];

			if (file) {
				const base64 = await fileToBase64(file);
				setValue("logo", base64);
			}
		},
		[setValue]
	);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Card>
				<CardContent>
					<Stack divider={<Divider />} spacing={4}>
						<Stack spacing={3}>
							<Typography variant="h6">Basic details</Typography>
							<Grid container spacing={3}>
								<Grid item xs={12}>
									<Stack direction="row" spacing={3} sx={{ alignItems: "center" }}>
										<Box
											sx={{
												border: "1px dashed var(--mui-palette-divider)",
												borderRadius: "50%",
												display: "inline-flex",
												p: "4px",
											}}
										>
											<Avatar
												src={logo}
												sx={{
													"--Avatar-size": "100px",
													"--Icon-fontSize": "var(--icon-fontSize-lg)",
													alignItems: "center",
													bgcolor: "var(--mui-palette-background-level1)",
													color: "var(--mui-palette-text-secondary)",
													display: "flex",
													justifyContent: "center",
												}}
											>
												<CameraIcon fontSize="var(--Icon-fontSize)" />
											</Avatar>
										</Box>
										<Stack spacing={1} sx={{ alignItems: "flex-start" }}>
											<Typography variant="subtitle2">Organization logo</Typography>
											<Typography variant="caption">Min 400x400px, PNG or JPEG</Typography>
											<Button
												color="secondary"
												component="label"
												size="small"
												variant="outlined"
											>
												Select
												<input accept="image/*" hidden onChange={handleLogoChange} type="file" />
											</Button>
										</Stack>
									</Stack>
								</Grid>
								<Grid item md={6} xs={12}>
									<Controller
										control={control}
										name="name"
										render={({ field }) => (
											<FormControl error={Boolean(errors.name)} fullWidth>
												<InputLabel required>Organization name</InputLabel>
												<OutlinedInput {...field} />
												{errors.name ? <FormHelperText>{errors.name.message}</FormHelperText> : null}
											</FormControl>
										)}
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<Controller
										control={control}
										name="email"
										render={({ field }) => (
											<FormControl error={Boolean(errors.email)} fullWidth>
												<InputLabel required>Email address</InputLabel>
												<OutlinedInput {...field} type="email" />
												{errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
											</FormControl>
										)}
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<Controller
										control={control}
										name="phone"
										render={({ field }) => (
											<FormControl error={Boolean(errors.phone)} fullWidth>
												<InputLabel required>Phone number</InputLabel>
												<OutlinedInput {...field} />
												{errors.phone ? <FormHelperText>{errors.phone.message}</FormHelperText> : null}
											</FormControl>
										)}
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<Controller
										control={control}
										name="website"
										render={({ field }) => (
											<FormControl error={Boolean(errors.website)} fullWidth>
												<InputLabel>Website</InputLabel>
												<OutlinedInput {...field} />
												{errors.website ? <FormHelperText>{errors.website.message}</FormHelperText> : null}
											</FormControl>
										)}
									/>
								</Grid>
							</Grid>
						</Stack>
						<Stack spacing={3}>
							<Typography variant="h6">Address</Typography>
							<Grid container spacing={3}>
								<Grid item md={6} xs={12}>
									<Controller
										control={control}
										name="address.country"
										render={({ field }) => (
											<FormControl error={Boolean(errors.address?.country)} fullWidth>
												<InputLabel required>Country</InputLabel>
												<Select {...field}>
													{countryOptions.map((option) => (
														<Option key={option.value} value={option.value}>
															{option.label}
														</Option>
													))}
												</Select>
												{errors.address?.country ? (
													<FormHelperText>{errors.address.country.message}</FormHelperText>
												) : null}
											</FormControl>
										)}
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<Controller
										control={control}
										name="address.state"
										render={({ field }) => (
											<FormControl error={Boolean(errors.address?.state)} fullWidth>
												<InputLabel required>State</InputLabel>
												<OutlinedInput {...field} />
												{errors.address?.state ? (
													<FormHelperText>{errors.address.state.message}</FormHelperText>
												) : null}
											</FormControl>
										)}
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<Controller
										control={control}
										name="address.city"
										render={({ field }) => (
											<FormControl error={Boolean(errors.address?.city)} fullWidth>
												<InputLabel required>City</InputLabel>
												<OutlinedInput {...field} />
												{errors.address?.city ? (
													<FormHelperText>{errors.address.city.message}</FormHelperText>
												) : null}
											</FormControl>
										)}
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<Controller
										control={control}
										name="address.zipCode"
										render={({ field }) => (
											<FormControl error={Boolean(errors.address?.zipCode)} fullWidth>
												<InputLabel required>Zip code</InputLabel>
												<OutlinedInput {...field} />
												{errors.address?.zipCode ? (
													<FormHelperText>{errors.address.zipCode.message}</FormHelperText>
												) : null}
											</FormControl>
										)}
									/>
								</Grid>
								<Grid item xs={12}>
									<Controller
										control={control}
										name="address.line1"
										render={({ field }) => (
											<FormControl error={Boolean(errors.address?.line1)} fullWidth>
												<InputLabel required>Street line 1</InputLabel>
												<OutlinedInput {...field} />
												{errors.address?.line1 ? (
													<FormHelperText>{errors.address.line1.message}</FormHelperText>
												) : null}
											</FormControl>
										)}
									/>
								</Grid>
								<Grid item xs={12}>
									<Controller
										control={control}
										name="address.line2"
										render={({ field }) => (
											<FormControl error={Boolean(errors.address?.line2)} fullWidth>
												<InputLabel>Street line 2</InputLabel>
												<OutlinedInput {...field} />
												{errors.address?.line2 ? (
													<FormHelperText>{errors.address.line2.message}</FormHelperText>
												) : null}
											</FormControl>
										)}
									/>
								</Grid>
							</Grid>
						</Stack>
						<Stack spacing={3}>
							<Typography variant="h6">Additional information</Typography>
							<Grid container spacing={3}>
								<Grid item md={6} xs={12}>
									<Controller
										control={control}
										name="taxId"
										render={({ field }) => (
											<FormControl error={Boolean(errors.taxId)} fullWidth>
												<InputLabel>Tax ID</InputLabel>
												<OutlinedInput {...field} />
												{errors.taxId ? <FormHelperText>{errors.taxId.message}</FormHelperText> : null}
											</FormControl>
										)}
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<Controller
										control={control}
										name="timezone"
										render={({ field }) => (
											<FormControl error={Boolean(errors.timezone)} fullWidth>
												<InputLabel required>Timezone</InputLabel>
												<OutlinedInput {...field} />
												{errors.timezone ? <FormHelperText>{errors.timezone.message}</FormHelperText> : null}
											</FormControl>
										)}
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<Controller
										control={control}
										name="currency"
										render={({ field }) => (
											<FormControl error={Boolean(errors.currency)} fullWidth>
												<InputLabel required>Currency</InputLabel>
												<OutlinedInput {...field} />
												{errors.currency ? <FormHelperText>{errors.currency.message}</FormHelperText> : null}
											</FormControl>
										)}
									/>
								</Grid>
							</Grid>
						</Stack>
					</Stack>
				</CardContent>
				<CardActions sx={{ justifyContent: "flex-end" }}>
					<Button color="secondary" component="a" href={paths.dashboard.organizations.list}>
						Cancel
					</Button>
					<Button type="submit" variant="contained">
						Create organization
					</Button>
				</CardActions>
			</Card>
		</form>
	);
}
