import React from 'react';
import { useTable, useSortBy } from 'react-table';
import './Usertable.css';
import { useNavigate } from 'react-router-dom'; // Assuming you are using React Router for navigation

const UserTable = () => {
  const navigate = useNavigate();
  const data = React.useMemo(
    () => [
      {
        id: 1,
        name: 'John Doe',
        mobileNumber: '123-456-7890',
        admittedDate: '2023-01-15',
        temperature: '98.6°F',
        heartRate: '72 bpm',
      },
      {
        id: 2,
        name: 'Jane Smith',
        mobileNumber: '987-654-3210',
        admittedDate: '2023-02-20',
        temperature: '99.2°F',
        heartRate: '85 bpm',
      },
      // Add more data as needed
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Mobile Number',
        accessor: 'mobileNumber',
      },
      {
        Header: 'Admitted Date',
        accessor: 'admittedDate',
      },
      {
        Header: 'Temperature',
        accessor: 'temperature',
        Cell: ({ row }) => (
          <button onClick={() => handleTemperature(row.original)}>Check</button>
        ),
      },
      {
        Header: 'Heart Rate',
        accessor: 'heartRate',
        Cell: ({ row }) => (
          <button onClick={() => handleHeartRate(row.original)}>Check</button>
        ),
      },
      {
        Header: 'Edit Button',
        accessor: 'editButton',
        disableSortBy: true,
        Cell: ({ row }) => (
          <button onClick={() => handleEdit(row.original)}>Edit</button>
        ),
      },
      // New "Bill" button column
      {
        Header: 'Bill',
        accessor: 'billButton',
        disableSortBy: true,
        Cell: ({ row }) => (
          <button onClick={() => handleBill(row.original)}>Bill</button>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  const handleTemperature = (userData) => {
    console.log('Temperature for user:', userData);
    navigate(`/temperature?name=${userData.name}`);
  };

  const handleHeartRate = (userData) => {
    console.log('Heart Rate for user:', userData);
    navigate(`/heartrate?name=${userData.name}`);
  };

  const handleEdit = (userData) => {
    console.log('Edit user:', userData);
  };

  const handleBill = (userData) => {
    console.log('Generate Bill for user:', userData);
    navigate(`/bill?name=${userData.name}`);
    // Implement your bill functionality here, e.g., open a modal with billing data.
  };

  return (
    <div className="main-container">
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
