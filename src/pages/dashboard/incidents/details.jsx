import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { ShieldCheckIcon } from "@phosphor-icons/react/dist/ssr/ShieldCheck";
import { ShieldWarningIcon } from "@phosphor-icons/react/dist/ssr/ShieldWarning";
import { ShieldSlashIcon } from "@phosphor-icons/react/dist/ssr/ShieldSlash";
import { CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle";
import { ClockIcon } from "@phosphor-icons/react/dist/ssr/Clock";
import { WarningIcon } from "@phosphor-icons/react/dist/ssr/Warning";
import { Helmet } from "react-helmet-async";

import { appConfig } from "@/config/app";
import { paths } from "@/paths";
import { dayjs } from "@/lib/dayjs";
import { RouterLink } from "@/components/core/link";
import { PropertyItem } from "@/components/core/property-item";
import { PropertyList } from "@/components/core/property-list";

const metadata = { title: `Details | Incidents | Dashboard | ${appConfig.name}` };

const severityMap = {
	critical: { label: "Critical", color: "error", icon: <ShieldSlashIcon weight="fill" /> },
	high: { label: "High", color: "warning", icon: <ShieldWarningIcon weight="fill" /> },
	medium: { label: "Medium", color: "info", icon: <ShieldCheckIcon weight="fill" /> },
	low: { label: "Low", color: "success", icon: <ShieldCheckIcon weight="fill" /> },
};

const statusMap = {
	open: { label: "Open", color: "error", icon: <WarningIcon weight="fill" /> },
	investigating: { label: "Investigating", color: "warning", icon: <ClockIcon weight="fill" /> },
	contained: { label: "Contained", color: "info", icon: <ShieldCheckIcon weight="fill" /> },
	resolved: { label: "Resolved", color: "success", icon: <CheckCircleIcon weight="fill" /> },
	closed: { label: "Closed", color: "default", icon: <CheckCircleIcon /> },
};

const incident = {
	id: "INC-001",
	incidentNumber: "INC-001",
	title: "Suspicious Login Attempts Detected",
	description: "Multiple failed login attempts from unknown IP addresses detected on admin accounts. The attempts originated from IP addresses in various geographic locations and targeted multiple administrator accounts. Authentication logs show over 500 failed attempts within a 2-hour period. No successful breaches were detected, but the pattern suggests a coordinated brute force attack. All targeted accounts have been temporarily locked pending security review.",
	severity: "high",
	status: "investigating",
	incidentType: "unauthorized_access",
	affectedSystems: "Admin Portal, Authentication Service, User Management System",
	reporterName: "John Smith",
	reporterEmail: "john.smith@company.com",
	assignedTo: "Alice Johnson",
	assignedToEmail: "alice.johnson@company.com",
	detectedAt: dayjs().subtract(2, "hour").toDate(),
	createdAt: dayjs().subtract(2, "hour").toDate(),
	updatedAt: dayjs().subtract(30, "minute").toDate(),
};

const incidentTypeMap = {
	malware: "Malware",
	phishing: "Phishing",
	data_breach: "Data Breach",
	ddos: "DDoS Attack",
	unauthorized_access: "Unauthorized Access",
	insider_threat: "Insider Threat",
	ransomware: "Ransomware",
	other: "Other",
};

const timeline = [
	{
		id: "1",
		action: "Incident detected",
		timestamp: dayjs().subtract(2, "hour").toDate(),
		user: "Automated System",
		description: "Anomaly detection system flagged suspicious login patterns",
	},
	{
		id: "2",
		action: "Incident reported",
		timestamp: dayjs().subtract(2, "hour").toDate(),
		user: "John Smith",
		description: "Security analyst reviewed automated alert and created incident",
	},
	{
		id: "3",
		action: "Incident assigned",
		timestamp: dayjs().subtract(1, "hour").subtract(45, "minute").toDate(),
		user: "Security Manager",
		description: "Assigned to Alice Johnson for investigation",
	},
	{
		id: "4",
		action: "Investigation started",
		timestamp: dayjs().subtract(1, "hour").subtract(30, "minute").toDate(),
		user: "Alice Johnson",
		description: "Began analyzing authentication logs and IP addresses",
	},
	{
		id: "5",
		action: "Mitigation applied",
		timestamp: dayjs().subtract(30, "minute").toDate(),
		user: "Alice Johnson",
		description: "Temporarily locked all targeted admin accounts and blocked suspicious IP ranges",
	},
];

export function Page() {
	const severityConfig = severityMap[incident.severity];
	const statusConfig = statusMap[incident.status];

	return (
		<React.Fragment>
			<Helmet>
				<title>{metadata.title}</title>
			</Helmet>
			<Box
				sx={{
					maxWidth: "var(--Content-maxWidth)",
					m: "var(--Content-margin)",
					p: "var(--Content-padding)",
					width: "var(--Content-width)",
				}}
			>
				<Stack spacing={4}>
					<Stack spacing={3}>
						<div>
							<Link
								color="text.primary"
								component={RouterLink}
								href={paths.dashboard.incidents.list}
								sx={{ alignItems: "center", display: "inline-flex", gap: 1 }}
								variant="subtitle2"
							>
								<ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
								Incidents
							</Link>
						</div>
						<Stack direction={{ xs: "column", sm: "row" }} spacing={3} sx={{ alignItems: "flex-start" }}>
							<Stack spacing={2} sx={{ flex: "1 1 auto" }}>
								<Stack direction="row" spacing={2} sx={{ alignItems: "center", flexWrap: "wrap" }}>
									<Typography variant="h4">{incident.title}</Typography>
									<Chip
										icon={severityConfig.icon}
										label={severityConfig.label}
										size="small"
										color={severityConfig.color}
										variant="outlined"
									/>
									<Chip
										icon={statusConfig.icon}
										label={statusConfig.label}
										size="small"
										color={statusConfig.color}
										variant="outlined"
									/>
								</Stack>
								<Typography color="text.secondary" variant="subtitle2">
									{incident.incidentNumber} • {incidentTypeMap[incident.incidentType]}
								</Typography>
							</Stack>
							<Stack direction="row" spacing={2}>
								<Button variant="outlined">Edit</Button>
								<Button variant="contained">Update Status</Button>
							</Stack>
						</Stack>
					</Stack>
					<Grid container spacing={4}>
						<Grid
							size={{
								lg: 8,
								xs: 12,
							}}
						>
							<Stack spacing={4}>
								<Card>
									<CardHeader title="Incident Details" />
									<Divider />
									<CardContent>
										<Stack spacing={3}>
											<div>
												<Typography variant="subtitle2">Description</Typography>
												<Typography color="text.secondary" variant="body2" sx={{ mt: 1 }}>
													{incident.description}
												</Typography>
											</div>
											<div>
												<Typography variant="subtitle2">Affected Systems</Typography>
												<Typography color="text.secondary" variant="body2" sx={{ mt: 1 }}>
													{incident.affectedSystems}
												</Typography>
											</div>
										</Stack>
									</CardContent>
								</Card>
								<Card>
									<CardHeader title="Timeline" />
									<Divider />
									<CardContent>
										<Stack spacing={3}>
											{timeline.map((event, index) => (
												<Stack key={event.id} direction="row" spacing={2}>
													<Box
														sx={{
															display: "flex",
															flexDirection: "column",
															alignItems: "center",
														}}
													>
														<Box
															sx={{
																width: 12,
																height: 12,
																borderRadius: "50%",
																bgcolor: index === timeline.length - 1 ? "primary.main" : "action.selected",
															}}
														/>
														{index < timeline.length - 1 && (
															<Box
																sx={{
																	width: 2,
																	flex: 1,
																	bgcolor: "divider",
																	my: 0.5,
																	minHeight: 32,
																}}
															/>
														)}
													</Box>
													<Box sx={{ flex: 1, pb: index < timeline.length - 1 ? 0 : undefined }}>
														<Typography variant="subtitle2">{event.action}</Typography>
														<Typography color="text.secondary" variant="body2">
															{event.description}
														</Typography>
														<Typography color="text.secondary" variant="caption" sx={{ mt: 0.5, display: "block" }}>
															{dayjs(event.timestamp).format("MMM D, YYYY h:mm A")} • {event.user}
														</Typography>
													</Box>
												</Stack>
											))}
										</Stack>
									</CardContent>
								</Card>
							</Stack>
						</Grid>
						<Grid
							size={{
								lg: 4,
								xs: 12,
							}}
						>
							<Stack spacing={4}>
								<Card>
									<CardHeader title="Incident Information" />
									<PropertyList divider={<Divider />}>
										<PropertyItem name="Incident Number" value={incident.incidentNumber} />
										<PropertyItem name="Type" value={incidentTypeMap[incident.incidentType]} />
										<PropertyItem name="Severity" value={severityConfig.label} />
										<PropertyItem name="Status" value={statusConfig.label} />
										<PropertyItem
											name="Detected At"
											value={dayjs(incident.detectedAt).format("MMM D, YYYY h:mm A")}
										/>
										<PropertyItem
											name="Last Updated"
											value={dayjs(incident.updatedAt).format("MMM D, YYYY h:mm A")}
										/>
									</PropertyList>
								</Card>
								<Card>
									<CardHeader title="Reporter" />
									<PropertyList divider={<Divider />}>
										<PropertyItem name="Name" value={incident.reporterName} />
										<PropertyItem name="Email" value={incident.reporterEmail} />
									</PropertyList>
								</Card>
								<Card>
									<CardHeader title="Assignment" />
									<PropertyList divider={<Divider />}>
										<PropertyItem name="Assigned To" value={incident.assignedTo} />
										<PropertyItem name="Email" value={incident.assignedToEmail} />
									</PropertyList>
								</Card>
							</Stack>
						</Grid>
					</Grid>
				</Stack>
			</Box>
		</React.Fragment>
	);
}
