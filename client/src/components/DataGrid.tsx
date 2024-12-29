import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

type DataPoint = {
    id: string,
    number: number;
    timestamp: string;
}

type GridProps = {
    data: DataPoint[]
}

export default function StreamingDataHistory({data}: GridProps) {
    const columns: GridColDef<(typeof data)[number]>[] = [
      { 
        field: 'id',
        headerName: 'ID',
        width: 90 
      },
      {
        field: 'number',
        headerName: 'Number',
        width: 150,
        editable: false,
      },
      {
        field: 'timestamp',
        headerName: 'Timestamp',
        width: 150,
        editable: false,
      }
    ];
  return (
    <Box sx={{ height: 400, width: '80%', margin: '1rem' }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSizeOptions={[20]}
        sx={{
            border: 2,
            backgroundColor: '#FFFFFF',
            borderColor: '#FFFFFF',
        }}
      />
    </Box>
  );
}