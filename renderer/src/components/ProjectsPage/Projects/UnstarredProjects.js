import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {
  IconButton, Box, Paper, Grid,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import moment from 'moment';
import { ProjectStyles, useToolbarStyles } from '../useStyles/ProjectStyles';
import { getComparator, stableSort } from './SortingHelper';
import { AutographaContext } from '../../AutogrpahaContext/AutographaContext';

const headCells = [
  {
    id: 'name', numeric: false, disablePadding: true, label: 'Project Name',
  },
  {
    id: 'language', numeric: false, disablePadding: true, label: 'Language',
  },
  {
    id: 'date', numeric: true, disablePadding: false, label: 'Date',
  },
  {
    id: 'view', numeric: true, disablePadding: false, label: 'Last Viewed',
  },
];

function EnhancedTableHead(props) {
  const {
    classes, order, orderBy, onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" />
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              id="sorthead"
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <Box fontWeight={600} m={1}>
                {headCell.label}
              </Box>
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const EnhancedTableToolbar = ({ title }) => {
  const classes = useToolbarStyles();

  return (
    <Typography
      className={classes.title}
      variant="h6"
      id="tableTitle"
      component="div"
    >
      <Box fontWeight={600} m={1}>
        {title}
      </Box>
    </Typography>
  );
};

EnhancedTableToolbar.propTypes = {
  title: PropTypes.string.isRequired,
};

const UnstarredProjects = () => {
  const classes = ProjectStyles();
  const [actionsUnStarred, setActionsUnStarred] = React.useState(false);
  const [hoverIndexUnStarred, sethoverIndexUnStarred] = React.useState('');
  const {
    states: {
      unstarredrow,
      orderUnstarred,
      orderByUnstarred,
    }, action: {
      handleClickStarred,
      handleDelete,
      handleRequestSortUnstarred,
    },
  } = React.useContext(AutographaContext);

  const mouseEnterUnStarred = (index) => {
    setActionsUnStarred(true);
    sethoverIndexUnStarred(index);
  };

  const mouseLeaveUnStarred = () => {
    setActionsUnStarred(false);
  };

  return (
    <>
      <Paper>
        <Grid container spacing={2}>
          <Grid item xs={2} />
          <div className={classes.root} data-test="component-profile">
            <Grid item xs={10} />
            {unstarredrow && (
            <div>
              <EnhancedTableToolbar title="Everythings else" />
              <TableContainer className={classes.container}>
                <Table
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  aria-label="enhanced table"
                  stickyHeader
                >
                  <EnhancedTableHead
                    classes={classes}
                    order={orderUnstarred}
                    orderBy={orderByUnstarred}
                    onRequestSort={handleRequestSortUnstarred}
                    rowCount={unstarredrow.length}
                  />
                  <TableBody id="unstarredrow">
                    {stableSort(unstarredrow,
                      getComparator(orderUnstarred, orderByUnstarred),
                      orderByUnstarred,
                      orderUnstarred).map((row, index) => (
                        <TableRow
                          hover
                          onMouseEnter={() => mouseEnterUnStarred(index)}
                          onMouseLeave={mouseLeaveUnStarred}
                          tabIndex={-1}
                          key={row.name}
                        >
                          <TableCell padding="checkbox">
                            <IconButton
                              color="inherit"
                              id="unstarredicon"
                              onClick={(event) => handleClickStarred(event, row.name, 'unstarred')}
                            >
                              <StarBorderIcon />
                            </IconButton>
                          </TableCell>
                          <TableCell
                            id="unstarredrow-name"
                            component="th"
                            scope="row"
                            padding="none"
                          >
                            {row.name}
                          </TableCell>
                          <TableCell
                            id="unstarredrow-language"
                            component="th"
                            scope="row"
                            padding="none"
                          >
                            {row.language}
                          </TableCell>
                          <TableCell id="unstarredrow-date" align="right">
                            {row.date}
                          </TableCell>
                          <TableCell id="unstarredrow-time" align="right">
                            {moment(row.view, 'YYYY-MM-DD h:mm:ss').fromNow()}
                          </TableCell>
                          {actionsUnStarred && hoverIndexUnStarred === index ? (
                            <TableCell align="left">
                              <IconButton className={classes.iconbutton}>
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                className={classes.iconbutton}
                                onClick={(event) => handleDelete(event, row.name, 'unstarred')}
                              >
                                <DeleteIcon />
                              </IconButton>
                              <IconButton className={classes.iconbutton}>
                                <InfoIcon />
                              </IconButton>
                            </TableCell>
                          ) : (
                            <TableCell align="left">
                              <IconButton />
                              <IconButton />
                              <IconButton />
                            </TableCell>
                          )}
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            )}
          </div>
        </Grid>
      </Paper>
    </>
  );
};

export default UnstarredProjects;
