"use client";

import * as React from "react";
import TablePagination from "@mui/material/TablePagination";

function noop() {
	// No operation
}

export function OrganizationsPagination({ count, page }) {
	return (
		<TablePagination
			component="div"
			count={count}
			onPageChange={noop}
			onRowsPerPageChange={noop}
			page={page}
			rowsPerPage={5}
			rowsPerPageOptions={[5, 10, 25]}
		/>
	);
}
