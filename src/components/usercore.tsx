import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
} from '@mui/material';
import { getUsers, createUser, updateUser, deleteUser } from '../services/usercoreService';
import { UserCore } from '../types/types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function UserCorePage() {
  const [users, setUsers] = useState<UserCore[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserCore | null>(null);
  const [userData, setUserData] = useState<UserCore>({
    _id: '',
    title: '',
    name: '',
    bniId: '',
    gender: '',
    company: '',
    email: '',
    mobile: '',
    chapter: '',
    dob: '',
    doj: '',
    role : '',
    city: '',
    state: '',
    country: '',
    team: '',
    role1: '',
    responsibility1: '',
    role2: '',
    responsibility2: '',
  });

  useEffect(() => {
    fetchUsers();
  }, [page, rowsPerPage]);

  const fetchUsers = async () => {
    try {
      const response = await getUsers(page, rowsPerPage);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCreateOrUpdateUser = async () => {
    try {
      if (selectedUser) {
        await updateUser(selectedUser._id, userData);
      } else {
        await createUser(userData);
      }
      fetchUsers();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleDeleteUser = async (_id: string) => {
    try {
      await deleteUser(_id);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleOpenDialog = (user: UserCore | null = null) => {
    setSelectedUser(user);
    setUserData(
      user
        ? { ...user }
        : {
            _id: '',
            title: '',
            name: '',
            bniId: '',
            gender: '',
            company: '',
            email: '',
            mobile: '',
            chapter: '',
    role : '',

            dob: '',
            doj: '',
            city: '',
            state: '',
            country: '',
            team: '',
            role1: '',
            responsibility1: '',
            role2: '',
            responsibility2: '',
          }
    );
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    console.log(event);
    
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2} marginTop={5}>
        <h1>User Core</h1>
        <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
          Create New User
        </Button>
      </Box>

      {/* User Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>BNI ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Chapter</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Team</TableCell>
              <TableCell>Role 1</TableCell>
              <TableCell>Responsibility 1</TableCell>
              <TableCell>Role 2</TableCell>
              <TableCell>Responsibility 2</TableCell>
              <TableCell>Dob</TableCell>
              <TableCell>Doj</TableCell>
              <TableCell>City</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.title}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.bniId || 'N/A'}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.mobile}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.company}</TableCell>
                <TableCell>{user.chapter}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.team}</TableCell>
                <TableCell>{user.role1 || 'N/A'}</TableCell>
                <TableCell>{user.responsibility1 || 'N/A'}</TableCell>
                <TableCell>{user.role2 || 'N/A'}</TableCell>
                <TableCell>{user.responsibility2 || 'N/A'}</TableCell>
                <TableCell>{user.dob ? new Date(user.dob).toLocaleDateString() : 'N/A'}</TableCell>
                <TableCell>{user.doj ? new Date(user.doj).toLocaleDateString() : 'N/A'}</TableCell>
                <TableCell>{user.city}</TableCell>
                <TableCell>{user.state}</TableCell>
                <TableCell>{user.country}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog(user)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteUser(user._id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={100} // Replace this with the total count returned from API
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Create/Edit User Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{selectedUser ? 'Edit User' : 'Create New User'}</DialogTitle>
        <DialogContent>
          <Box display="flex" flexWrap="wrap" gap={2}>
            <FormControl fullWidth margin="dense">
              <InputLabel>Title</InputLabel>
              <Select
                value={userData.title}
                onChange={(e) => setUserData({ ...userData, title: e.target.value })}
                label="Title"
              >
                <MenuItem value="Mr">Mr</MenuItem>
                <MenuItem value="Mrs">Mrs</MenuItem>
                <MenuItem value="Ms">Ms</MenuItem>
                <MenuItem value="Dr">Dr</MenuItem>
                {/* Add more titles as needed */}
              </Select>
            </FormControl>

            <TextField
              margin="dense"
              label="Name"
              fullWidth
              required
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            />

            <TextField
              margin="dense"
              label="BNI ID"
              fullWidth
              value={userData.bniId}
              onChange={(e) => setUserData({ ...userData, bniId: e.target.value })}
            />

            <FormControl fullWidth margin="dense">
              <InputLabel>Gender</InputLabel>
              <Select
                value={userData.gender}
                onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
                label="Gender"
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>

            <TextField
              margin="dense"
              label="Company"
              fullWidth
              required
              value={userData.company}
              onChange={(e) => setUserData({ ...userData, company: e.target.value })}
            />

            <TextField
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              required
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />

            <TextField
              margin="dense"
              label="Mobile"
              fullWidth
              required
              value={userData.mobile}
              onChange={(e) => setUserData({ ...userData, mobile: e.target.value })}
            />

            <TextField
              margin="dense"
              label="Chapter"
              fullWidth
              required
              value={userData.chapter}
              onChange={(e) => setUserData({ ...userData, chapter: e.target.value })}
            />
             <TextField
              margin="dense"
              label="Role"
              fullWidth
              required
              value={userData.role}
              onChange={(e) => setUserData({ ...userData, role: e.target.value })}
            />

            <TextField
              margin="dense"
              label="City"
              fullWidth
              required
              value={userData.city}
              onChange={(e) => setUserData({ ...userData, city: e.target.value })}
            />

            <TextField
              margin="dense"
              label="State"
              fullWidth
              required
              value={userData.state}
              onChange={(e) => setUserData({ ...userData, state: e.target.value })}
            />

            <TextField
              margin="dense"
              label="Country"
              fullWidth
              required
              value={userData.country}
              onChange={(e) => setUserData({ ...userData, country: e.target.value })}
            />

            <TextField
              margin="dense"
              label="Team"
              fullWidth
              required
              value={userData.team}
              onChange={(e) => setUserData({ ...userData, team: e.target.value })}
            />

            <TextField
              margin="dense"
              label="Role 1"
              fullWidth
              value={userData.role1}
              onChange={(e) => setUserData({ ...userData, role1: e.target.value })}
            />

            <TextField
              margin="dense"
              label="Responsibility 1"
              fullWidth
              value={userData.responsibility1}
              onChange={(e) => setUserData({ ...userData, responsibility1: e.target.value })}
            />

            <TextField
              margin="dense"
              label="Role 2"
              fullWidth
              value={userData.role2}
              onChange={(e) => setUserData({ ...userData, role2: e.target.value })}
            />

            <TextField
              margin="dense"
              label="Responsibility 2"
              fullWidth
              value={userData.responsibility2}
              onChange={(e) => setUserData({ ...userData, responsibility2: e.target.value })}
            />

            <TextField
              margin="dense"
              label="Date of Birth"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={userData.dob ? userData.dob.split('T')[0] : ''}
              onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
            />

            <TextField
              margin="dense"
              label="Date of Joining"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={userData.doj ? userData.doj.split('T')[0] : ''}
              onChange={(e) => setUserData({ ...userData, doj: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCreateOrUpdateUser} color="primary">
            {selectedUser ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default UserCorePage;
