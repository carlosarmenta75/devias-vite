import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";

import { appConfig } from "@/config/app";
import { paths } from "@/paths";
import { dayjs } from "@/lib/dayjs";
import { IncidentsFilters } from "@/components/dashboard/incident/incidents-filters";
import { IncidentsPagination } from "@/components/dashboard/incident/incidents-pagination";
import { IncidentsSelectionProvider } from "@/components/dashboard/incident/incidents-selection-context";
import { IncidentsTable } from "@/components/dashboard/incident/incidents-table";
import { RouterLink } from "@/components/core/link";

const metadata = { title: `List | Incidents | Dashboard | ${appConfig.name}` };

const incidents = [
	{
		id: "INC-001",
		incidentNumber: "INC-001",
		title: "Suspicious Login Attempts Detected",
		description: "Multiple failed login attempts from unknown IP addresses detected on admin accounts",
		severity: "high",
		status: "investigating",
		incidentType: "unauthorized_access",
		affectedSystems: "Admin Portal, Authentication Service",
		reporterName: "John Smith",
		reporterEmail: "john.smith@company.com",
		assignedTo: "Alice Johnson",
		detectedAt: dayjs().subtract(2, "hour").toDate(),
		createdAt: dayjs().subtract(2, "hour").toDate(),
	},
	{
		id: "INC-002",
		incidentNumber: "INC-002",
		title: "Phishing Email Campaign",
		description: "Mass phishing email campaign targeting employees with fake password reset links",
		severity: "critical",
		status: "contained",
		incidentType: "phishing",
		affectedSystems: "Email System, End User Devices",
		reporterName: "Sarah Williams",
		reporterEmail: "sarah.williams@company.com",
		assignedTo: "Bob Chen",
		detectedAt: dayjs().subtract(5, "hour").toDate(),
		createdAt: dayjs().subtract(5, "hour").toDate(),
	},
	{
		id: "INC-003",
		incidentNumber: "INC-003",
		title: "Malware Detected on Workstation",
		description: "Trojan malware detected on employee workstation attempting to exfiltrate data",
		severity: "high",
		status: "resolved",
		incidentType: "malware",
		affectedSystems: "WS-2347, File Server",
		reporterName: "Michael Brown",
		reporterEmail: "michael.brown@company.com",
		assignedTo: "Alice Johnson",
		detectedAt: dayjs().subtract(1, "day").toDate(),
		resolvedAt: dayjs().subtract(6, "hour").toDate(),
		createdAt: dayjs().subtract(1, "day").toDate(),
	},
	{
		id: "INC-004",
		incidentNumber: "INC-004",
		title: "DDoS Attack on Web Services",
		description: "Distributed denial of service attack overwhelming web application servers",
		severity: "critical",
		status: "investigating",
		incidentType: "ddos",
		affectedSystems: "Web Application, Load Balancers, CDN",
		reporterName: "Emily Davis",
		reporterEmail: "emily.davis@company.com",
		assignedTo: "Bob Chen",
		detectedAt: dayjs().subtract(30, "minute").toDate(),
		createdAt: dayjs().subtract(30, "minute").toDate(),
	},
	{
		id: "INC-005",
		incidentNumber: "INC-005",
		title: "Unauthorized Data Access",
		description: "Employee accessed customer data without authorization or business need",
		severity: "medium",
		status: "open",
		incidentType: "insider_threat",
		affectedSystems: "Customer Database, CRM System",
		reporterName: "David Wilson",
		reporterEmail: "david.wilson@company.com",
		assignedTo: "Alice Johnson",
		detectedAt: dayjs().subtract(3, "hour").toDate(),
		createdAt: dayjs().subtract(3, "hour").toDate(),
	},
	{
		id: "INC-006",
		incidentNumber: "INC-006",
		title: "Ransomware Encryption Attempt",
		description: "Ransomware detected attempting to encrypt files on network file share",
		severity: "critical",
		status: "contained",
		incidentType: "ransomware",
		affectedSystems: "File Server FS-01, Network Share",
		reporterName: "Jennifer Martinez",
		reporterEmail: "jennifer.martinez@company.com",
		assignedTo: "Bob Chen",
		detectedAt: dayjs().subtract(8, "hour").toDate(),
		createdAt: dayjs().subtract(8, "hour").toDate(),
	},
];

export function Page() {
	const { severity, status, incidentType, sortDir } = useExtractSearchParams();

	const sortedIncidents = applySort(incidents, sortDir);
	const filteredIncidents = applyFilters(sortedIncidents, { severity, status, incidentType });

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
					<Stack direction={{ xs: "column", sm: "row" }} spacing={3} sx={{ alignItems: "flex-start" }}>
						<Box sx={{ flex: "1 1 auto" }}>
							<Typography variant="h4">Security Incidents</Typography>
						</Box>
						<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
							<Button component={RouterLink} href={paths.dashboard.incidents.create} startIcon={<PlusIcon />} variant="contained">
								Report Incident
							</Button>
						</Box>
					</Stack>
					<IncidentsSelectionProvider incidents={filteredIncidents}>
						<Card>
							<IncidentsFilters filters={{ severity, status, incidentType }} sortDir={sortDir} />
							<Divider />
							<Box sx={{ overflowX: "auto" }}>
								<IncidentsTable rows={filteredIncidents} />
							</Box>
							<Divider />
							<IncidentsPagination count={filteredIncidents.length} page={0} />
						</Card>
					</IncidentsSelectionProvider>
				</Stack>
			</Box>
		</React.Fragment>
	);
}

function useExtractSearchParams() {
	const [searchParams] = useSearchParams();

	return {
		severity: searchParams.get("severity") || undefined,
		status: searchParams.get("status") || undefined,
		incidentType: searchParams.get("incidentType") || undefined,
		sortDir: searchParams.get("sortDir") || undefined,
	};
}

function applySort(row, sortDir) {
	return row.sort((a, b) => {
		if (sortDir === "asc") {
			return a.detectedAt.getTime() - b.detectedAt.getTime();
		}

		return b.detectedAt.getTime() - a.detectedAt.getTime();
	});
}

function applyFilters(row, { severity, status, incidentType }) {
	return row.filter((item) => {
		if (severity && item.severity !== severity) {
			return false;
		}

		if (status && item.status !== status) {
			return false;
		}

		if (incidentType && item.incidentType !== incidentType) {
			return false;
		}

		return true;
	});
}
