import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { Helmet } from "react-helmet-async";

import { appConfig } from "@/config/app";
import { paths } from "@/paths";
import { dayjs } from "@/lib/dayjs";
import { ActivityTimeline } from "@/components/core/activity-timeline";
import { RouterLink } from "@/components/core/link";
import { ContactForm } from "@/components/marketing/contact/contact-form";
import { Customers } from "@/components/marketing/contact/customers";

const metadata = { title: `Contact | ${appConfig.name}` };

const recentActivities = [
	{
		title: "Inquiry submitted",
		timestamp: dayjs().subtract(10, "minute").toDate(),
		description: "New contact form submission received",
		color: "success",
	},
	{
		title: "Form opened",
		timestamp: dayjs().subtract(15, "minute").toDate(),
		description: "Contact page visited",
		color: "primary",
	},
	{
		title: "Email verified",
		timestamp: dayjs().subtract(30, "minute").toDate(),
		description: "Email address confirmed",
		color: "primary",
	},
];

export function Page() {
	return (
		<React.Fragment>
			<Helmet>
				<title>{metadata.title}</title>
			</Helmet>
			<Box
				component="main"
				sx={{
					display: "grid",
					flex: "1 1 auto",
					gridTemplateColumns: { xs: "repeat(1, 1fr)", md: "repeat(2, 1fr)" },
					minHeight: "100%",
				}}
			>
				<Box
					sx={{
						bgcolor: "var(--mui-palette-background-level1)",
						display: "flex",
						alignItems: { md: "flex-end" },
						flexDirection: "column",
						px: { xs: "24px", md: "60px" },
						py: { xs: "60px", md: "120px" },
					}}
				>
					<Box maxWidth="sm">
						<Stack spacing={3}>
							<div>
								<Link
									color="text.primary"
									component={RouterLink}
									href={paths.home}
									sx={{ alignItems: "center", display: "inline-flex", gap: 1 }}
									variant="subtitle2"
								>
									<ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
									Home
								</Link>
							</div>
							<Stack spacing={6}>
								<Typography variant="h3">Talk to our account expert</Typography>
								<Typography variant="body1">
									Have questions about integrating our APIs? Fill out the form and a senior web expert will be in touch
									shortly.
								</Typography>
								<Typography color="primary" variant="h6">
									Join 10,000+ forward-thinking companies:
								</Typography>
								<Customers />
							</Stack>
						</Stack>
					</Box>
				</Box>
				<Box sx={{ px: { xs: "24px", md: "60px" }, py: { xs: "60px", md: "120px" } }}>
					<Box maxWidth="sm">
						<Stack spacing={3}>
							<Typography variant="h6">Fill the form below</Typography>
							<ContactForm />
							<Card>
								<CardHeader title="Recent Activity" />
								<CardContent>
									<ActivityTimeline activities={recentActivities} />
								</CardContent>
							</Card>
						</Stack>
					</Box>
				</Box>
			</Box>
		</React.Fragment>
	);
}
