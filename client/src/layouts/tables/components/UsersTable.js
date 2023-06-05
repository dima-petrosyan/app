import React, { useCallback, useMemo } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { usersApi } from 'api/users.api'
import ArgonBox from "components/ArgonBox"

export const UsersTable = () => {
	 const columnDefs = [
    // this row shows the row index, doesn't use any data from the row
    {
      // headerName: 'ID',
      maxWidth: 50,
      // it is important to have node.id here, so that when the id changes (which happens
      // when the row is loaded) then the cell is refreshed.
      valueGetter: 'node.id',
      cellRenderer: (props) => {
        if (props.value !== undefined) {
          // return props.value;
        } else {
          return (
            <img src="https://www.ag-grid.com/example-assets/loading.gif" />
          );
        }
      },
    },
    { field: 'name' },
    { field: 'surname' },
    { field: 'birthday' },
    { field: 'city' },
  ];
  
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      resizable: true,
      minWidth: 100,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    usersApi.getUsers()
      .then(data => {
        const dataSource = {
          rowCount: undefined,
          getRows: async (params) => {
            const users = await usersApi.getUsers(params.startRow, params.endRow)
            const lastRow = (data.length <= params.endRow) ? data.length : -1
            params.successCallback(users, lastRow);
          }
        }
      params.api.setDatasource(dataSource);
    })
  }, [])
    return (
      <ArgonBox id="myGrid" className="ag-theme-material" sx={{ height: 400 }}>
        <AgGridReact
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowBuffer={0}
            rowSelection={'multiple'}
            rowModelType={'infinite'}
            cacheBlockSize={10}
            cacheOverflowSize={2}
            maxConcurrentDatasourceRequests={2}
            infiniteInitialRowCount={1}
            maxBlocksInCache={2}
            onGridReady={onGridReady}
        />
      </ArgonBox>
    )
}