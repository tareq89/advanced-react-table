import React from "react";

export const TotalFound = (props: { totalFound: number; start: number; limit: number }) => {
  return (
    <div>
      {props.totalFound > 0 ? (
        <p>
          Showing {props.start + 1} to {props.start + props.limit} of {props.totalFound} entries
        </p>
      ) : (
        <p>No entry found</p>
      )}
    </div>
  );
};
