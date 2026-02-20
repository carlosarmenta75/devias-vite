"use client";

import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import Typography from "@mui/material/Typography";

import { dayjs } from "@/lib/dayjs";

export function ActivityTimeline({ activities = [] }) {
	return (
		<Timeline sx={{ px: 3, "& .MuiTimelineItem-root:before": { flex: 0, p: 0 } }}>
			{activities.map((activity, index) => (
				<TimelineItem key={index}>
					<TimelineSeparator>
						<TimelineDot color={activity.color || "primary"} />
						{index < activities.length - 1 ? <TimelineConnector /> : null}
					</TimelineSeparator>
					<TimelineContent>
						<div>
							<Typography variant="body2">{activity.title}</Typography>
							{activity.timestamp ? (
								<Typography color="text.secondary" variant="caption">
									{dayjs(activity.timestamp).format("MMM D, YYYY h:mm A")}
								</Typography>
							) : null}
							{activity.description ? (
								<Typography color="text.secondary" variant="body2" sx={{ mt: 0.5 }}>
									{activity.description}
								</Typography>
							) : null}
						</div>
					</TimelineContent>
				</TimelineItem>
			))}
		</Timeline>
	);
}
