"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

import { paths } from "@/paths";
import { FilterButton, FilterPopover, useFilterContext } from "@/components/core/filter-button";
import { Option } from "@/components/core/option";

import { useIncidentsSelection } from "./incidents-selection-context";

const severityTabs = [
	{ label: "All Severities", value: "" },
	{ label: "Critical", value: "critical" },
	{ label: "High", value: "high" },
	{ label: "Medium", value: "medium" },
	{ label: "Low", value: "low" },
];

const statusOptions = [
	{ label: "All Statuses", value: "" },
	{ label: "Open", value: "open" },
	{ label: "Investigating", value: "investigating" },
	{ label: "Contained", value: "contained" },
	{ label: "Resolved", value: "resolved" },
	{ label: "Closed", value: "closed" },
];

const incidentTypeOptions = [
	{ label: "All Types", value: "" },
	{ label: "Malware", value: "malware" },
	{ label: "Phishing", value: "phishing" },
	{ label: "Data Breach", value: "data_breach" },
	{ label: "DDoS Attack", value: "ddos" },
	{ label: "Unauthorized Access", value: "unauthorized_access" },
	{ label: "Insider Threat", value: "insider_threat" },
	{ label: "Ransomware", value: "ransomware" },
	{ label: "Other", value: "other" },
];

export function IncidentsFilters({ filters = {}, sortDir = "desc" }) {
	const { severity, status, incidentType } = filters;

	const navigate = useNavigate();

	const selection = useIncidentsSelection();

	const updateSearchParams = React.useCallback(
		(newFilters, newSortDir) => {
			const searchParams = new URLSearchParams();

			if (newSortDir === "asc") {
				searchParams.set("sortDir", newSortDir);
			}

			if (newFilters.severity) {
				searchParams.set("severity", newFilters.severity);
			}

			if (newFilters.status) {
				searchParams.set("status", newFilters.status);
			}

			if (newFilters.incidentType) {
				searchParams.set("incidentType", newFilters.incidentType);
			}

			navigate(`${paths.dashboard.incidents.list}?${searchParams.toString()}`);
		},
		[navigate]
	);

	const handleClearFilters = React.useCallback(() => {
		updateSearchParams({}, sortDir);
	}, [updateSearchParams, sortDir]);

	const handleSeverityChange = React.useCallback(
		(_, value) => {
			updateSearchParams({ ...filters, severity: value }, sortDir);
		},
		[updateSearchParams, filters, sortDir]
	);

	const handleStatusChange = React.useCallback(
		(value) => {
			updateSearchParams({ ...filters, status: value }, sortDir);
		},
		[updateSearchParams, filters, sortDir]
	);

	const handleIncidentTypeChange = React.useCallback(
		(value) => {
			updateSearchParams({ ...filters, incidentType: value }, sortDir);
		},
		[updateSearchParams, filters, sortDir]
	);

	const handleSortChange = React.useCallback(
		(event) => {
			updateSearchParams(filters, event.target.value);
		},
		[updateSearchParams, filters]
	);

	const hasFilters = severity || status || incidentType;

	return (
		<div>
			<Tabs onChange={handleSeverityChange} sx={{ px: 3 }} value={severity ?? ""} variant="scrollable">
				{severityTabs.map((tab) => (
					<Tab
						key={tab.value}
						label={tab.label}
						sx={{ minHeight: "auto" }}
						tabIndex={0}
						value={tab.value}
					/>
				))}
			</Tabs>
			<Divider />
			<Stack direction="row" spacing={2} sx={{ alignItems: "center", flexWrap: "wrap", px: 3, py: 2 }}>
				<Stack direction="row" spacing={2} sx={{ alignItems: "center", flex: "1 1 auto", flexWrap: "wrap" }}>
					<FilterButton
						displayValue={statusOptions.find(opt => opt.value === status)?.label}
						label="Status"
						onFilterApply={(value) => {
							handleStatusChange(value);
						}}
						onFilterDelete={() => {
							handleStatusChange();
						}}
						popover={<StatusFilterPopover />}
						value={status}
					/>
					<FilterButton
						displayValue={incidentTypeOptions.find(opt => opt.value === incidentType)?.label}
						label="Incident Type"
						onFilterApply={(value) => {
							handleIncidentTypeChange(value);
						}}
						onFilterDelete={() => {
							handleIncidentTypeChange();
						}}
						popover={<IncidentTypeFilterPopover />}
						value={incidentType}
					/>
					{hasFilters ? <Button onClick={handleClearFilters}>Clear filters</Button> : null}
				</Stack>
				{selection.selectedAny ? (
					<Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
						<Typography color="text.secondary" variant="body2">
							{selection.selected.size} selected
						</Typography>
						<Button color="error" variant="contained">
							Delete
						</Button>
					</Stack>
				) : null}
				<Select name="sort" onChange={handleSortChange} sx={{ maxWidth: "100%", width: "120px" }} value={sortDir}>
					<Option value="desc">Newest</Option>
					<Option value="asc">Oldest</Option>
				</Select>
			</Stack>
		</div>
	);
}

function StatusFilterPopover() {
	const { anchorEl, onApply, onClose, open, value: initialValue } = useFilterContext();
	const [value, setValue] = React.useState("");

	React.useEffect(() => {
		setValue(initialValue ?? "");
	}, [initialValue]);

	return (
		<FilterPopover anchorEl={anchorEl} onClose={onClose} open={open} title="Filter by status">
			<FormControl>
				<Select
					onChange={(event) => {
						setValue(event.target.value);
					}}
					value={value}
				>
					{statusOptions.map((option) => (
						<Option key={option.value} value={option.value}>
							{option.label}
						</Option>
					))}
				</Select>
			</FormControl>
			<Button
				onClick={() => {
					onApply(value);
				}}
				variant="contained"
			>
				Apply
			</Button>
		</FilterPopover>
	);
}

function IncidentTypeFilterPopover() {
	const { anchorEl, onApply, onClose, open, value: initialValue } = useFilterContext();
	const [value, setValue] = React.useState("");

	React.useEffect(() => {
		setValue(initialValue ?? "");
	}, [initialValue]);

	return (
		<FilterPopover anchorEl={anchorEl} onClose={onClose} open={open} title="Filter by incident type">
			<FormControl>
				<Select
					onChange={(event) => {
						setValue(event.target.value);
					}}
					value={value}
				>
					{incidentTypeOptions.map((option) => (
						<Option key={option.value} value={option.value}>
							{option.label}
						</Option>
					))}
				</Select>
			</FormControl>
			<Button
				onClick={() => {
					onApply(value);
				}}
				variant="contained"
			>
				Apply
			</Button>
		</FilterPopover>
	);
}
