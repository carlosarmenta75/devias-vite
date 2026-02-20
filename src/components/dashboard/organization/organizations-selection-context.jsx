"use client";

import * as React from "react";

import { useSelection } from "@/hooks/use-selection";

function noop() {
	// No operation
}

export const OrganizationsSelectionContext = React.createContext({
	deselectAll: noop,
	deselectOne: noop,
	selectAll: noop,
	selectOne: noop,
	selected: new Set(),
	selectedAny: false,
	selectedAll: false,
});

export function OrganizationsSelectionProvider({ children, organizations = [] }) {
	const organizationIds = React.useMemo(() => organizations.map((organization) => organization.id), [organizations]);
	const selection = useSelection(organizationIds);

	return <OrganizationsSelectionContext.Provider value={{ ...selection }}>{children}</OrganizationsSelectionContext.Provider>;
}

export function useOrganizationsSelection() {
	return React.useContext(OrganizationsSelectionContext);
}
