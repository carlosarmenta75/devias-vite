"use client";

import * as React from "react";

import { useSelection } from "@/hooks/use-selection";

function noop() {
}

export const IncidentsSelectionContext = React.createContext({
	deselectAll: noop,
	deselectOne: noop,
	selectAll: noop,
	selectOne: noop,
	selected: new Set(),
	selectedAny: false,
	selectedAll: false,
});

export function IncidentsSelectionProvider({ children, incidents = [] }) {
	const incidentIds = React.useMemo(() => incidents.map((incident) => incident.id), [incidents]);
	const selection = useSelection(incidentIds);

	return <IncidentsSelectionContext.Provider value={{ ...selection }}>{children}</IncidentsSelectionContext.Provider>;
}

export function useIncidentsSelection() {
	return React.useContext(IncidentsSelectionContext);
}
