import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Navigate, useNavigate } from "react-router-dom";

const DataTablePrime = ({ colums, data, source }) => {
  const navigate = useNavigate();
  function wrapWord(rowData) {
    return rowData?.description?.substr(0, 20) + "...";
  }
  return (
    <DataTable
      showGridlines
      stripedRows
      scrollable
      paginator
      scrollHeight="400px"
      rows={12}
      emptyMessage="No Data Found"
      value={data}
      removableSort
      selectionMode={source !== "user" ? "single" : null}
      onSelectionChange={(e) =>
        source !== "user" ? navigate(`${e?.value?._id}`) : null
      }
    >
      {colums &&
        colums.map((data, index) => (
          <Column
            key={data?.field}
            field={data?.field}
            header={data?.header}
            sortable
            style={{ width: "25%" }}
            body={data?.field === "description" ? wrapWord : null}
          />
        ))}
    </DataTable>
  );
};

export default DataTablePrime;
