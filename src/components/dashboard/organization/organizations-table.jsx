"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle";
import { ClockIcon } from "@phosphor-icons/react/dist/ssr/Clock";
import { MinusIcon } from "@phosphor-icons/react/dist/ssr/Minus";
import { PencilSimpleIcon } from "@phosphor-icons/react/dist/ssr/PencilSimple";

import { paths } from "@/paths";
import { dayjs } from "@/lib/dayjs";
import { DataTable } from "@/components/core/data-table";
import { RouterLink } from "@/components/core/link";

import { useOrganizationsSelection } from "./organizations-selection-context";

const columns = [
	{
		formatter: (row) => (
			<Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
				<Avatar src={row.logo} />
				<div>
					<Link
						color="inherit"
						component={RouterLink}
						href={paths.dashboard.organizations.details(row.id)}
						sx={{ whiteSpace: "nowrap" }}
						variant="subtitle2"
					>
						{row.name}
					</Link>
					<Typography color="text.secondary" variant="body2">
						{row.email}
					</Typography>
				</div>
			</Stack>
		),
		name: "Name",
		width: "250px",
	},
	{ field: "phone", name: "Phone number", width: "150px" },
	{
		formatter: (row) => (
			<Typography variant="body2">
				{row.customerCount} {row.customerCount === 1 ? "customer" : "customers"}
			</Typography>
		),
		name: "Customers",
		width: "150px",
	},
	{
		formatter(row) {
			return dayjs(row.createdAt).format("MMM D, YYYY");
		},
		name: "Created at",
		width: "200px",
	},
	{
		formatter: (row) => {
			const mapping = {
				active: { label: "Active", icon: <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" /> },
				blocked: { label: "Blocked", icon: <MinusIcon color="var(--mui-palette-error-main)" /> },
				pending: { label: "Pending", icon: <ClockIcon color="var(--mui-palette-warning-main)" weight="fill" /> },
			};
			const { label, icon } = mapping[row.status] ?? { label: "Unknown", icon: null };

			return <Chip icon={icon} label={label} size="small" variant="outlined" />;
		},
		name: "Status",
		width: "150px",
	},
	{
		formatter: (row) => (
			<IconButton component={RouterLink} href={paths.dashboard.organizations.details(row.id)}>
				<PencilSimpleIcon />
			</IconButton>
		),
		name: "Actions",
		hideName: true,
		width: "100px",
		align: "right",
	},
];

export function OrganizationsTable({ rows }) {
	const { deselectAll, deselectOne, selectAll, selectOne, selected } = useOrganizationsSelection();

	return (
		<React.Fragment>
			<DataTable
				columns={columns}
				onDeselectAll={deselectAll}
				onDeselectOne={(_, row) => { deselectOne(row.id); }}
				onSelectAll={selectAll}
				onSelectOne={(_, row) => { selectOne(row.id); }}
				rows={rows}
				selectable
				selected={selected}
			/>
			{!rows.length ? (
				<Box sx={{ p: 3 }}>
					<Typography color="text.secondary" sx={{ textAlign: "center" }} variant="body2">
						No organizations found
					</Typography>
				</Box>
			) : null}
		</React.Fragment>
	);
}
