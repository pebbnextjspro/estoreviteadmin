import React from 'react'

function TableComponent({records , handleSortString , handleDelete ,handleUpdate,
     handleChangeDeleteMulti , ids ,checkref, handleChangeAllDelete}) {
  return (
    <>
     <table className='table table-responsive table-dark table-bordered'>
        <thead>
            <tr>
                <th><input type="checkbox" onChange={handleChangeAllDelete} ref={checkref} /></th>
                <th>Sr#</th>
                <th>UserID</th>
                <th onClick={() => handleSortString('UserName')}>UserName</th>
                <th>UserPassword</th>
                <th>Status</th>
                <th>UserImages</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
           {
            records.length !== 0 && records.map((data , index) => (
                 <tr>
                <td><input type="checkbox" value={data.UserId}
                 checked={ids.includes(data.UserId)} 
                  onChange={handleChangeDeleteMulti} /></td>
                <td>{index+1}</td>
                <td>{data.UserId}</td>
                <td>{data.UserName}</td>
                <td>{data.UserPassword}</td>
                <td>{data.UserPassword}</td>
                <td>{data.UserImages}</td>
                <td>
                    <div className='d-flex align-items-center justify-content-center gap-2'>
                        <button onClick={() => handleUpdate(data.UserId, data.UserName, data.UserPassword,data.UserImages)}
                         className='btn btn-info'>Edit</button>
                    <button className='btn btn-success'>View</button>
                    <button onClick={() => {
                        if (window.confirm('Are you Sure')) {

                            handleDelete(data.UserId)
                        } 
                    }}
                     className='btn btn-danger'>Delete</button>
                    </div>
                </td>
            </tr>
            ))
           }
        </tbody>
    </table>
    </>
  )
}

export default TableComponent