"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z as zod } from "zod";

import { paths } from "@/paths";
import { logger } from "@/lib/default-logger";
import { RouterLink } from "@/components/core/link";
import { Option } from "@/components/core/option";
import { toast } from "@/components/core/toaster";

const schema = zod.object({
	title: zod.string().min(1, "Title is required").max(255),
	description: zod.string().min(1, "Description is required"),
	severity: zod.enum(["critical", "high", "medium", "low"]),
	incidentType: zod.enum(["malware", "phishing", "data_breach", "ddos", "unauthorized_access", "insider_threat", "ransomware", "other"]),
	affectedSystems: zod.string().min(1, "Affected systems is required"),
	reporterName: zod.string().min(1, "Reporter name is required").max(255),
	reporterEmail: zod.string().email("Must be a valid email").min(1, "Reporter email is required").max(255),
});

const defaultValues = {
	title: "",
	description: "",
	severity: "medium",
	incidentType: "other",
	affectedSystems: "",
	reporterName: "",
	reporterEmail: "",
};

export function IncidentCreateForm() {
	const navigate = useNavigate();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues, resolver: zodResolver(schema) });

	const onSubmit = React.useCallback(
		async (values) => {
			try {
				logger.debug("Submitting incident", values);
				toast.success("Incident reported successfully");
				navigate(paths.dashboard.incidents.list);
			} catch (err) {
				logger.error("Failed to report incident", err);
				toast.error("Something went wrong");
			}
		},
		[navigate]
	);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Card>
				<CardContent>
					<Stack divider={<Divider />} spacing={4}>
						<Stack spacing={3}>
							<Grid container spacing={3}>
								<Grid size={{ xs: 12 }}>
									<Controller
										control={control}
										name="title"
										render={({ field }) => (
											<FormControl error={Boolean(errors.title)} fullWidth>
												<InputLabel required>Incident Title</InputLabel>
												<OutlinedInput {...field} />
												{errors.title ? <FormHelperText>{errors.title.message}</FormHelperText> : null}
											</FormControl>
										)}
									/>
								</Grid>
								<Grid size={{ xs: 12 }}>
									<Controller
										control={control}
										name="description"
										render={({ field }) => (
											<FormControl error={Boolean(errors.description)} fullWidth>
												<InputLabel required>Description</InputLabel>
												<OutlinedInput {...field} multiline rows={4} />
												{errors.description ? <FormHelperText>{errors.description.message}</FormHelperText> : null}
											</FormControl>
										)}
									/>
								</Grid>
								<Grid size={{ xs: 12, md: 6 }}>
									<Controller
										control={control}
										name="severity"
										render={({ field }) => (
											<FormControl error={Boolean(errors.severity)} fullWidth>
												<InputLabel required>Severity</InputLabel>
												<Select {...field}>
													<Option value="low">Low</Option>
													<Option value="medium">Medium</Option>
													<Option value="high">High</Option>
													<Option value="critical">Critical</Option>
												</Select>
												{errors.severity ? <FormHelperText>{errors.severity.message}</FormHelperText> : null}
											</FormControl>
										)}
									/>
								</Grid>
								<Grid size={{ xs: 12, md: 6 }}>
									<Controller
										control={control}
										name="incidentType"
										render={({ field }) => (
											<FormControl error={Boolean(errors.incidentType)} fullWidth>
												<InputLabel required>Incident Type</InputLabel>
												<Select {...field}>
													<Option value="malware">Malware</Option>
													<Option value="phishing">Phishing</Option>
													<Option value="data_breach">Data Breach</Option>
													<Option value="ddos">DDoS Attack</Option>
													<Option value="unauthorized_access">Unauthorized Access</Option>
													<Option value="insider_threat">Insider Threat</Option>
													<Option value="ransomware">Ransomware</Option>
													<Option value="other">Other</Option>
												</Select>
												{errors.incidentType ? <FormHelperText>{errors.incidentType.message}</FormHelperText> : null}
											</FormControl>
										)}
									/>
								</Grid>
								<Grid size={{ xs: 12 }}>
									<Controller
										control={control}
										name="affectedSystems"
										render={({ field }) => (
											<FormControl error={Boolean(errors.affectedSystems)} fullWidth>
												<InputLabel required>Affected Systems</InputLabel>
												<OutlinedInput {...field} placeholder="e.g., Web Server, Database, Email System" />
												{errors.affectedSystems ? (
													<FormHelperText>{errors.affectedSystems.message}</FormHelperText>
												) : null}
											</FormControl>
										)}
									/>
								</Grid>
								<Grid size={{ xs: 12, md: 6 }}>
									<Controller
										control={control}
										name="reporterName"
										render={({ field }) => (
											<FormControl error={Boolean(errors.reporterName)} fullWidth>
												<InputLabel required>Your Name</InputLabel>
												<OutlinedInput {...field} />
												{errors.reporterName ? <FormHelperText>{errors.reporterName.message}</FormHelperText> : null}
											</FormControl>
										)}
									/>
								</Grid>
								<Grid size={{ xs: 12, md: 6 }}>
									<Controller
										control={control}
										name="reporterEmail"
										render={({ field }) => (
											<FormControl error={Boolean(errors.reporterEmail)} fullWidth>
												<InputLabel required>Your Email</InputLabel>
												<OutlinedInput {...field} type="email" />
												{errors.reporterEmail ? <FormHelperText>{errors.reporterEmail.message}</FormHelperText> : null}
											</FormControl>
										)}
									/>
								</Grid>
							</Grid>
						</Stack>
					</Stack>
				</CardContent>
				<CardActions sx={{ justifyContent: "flex-end" }}>
					<Button color="secondary" component={RouterLink} href={paths.dashboard.incidents.list}>
						Cancel
					</Button>
					<Button type="submit" variant="contained">
						Report Incident
					</Button>
				</CardActions>
			</Card>
		</form>
	);
}
