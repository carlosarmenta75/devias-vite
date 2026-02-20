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
import { OrganizationCreateForm } from "@/components/dashboard/organization/organization-create-form";

const metadata = { title: `Create | Organizations | Dashboard | ${appConfig.name}` };

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
								href={paths.dashboard.organizations.list}
								sx={{ alignItems: "center", display: "inline-flex", gap: 1 }}
								variant="subtitle2"
							>
								<ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
								Organizations
							</Link>
						</div>
						<div>
							<Typography variant="h4">Create organization</Typography>
						</div>
					</Stack>
					<OrganizationCreateForm />
				</Stack>
			</Box>
		</React.Fragment>
	);
}
