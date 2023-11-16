import React, { useMemo, useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import Modal from 'react-modal';

const Patient = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const data = useMemo(
    () => [
      {
        id: 1,
        name: 'John Doe',
        mobileNumber: '123-456-7890',
        admittedDate: '2023-01-15',
        status: 'Admitted',
        admitDates: ['2023-01-15' ], 
        dischargeDates: ['2023-01-20'],
      },
      {
        id: 2,
        name: 'Jane Smith',
        mobileNumber: '987-654-3210',
        admittedDate: '2023-02-20',
        status: 'Discharged',
        admitDates: ['2023-02-20'],
        dischargeDates: ['2023-02-25'],
      },
      {
        id: 3,
        name: 'Alice Johnson',
        mobileNumber: '555-123-4567',
        admittedDate: '2023-03-10',
        status: 'Regular Checkup',
        admitDates: [],
        dischargeDates: [],
      },
      // Add more data as needed
    ],
    []
  );

  const columns = useMemo(
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
        Header: 'Status',
        accessor: 'status',
        Cell: ({ row }) => (
          <span
            style={{
              color: row.original.status === 'Admitted' ? 'green' : 'red',
              fontWeight: 'bold',
            }}
          >
            {row.original.status}
          </span>
        ),
      },
      {
        Header: 'Admit',
        accessor: 'admit',
        Cell: ({ row }) => (
          <button onClick={() => handleAdmit(row.original)}>Admit</button>
        ),
      },
      {
        Header: 'Show Details',
        accessor: 'showDetails',
        Cell: ({ row }) => (
          <button onClick={() => handleShowDetails(row.original)}>Show Details</button>
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

  const handleShowDetails = (patient) => {
    setSelectedPatient(patient);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPatient(null);
  };

  const handleAdmit = (patient) => {
    // Implement logic to handle the admit action for the given patient
    console.log(`Admit patient ${patient.name}`);
  };

  return (
    <div className="main-container">
      <style>
        {`
          .table {
            border-collapse: collapse;
            width: 100%;
          }

          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }

          th {
            background-color: #f2f2f2;
          }

          .admitted-row {
            background-color: lightgreen;
          }

          .regular-checkup-row {
            background-color: lightblue;
          }

          .patient-details-modal {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: black; /* Set background color to black */
            color: white; /* Set text color to white */
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
          }
        `}
      </style>
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
              <tr
                {...row.getRowProps()}
                className={
                  row.original.status === 'Admitted'
                    ? 'admitted-row'
                    : row.original.status === 'Regular Checkup'
                    ? 'regular-checkup-row'
                    : ''
                }
              >
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Patient Details Modal */}
      {selectedPatient && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="patient-details-modal"
          contentLabel="Patient Details"
        >
          <h2>Patient Details</h2>
          <p><strong>ID:</strong> {selectedPatient.id}</p>
          <p><strong>Name:</strong> {selectedPatient.name}</p>
          <p><strong>Mobile Number:</strong> {selectedPatient.mobileNumber}</p>
          <p><strong>Admitted Date:</strong> {selectedPatient.admittedDate}</p>
          <p><strong>Status:</strong> {selectedPatient.status}</p>
          <p><strong>Admit Dates:</strong> {selectedPatient.admitDates.join(', ')}</p>
          <p><strong>Discharge Dates:</strong> {selectedPatient.dischargeDates.join(', ')}</p>
          <button onClick={closeModal}>Close</button>
        </Modal>
      )}
    </div>
  );
};

export default Patient;
