import React, { useCallback, useMemo, useState, useEffect, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { postsApi } from 'api/posts.api'
import ArgonBox from "components/ArgonBox"
import ArgonButton from "components/ArgonButton"
import Modal from '@mui/material/Modal'
import ArgonInput from 'components/ArgonInput'
import ArgonTypography from 'components/ArgonTypography'

export const PostsTable = () => {

    const gridRef = useRef()

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
                    // return props.value
                } else {
                    return (
                        <img src="https://www.ag-grid.com/example-assets/loading.gif" />
                    )
                }
            },
        },
        { field: 'title' },
        { field: 'content' },
        { field: 'created_at' },
        { field: 'user_id' },
    ]

    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            resizable: true,
            minWidth: 100,
        }
    }, [])

    const onGridReady = (params) => {
        const dataSource = {
            rowCount: undefined,
            getRows: async (params) => {
                const rowsThisPage = await postsApi.getPosts(params.startRow, params.endRow)
                const posts = await postsApi.getPosts()
                const numberOfRows = posts.length
                const lastRow = (numberOfRows <= params.endRow) ? numberOfRows : -1
                params.successCallback(rowsThisPage, lastRow)
            },
        } 
        params.api.setDatasource(dataSource)
    }

    const onInsert = async () => {
        const newPost = {
            title: 'title',
            content: 'content',
            created_at: '2022-01-01',
            user_id: 5,
        }
        const res = await postsApi.createPost(newPost)
        gridRef.current.api.purgeInfiniteCache()
    }

    const onUpdate = async () => {
        const selectedRows = gridRef.current.api.getSelectedRows()
        const id = selectedRows[0]?.id
        if (id) {
            setOpen(true)
            const selectedRowData = selectedRows[0]
            setModalData({
                ...selectedRowData,
            })
        }
    }

    const onDelete = async () => {
        const selectedRows = gridRef.current.api.getSelectedRows()
        const id = selectedRows[0]?.id
        if (id) {
            await postsApi.deletePost(id)
            gridRef.current.api.purgeInfiniteCache()
        }
    }

    const gridOptions = {
        ref: gridRef,
        columnDefs,
        defaultColDef,
        rowBuffer: 0,
        rowModelType: 'infinite',
        cacheBlockSize: 10,
        cacheOverflowSize: 2,
        maxConcurrentDatasourceRequests: 2,
        infiniteInitialRowCount: 1,
        maxBlocksInCache: 2,
        onGridReady,
        rowSelection: 'single',
    }

    const [open, setOpen] = React.useState(false)
    const handleClose = () => setOpen(false)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        pt: 3,
        borderRadius: 5,
    }

    const [modalData, setModalData] = useState({
        title: '',
        content: '',
        created_at: '',
        user_id: '',
    })

    const handleChangeModalData = (event) => {
        setModalData(prev => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }

    const handleUpdate = async () => {
        const selectedRows = gridRef.current.api.getSelectedRows()
        const id = selectedRows[0]?.id
        const res = await postsApi.updatePost(id, modalData)
        gridRef.current.api.purgeInfiniteCache()
        handleClose()
    }

    return ( 
    	<>
	    	<ArgonBox sx={{ display: 'flex', gap: 3, pb: 1, pr: 5, ml: 'auto', width: 'max-content' }}>
                <ArgonButton color='secondary' variant='outlined' onClick={onInsert}>Insert</ArgonButton>
                <ArgonButton color='secondary' variant='outlined' onClick={onUpdate}>Update</ArgonButton>
                <ArgonButton color='secondary' variant='outlined' onClick={onDelete}>Delete</ArgonButton>
            </ArgonBox>
	    	<ArgonBox id="myGrid" className="ag-theme-material" sx={{ height: 400 }}>
		        <AgGridReact 
		        	{...gridOptions}
		        /> 
	        </ArgonBox>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <ArgonBox sx={style}>
                    <ArgonTypography sx={{textAlign: 'center', pb: 1}}>Update Post</ArgonTypography>
                    <ArgonBox sx={{
                        '& > * + *': {
                            mt: 2,
                        }
                    }}>
                        <ArgonInput placeholder='Title' name='title' value={modalData.title} onChange={handleChangeModalData} />
                        <ArgonInput placeholder='Content' name='content' value={modalData.content} onChange={handleChangeModalData} />
                        <ArgonInput placeholder='Created At' name='created_at' value={modalData.created_at} onChange={handleChangeModalData} />
                        <ArgonInput placeholder='User Id' name='user_id' value={modalData.user_id} onChange={handleChangeModalData} />
                    </ArgonBox>
                    <ArgonButton 
                        sx={{mt: 2,width: '100%',}}
                        variant='contained'
                        color='secondary'
                        onClick={handleUpdate}
                    >
                        Update
                    </ArgonButton>
                </ArgonBox>
            </Modal>
        </>
    )
}
