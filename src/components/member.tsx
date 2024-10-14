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
  IconButton,
  Typography,
  Grid,
  CircularProgress,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  useMediaQuery,
  Alert,
  SelectChangeEvent,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getMembers, createMember, updateMember, deleteMember } from '../services/memberService';
import { Member, GetMemberResponse } from '../types/types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';


function MemberPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [totalMembers, setTotalMembers] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [memberToDelete, setMemberToDelete] = useState<Member | null>(null);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [memberData, setMemberData] = useState<Member>({
    _id: '',
    title: '',
    name: '',
    bniId: '',
    gender: '',
    companyName: '',
    email: '',
    mobile: '',
    chapter: '',
    dob: '',
    doj: '',
    role: '',
    city: '',
    state: '',
    country: '',
    team: '',
    role1: '',
    responsibility1: '',
    role2: '',
    responsibility2: '',
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchMembers();
  }, [page, rowsPerPage, searchQuery]);

  const fetchMembers = async (): Promise<void> => {
    setLoading(true);
    try {
      const response: GetMemberResponse = await getMembers(page, rowsPerPage, searchQuery);
      setMembers(response.data || []);
      setTotalMembers(response.pagination.totalMembers);
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdateMember = async (): Promise<void> => {
    try {
      setErrorMessage(null);
      if (selectedMember) {
        await updateMember(selectedMember._id, memberData);
      } else {
        await createMember(memberData);
      }
      fetchMembers();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving member:', error);
      setErrorMessage( 'Failed to save member. Please try again.');
    }
  };

  const handleDeleteMember = async (): Promise<void> => {
    if (!memberToDelete) return;
    try {
      await deleteMember(memberToDelete._id);
      fetchMembers();
      handleCloseDeleteDialog();
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  const handleOpenDeleteDialog = (member: Member): void => {
    setMemberToDelete(member);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = (): void => {
    setOpenDeleteDialog(false);
    setMemberToDelete(null);
  };


  const handleOpenDialog = (member: Member | null = null): void => {
    setSelectedMember(member);
    setMemberData(
      member
        ? {
            ...member,
            // Use moment to format dates as YYYY-MM-DD
            dob: member.dob ? moment(member.dob).format('YYYY-MM-DD') : '',
            doj: member.doj ? moment(member.doj).format('YYYY-MM-DD') : '',
          }
        : {
            _id: '',
            title: '',
            name: '',
            bniId: '',
            gender: '',
            companyName: '',
            email: '',
            mobile: '',
            chapter: '',
            dob: '',
            doj: '',
            role: '',
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
    setErrorMessage(null);
  };
  

  
  
  
  

  const handleCloseDialog = (): void => {
    setOpenDialog(false);
    setSelectedMember(null);
  };

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ): void => {
    const { name, value } = event.target;
    setMemberData({
      ...memberData,
      [name as string]: value,
    });
  };
  

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  return (
    <Container>
      <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} justifyContent="space-between" alignItems="center" sx={{ mb: 2, mt: 5, gap: 2 }}>
        <Typography variant="h4" sx={{ fontSize: isMobile ? '1.5rem' : '2rem' }}>Member Management</Typography>
        <Box display="flex" gap={2} flexDirection={isMobile ? 'column' : 'row'} width={isMobile ? '100%' : 'auto'}>
          <TextField
            label="Search by Name or Mobile"
            value={searchQuery}
            onChange={handleSearchChange}
            variant="outlined"
            fullWidth={isMobile}
            size={isMobile ? 'small' : 'medium'}
          />
       
        </Box>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper elevation={3}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {['Name', 'Email', 'Mobile', 'Role', 'Chapter', 'Company Name', 'Actions'].map((header) => (
                    <TableCell key={header} align="center">
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member._id}>
                    <TableCell align="center">{member.name}</TableCell>
                    <TableCell align="center">{member.email}</TableCell>
                    <TableCell align="center">{member.mobile}</TableCell>
                    <TableCell align="center">{member.role}</TableCell>
                    <TableCell align="center">{member.chapter}</TableCell>
                    <TableCell align="center">{member.companyName}</TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleOpenDialog(member)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleOpenDeleteDialog(member)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={totalMembers}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{selectedMember ? 'Edit Member' : 'Create New Member'}</DialogTitle>
        <DialogContent>
          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Title</InputLabel>
                <Select name="title" value={memberData.title} onChange={handleInputChange} label="Title">
                  <MenuItem value="Mr">Mr</MenuItem>
                  <MenuItem value="Mrs">Mrs</MenuItem>
                  <MenuItem value="Miss">Miss</MenuItem>
                  <MenuItem value="Dr">Dr</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="name" label="Name" value={memberData.name} onChange={handleInputChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="bniId" label="BNI ID" value={memberData.bniId} onChange={handleInputChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select name="gender" value={memberData.gender} onChange={handleInputChange} label="Gender">
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="companyName" label="Company" value={memberData.companyName} onChange={handleInputChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="email" label="Email" value={memberData.email} onChange={handleInputChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="mobile" label="Mobile" value={memberData.mobile} onChange={handleInputChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="chapter" label="Chapter" value={memberData.chapter} onChange={handleInputChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="dob" label="Date of Birth" type="date" value={memberData.dob} onChange={handleInputChange} fullWidth InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="doj" label="Date of Joining" type="date" value={memberData.doj} onChange={handleInputChange} fullWidth InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="city" label="City" value={memberData.city} onChange={handleInputChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="state" label="State" value={memberData.state} onChange={handleInputChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="country" label="Country" value={memberData.country} onChange={handleInputChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="team" label="Team" value={memberData.team} onChange={handleInputChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="role1" label="Role 1" value={memberData.role1} onChange={handleInputChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="responsibility1" label="Responsibility 1" value={memberData.responsibility1} onChange={handleInputChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="role2" label="Role 2" value={memberData.role2} onChange={handleInputChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="responsibility2" label="Responsibility 2" value={memberData.responsibility2} onChange={handleInputChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select name="role" value={memberData.role} onChange={handleInputChange} label="Role">
                  <MenuItem value="SUPER_ADMIN">Super Admin</MenuItem>
                  <MenuItem value="ADMIN">Admin</MenuItem>
                  <MenuItem value="SECRETARY">Secretary</MenuItem>
                  <MenuItem value="SA_COORDINATOR">SA Coordinator</MenuItem>
                  <MenuItem value="SA_VISITORS">SA Visitors</MenuItem>
                  <MenuItem value="USER">User</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCreateOrUpdateMember} variant="contained" color="primary">
            {selectedMember ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete member <strong>{memberToDelete?.name}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDeleteMember} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default MemberPage;
