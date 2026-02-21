"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ShieldCheckIcon } from "@phosphor-icons/react/dist/ssr/ShieldCheck";
import { ShieldWarningIcon } from "@phosphor-icons/react/dist/ssr/ShieldWarning";
import { ShieldSlashIcon } from "@phosphor-icons/react/dist/ssr/ShieldSlash";
import { WarningIcon } from "@phosphor-icons/react/dist/ssr/Warning";
import { CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle";
import { ClockIcon } from "@phosphor-icons/react/dist/ssr/Clock";
import { PencilSimpleIcon } from "@phosphor-icons/react/dist/ssr/PencilSimple";

import { paths } from "@/paths";
import { dayjs } from "@/lib/dayjs";
import { DataTable } from "@/components/core/data-table";
import { RouterLink } from "@/components/core/link";

import { useIncidentsSelection } from "./incidents-selection-context";

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

const columns = [
	{
		formatter: (row) => (
			<Link
				color="inherit"
				component={RouterLink}
				href={paths.dashboard.incidents.details(row.id)}
				sx={{ whiteSpace: "nowrap" }}
				variant="subtitle2"
			>
				{row.incidentNumber}
			</Link>
		),
		name: "Incident #",
		width: "120px",
	},
	{
		formatter: (row) => (
			<Stack spacing={0.5}>
				<Link
					color="inherit"
					component={RouterLink}
					href={paths.dashboard.incidents.details(row.id)}
					variant="subtitle2"
				>
					{row.title}
				</Link>
				<Typography color="text.secondary" variant="body2">
					{incidentTypeMap[row.incidentType]}
				</Typography>
			</Stack>
		),
		name: "Title",
		width: "300px",
	},
	{
		formatter: (row) => {
			const { label, color, icon } = severityMap[row.severity] ?? { label: "Unknown", color: "default", icon: null };
			return <Chip icon={icon} label={label} size="small" color={color} variant="outlined" />;
		},
		name: "Severity",
		width: "120px",
	},
	{
		formatter: (row) => {
			const { label, color, icon } = statusMap[row.status] ?? { label: "Unknown", color: "default", icon: null };
			return <Chip icon={icon} label={label} size="small" color={color} variant="outlined" />;
		},
		name: "Status",
		width: "150px",
	},
	{
		formatter: (row) => (
			<Typography variant="body2" color="text.secondary">
				{row.assignedTo || "Unassigned"}
			</Typography>
		),
		name: "Assigned To",
		width: "150px",
	},
	{
		formatter(row) {
			return dayjs(row.detectedAt).format("MMM D, YYYY h:mm A");
		},
		name: "Detected At",
		width: "200px",
	},
	{
		formatter: () => (
			<IconButton component={RouterLink} href={paths.dashboard.incidents.details("1")}>
				<PencilSimpleIcon />
			</IconButton>
		),
		name: "Actions",
		hideName: true,
		width: "100px",
		align: "right",
	},
];

export function IncidentsTable({ rows }) {
	const { deselectAll, deselectOne, selectAll, selectOne, selected } = useIncidentsSelection();

	return (
		<React.Fragment>
			<DataTable
				columns={columns}
				onDeselectAll={deselectAll}
				onDeselectOne={(_, row) => {
					deselectOne(row.id);
				}}
				onSelectAll={selectAll}
				onSelectOne={(_, row) => {
					selectOne(row.id);
				}}
				rows={rows}
				selectable
				selected={selected}
			/>
			{rows.length === 0 ? (
				<Box sx={{ p: 3 }}>
					<Typography color="text.secondary" sx={{ textAlign: "center" }} variant="body2">
						No incidents found
					</Typography>
				</Box>
			) : null}
		</React.Fragment>
	);
}
