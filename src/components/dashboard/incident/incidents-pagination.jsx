"use client";

import * as React from "react";
import TablePagination from "@mui/material/TablePagination";

function noop() {
}

export function IncidentsPagination({ count, page }) {
	return (
		<TablePagination
			component="div"
			count={count}
			onPageChange={noop}
			onRowsPerPageChange={noop}
			page={page}
			rowsPerPage={10}
			rowsPerPageOptions={[10, 25, 50]}
		/>
	);
}
