import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import TrashIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import IconButton from '@material-ui/core/IconButton';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: scroll;
  margin-top: 1.5rem;
`;

const COLUMNS = [
  { title: 'MAC Address', field: 'macId', isEditable: false },
  { title: 'Name', field: 'deviceName', isEditable: true },
  { title: 'Room', field: 'room', isEditable: true },
  { title: 'Location', field: 'location', isEditable: false },
];

const DevicesTable = props => {
  const {
    tableData,
    editIdx,
    handleChange,
    onDeviceSave,
    startEditing,
    handleRemoveConfirmation,
  } = props;
  return (
    <Container>
      <Table size="small">
        <TableHead>
          <TableRow>
            {COLUMNS.map(eachColumn => (
              <TableCell key={eachColumn.field}>{eachColumn.title}</TableCell>
            ))}
            <TableCell />
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData &&
            tableData.map((eachRow, rowIndex) => (
              <TableRow key={rowIndex}>
                {COLUMNS.map((eachColumn, index) => {
                  const { field, isEditable } = eachColumn;
                  return (
                    <TableCell key={field}>
                      {editIdx === rowIndex && isEditable ? (
                        <TextField
                          name={index.toString()}
                          onChange={e => handleChange(e, field, rowIndex)}
                          value={eachRow[field]}
                        />
                      ) : (
                        eachRow[field]
                      )}
                    </TableCell>
                  );
                })}
                <TableCell align="right">
                  {editIdx === rowIndex ? (
                    <IconButton
                      onClick={() => onDeviceSave(rowIndex)}
                      aria-label="Select"
                    >
                      <CheckIcon />{' '}
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() => startEditing(rowIndex)}
                      aria-label="Edit"
                    >
                      <EditIcon />{' '}
                    </IconButton>
                  )}
                  <IconButton
                    onClick={() => handleRemoveConfirmation(rowIndex)}
                    aria-label="Delete"
                  >
                    <TrashIcon />{' '}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Container>
  );
};

DevicesTable.propTypes = {
  tableData: PropTypes.array,
  startEditing: PropTypes.func,
  onDeviceSave: PropTypes.func,
  handleChange: PropTypes.func,
  handleRemove: PropTypes.func,
  handleRemoveConfirmation: PropTypes.func,
  editIdx: PropTypes.number,
};

export default DevicesTable;
