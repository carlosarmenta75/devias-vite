import * as React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { Helmet } from "react-helmet-async";

import { appConfig } from "@/config/app";
import { paths } from "@/paths";
import { RouterLink } from "@/components/core/link";
import { IncidentCreateForm } from "@/components/dashboard/incident/incident-create-form";

const metadata = { title: `Report Incident | Incidents | Dashboard | ${appConfig.name}` };

export function Page() {
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
						<div>
							<Typography variant="h4">Report Security Incident</Typography>
						</div>
					</Stack>
					<IncidentCreateForm />
				</Stack>
			</Box>
		</React.Fragment>
	);
}
