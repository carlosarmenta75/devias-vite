import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import { Helmet } from "react-helmet-async";
import { useNavigate, useSearchParams } from "react-router-dom";

import { appConfig } from "@/config/app";
import { paths } from "@/paths";
import { dayjs } from "@/lib/dayjs";
import { OrganizationsFilters } from "@/components/dashboard/organization/organizations-filters";
import { OrganizationsPagination } from "@/components/dashboard/organization/organizations-pagination";
import { OrganizationsSelectionProvider } from "@/components/dashboard/organization/organizations-selection-context";
import { OrganizationsTable } from "@/components/dashboard/organization/organizations-table";

const metadata = { title: `List | Organizations | Dashboard | ${appConfig.name}` };

const organizations = [
	{
		id: "ORG-005",
		name: "Tech Solutions Inc",
		logo: "/assets/company-avatar-1.png",
		email: "contact@techsolutions.com",
		phone: "(415) 555-0001",
		customerCount: 45,
		status: "active",
		createdAt: dayjs().subtract(2, "month").toDate(),
	},
	{
		id: "ORG-004",
		name: "Global Industries Ltd",
		logo: "/assets/company-avatar-2.png",
		email: "info@globalindustries.com",
		phone: "(310) 555-0002",
		customerCount: 128,
		status: "active",
		createdAt: dayjs().subtract(5, "month").toDate(),
	},
	{
		id: "ORG-003",
		name: "Innovate Systems",
		logo: "/assets/company-avatar-3.png",
		email: "hello@innovatesystems.com",
		phone: "(212) 555-0003",
		customerCount: 67,
		status: "active",
		createdAt: dayjs().subtract(8, "month").toDate(),
	},
	{
		id: "ORG-002",
		name: "Digital Ventures",
		logo: "/assets/company-avatar-4.png",
		email: "support@digitalventures.com",
		phone: "(646) 555-0004",
		customerCount: 23,
		status: "pending",
		createdAt: dayjs().subtract(1, "year").toDate(),
	},
	{
		id: "ORG-001",
		name: "Enterprise Corp",
		logo: "/assets/company-avatar-5.png",
		email: "contact@enterprisecorp.com",
		phone: "(718) 555-0005",
		customerCount: 0,
		status: "blocked",
		createdAt: dayjs().subtract(2, "year").toDate(),
	},
];

export function Page() {
	const navigate = useNavigate();
	const { email, phone, sortDir, status } = useExtractSearchParams();

	const sortedOrganizations = applySort(organizations, sortDir);
	const filteredOrganizations = applyFilters(sortedOrganizations, { email, phone, status });

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
							<Typography variant="h4">Organizations</Typography>
						</Box>
						<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
							<Button
								startIcon={<PlusIcon />}
								variant="contained"
								onClick={() => { navigate(paths.dashboard.organizations.create); }}
							>
								Add
							</Button>
						</Box>
					</Stack>
					<OrganizationsSelectionProvider organizations={filteredOrganizations}>
						<Card>
							<OrganizationsFilters filters={{ email, phone, status }} sortDir={sortDir} />
							<Divider />
							<Box sx={{ overflowX: "auto" }}>
								<OrganizationsTable rows={filteredOrganizations} />
							</Box>
							<Divider />
							<OrganizationsPagination count={filteredOrganizations.length + 100} page={0} />
						</Card>
					</OrganizationsSelectionProvider>
				</Stack>
			</Box>
		</React.Fragment>
	);
}

function useExtractSearchParams() {
	const [searchParams] = useSearchParams();

	return {
		email: searchParams.get("email") || undefined,
		phone: searchParams.get("phone") || undefined,
		sortDir: searchParams.get("sortDir") || undefined,
		status: searchParams.get("status") || undefined,
	};
}

function applySort(row, sortDir) {
	return row.sort((a, b) => {
		if (sortDir === "asc") {
			return a.createdAt.getTime() - b.createdAt.getTime();
		}

		return b.createdAt.getTime() - a.createdAt.getTime();
	});
}

function applyFilters(row, { email, phone, status }) {
	return row.filter((item) => {
		if (email && !item.email?.toLowerCase().includes(email.toLowerCase())) {
			return false;
		}

		if (phone && !item.phone?.toLowerCase().includes(phone.toLowerCase())) {
			return false;
		}

		if (status && item.status !== status) {
			return false;
		}

		return true;
	});
}
