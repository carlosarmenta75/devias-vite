import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr/CaretDown";
import { CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle";
import { HouseIcon } from "@phosphor-icons/react/dist/ssr/House";
import { PencilSimpleIcon } from "@phosphor-icons/react/dist/ssr/PencilSimple";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

import { appConfig } from "@/config/app";
import { paths } from "@/paths";
import { dayjs } from "@/lib/dayjs";
import { RouterLink } from "@/components/core/link";
import { PropertyItem } from "@/components/core/property-item";
import { PropertyList } from "@/components/core/property-list";

const metadata = { title: `Details | Organizations | Dashboard | ${appConfig.name}` };

const organization = {
	id: "ORG-005",
	name: "Tech Solutions Inc",
	logo: "/assets/company-avatar-1.png",
	email: "contact@techsolutions.com",
	phone: "(415) 555-0001",
	website: "www.techsolutions.com",
	customerCount: 45,
	status: "active",
	address: {
		country: "United States",
		state: "California",
		city: "San Francisco",
		zipCode: "94102",
		line1: "123 Market Street",
		line2: "Suite 400",
	},
	taxId: "12-3456789",
	timezone: "America/Los_Angeles",
	currency: "USD",
	createdAt: dayjs().subtract(2, "month").toDate(),
};

const customers = [
	{
		id: "USR-001",
		name: "Fran Perez",
		avatar: "/assets/avatar-5.png",
		email: "fran.perez@techsolutions.com",
		phone: "(415) 704-0045",
		status: "active",
		joinedAt: dayjs().subtract(1, "month").toDate(),
	},
	{
		id: "USR-002",
		name: "Penjani Inyene",
		avatar: "/assets/avatar-4.png",
		email: "penjani.inyene@techsolutions.com",
		phone: "(415) 937-8925",
		status: "active",
		joinedAt: dayjs().subtract(2, "month").toDate(),
	},
	{
		id: "USR-003",
		name: "Carson Darrin",
		avatar: "/assets/avatar-3.png",
		email: "carson.darrin@techsolutions.com",
		phone: "(415) 278-5041",
		status: "active",
		joinedAt: dayjs().subtract(3, "month").toDate(),
	},
	{
		id: "USR-004",
		name: "Siegbert Gottfried",
		avatar: "/assets/avatar-2.png",
		email: "siegbert.gottfried@techsolutions.com",
		phone: "(415) 766-0431",
		status: "pending",
		joinedAt: dayjs().subtract(4, "month").toDate(),
	},
	{
		id: "USR-005",
		name: "Miron Vitold",
		avatar: "/assets/avatar-1.png",
		email: "miron.vitold@techsolutions.com",
		phone: "(415) 434-5535",
		status: "active",
		joinedAt: dayjs().subtract(5, "month").toDate(),
	},
];

export function Page() {
	const { organizationId } = useParams();

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
						<Stack direction={{ xs: "column", sm: "row" }} spacing={3} sx={{ alignItems: "flex-start" }}>
							<Stack direction="row" spacing={2} sx={{ alignItems: "center", flex: "1 1 auto" }}>
								<Avatar src={organization.logo} sx={{ "--Avatar-size": "64px" }}>
									{organization.name.charAt(0)}
								</Avatar>
								<div>
									<Stack direction="row" spacing={2} sx={{ alignItems: "center", flexWrap: "wrap" }}>
										<Typography variant="h4">{organization.name}</Typography>
										<Chip
											icon={<CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" />}
											label="Active"
											size="small"
											variant="outlined"
										/>
									</Stack>
									<Typography color="text.secondary" variant="body1">
										{organization.email}
									</Typography>
								</div>
							</Stack>
							<div>
								<Button endIcon={<CaretDownIcon />} variant="contained">
									Action
								</Button>
							</div>
						</Stack>
					</Stack>
					<Grid container spacing={4}>
						<Grid
							size={{
								lg: 4,
								xs: 12,
							}}
						>
							<Stack spacing={4}>
								<Card>
									<CardHeader
										action={
											<IconButton>
												<PencilSimpleIcon />
											</IconButton>
										}
										avatar={
											<Avatar>
												<HouseIcon fontSize="var(--Icon-fontSize)" />
											</Avatar>
										}
										title="Basic details"
									/>
									<PropertyList divider={<Divider />} sx={{ "--PropertyItem-padding": "12px 24px" }}>
										<PropertyItem name="Phone" value={organization.phone} />
										<PropertyItem name="Website" value={organization.website} />
										<PropertyItem name="Tax ID" value={organization.taxId} />
										<PropertyItem name="Timezone" value={organization.timezone} />
										<PropertyItem name="Currency" value={organization.currency} />
										<PropertyItem
											name="Created at"
											value={dayjs(organization.createdAt).format("MMM D, YYYY")}
										/>
									</PropertyList>
								</Card>
								<Card>
									<CardHeader
										action={
											<IconButton>
												<PencilSimpleIcon />
											</IconButton>
										}
										title="Address"
									/>
									<CardContent>
										<Stack divider={<Divider />} spacing={1}>
											<Typography variant="subtitle2">{organization.address.line1}</Typography>
											{organization.address.line2 ? (
												<Typography variant="subtitle2">{organization.address.line2}</Typography>
											) : null}
											<Typography color="text.secondary" variant="body2">
												{organization.address.city}, {organization.address.state} {organization.address.zipCode}
											</Typography>
											<Typography color="text.secondary" variant="body2">
												{organization.address.country}
											</Typography>
										</Stack>
									</CardContent>
								</Card>
							</Stack>
						</Grid>
						<Grid
							size={{
								lg: 8,
								xs: 12,
							}}
						>
							<Stack spacing={4}>
								<Card>
									<CardHeader
										action={
											<Button
												component={RouterLink}
												href={paths.dashboard.customers.create}
												size="small"
												startIcon={<PencilSimpleIcon />}
											>
												Add customer
											</Button>
										}
										title="Customers"
									/>
									<Divider />
									<Box sx={{ overflowX: "auto" }}>
										<Table sx={{ minWidth: 600 }}>
											<TableHead>
												<TableRow>
													<TableCell>Name</TableCell>
													<TableCell>Email</TableCell>
													<TableCell>Phone</TableCell>
													<TableCell>Status</TableCell>
													<TableCell>Joined</TableCell>
													<TableCell />
												</TableRow>
											</TableHead>
											<TableBody>
												{customers.map((customer) => (
													<TableRow key={customer.id} hover>
														<TableCell>
															<Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
																<Avatar src={customer.avatar} sx={{ "--Avatar-size": "40px" }} />
																<Typography variant="subtitle2">{customer.name}</Typography>
															</Stack>
														</TableCell>
														<TableCell>{customer.email}</TableCell>
														<TableCell>{customer.phone}</TableCell>
														<TableCell>
															<Chip
																icon={
																	customer.status === "active" ? (
																		<CheckCircleIcon
																			color="var(--mui-palette-success-main)"
																			weight="fill"
																		/>
																	) : null
																}
																label={customer.status}
																size="small"
																variant="outlined"
															/>
														</TableCell>
														<TableCell>{dayjs(customer.joinedAt).format("MMM D, YYYY")}</TableCell>
														<TableCell align="right">
															<IconButton
																component={RouterLink}
																href={paths.dashboard.customers.details(customer.id)}
															>
																<PencilSimpleIcon />
															</IconButton>
														</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
									</Box>
								</Card>
							</Stack>
						</Grid>
					</Grid>
				</Stack>
			</Box>
		</React.Fragment>
	);
}
