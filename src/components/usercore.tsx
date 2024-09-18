// src/components/UserCore.tsx
import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import { getAllUserCore, updateUserCore, deleteUserCore, deleteAllUserCore, uploadBulkUserCore } from '../services/usercoreService';
import * as XLSX from 'xlsx';

interface UserCore {
  _id: string;
  name: string;
  title: string;
  email: string;
  company: string;
  chapter: string;
}

const UserCore: React.FC = () => {
  const [userCores, setUserCores] = useState<UserCore[]>([]);
  const [editingUserCore, setEditingUserCore] = useState<UserCore | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  // Fetch UserCore records on component mount
  useEffect(() => {
    const fetchUserCores = async () => {
      const data = await getAllUserCore();
      setUserCores(data);
    };
    fetchUserCores();
  }, []);

  // Handle bulk Excel file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);
        // Send parsed Excel data to API
        uploadBulkUserCore(parsedData);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // Pagination logic
  const pageCount = Math.ceil(userCores.length / itemsPerPage);
  const paginatedUserCores = userCores.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDeleteUser = async (id: string) => {
    await deleteUserCore(id);
    setUserCores(userCores.filter((user) => user._id !== id));
  };

  const handleDeleteAll = async () => {
    await deleteAllUserCore();
    setUserCores([]);
  };

  const handleEditUser = async (id: string) => {
    if (editingUserCore) {
      await updateUserCore(id, editingUserCore);
      setUserCores(
        userCores.map((user) => (user._id === id ? editingUserCore : user))
      );
      setEditingUserCore(null);
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        UserCore Management
      </Typography>

      {/* Upload Bulk Data */}
      <Card sx={{ marginBottom: 2 }}>
        <CardContent>
          <Typography variant="h5">Upload Bulk Data</Typography>
          <Button variant="contained" component="label">
            Upload Excel File
            <input type="file" hidden onChange={handleFileUpload} />
          </Button>
        </CardContent>
      </Card>

      {/* UserCore Table */}
      <Typography variant="h5" gutterBottom>
        User List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Chapter</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUserCores.map((user) => (
              <TableRow key={user._id}>
                {editingUserCore?._id === user._id ? (
                  <>
                    <TableCell>
                      <TextField
                        value={editingUserCore.title}
                        onChange={(e) =>
                          setEditingUserCore({ ...editingUserCore, title: e.target.value })
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={editingUserCore.name}
                        onChange={(e) =>
                          setEditingUserCore({ ...editingUserCore, name: e.target.value })
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={editingUserCore.email}
                        onChange={(e) =>
                          setEditingUserCore({ ...editingUserCore, email: e.target.value })
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={editingUserCore.company}
                        onChange={(e) =>
                          setEditingUserCore({ ...editingUserCore, company: e.target.value })
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={editingUserCore.chapter}
                        onChange={(e) =>
                          setEditingUserCore({ ...editingUserCore, chapter: e.target.value })
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleEditUser(user._id)} color="primary">
                        Save
                      </Button>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{user.title}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.company}</TableCell>
                    <TableCell>{user.chapter}</TableCell>
                    <TableCell>
                      <Button onClick={() => setEditingUserCore(user)} color="primary">
                        Edit
                      </Button>
                      <Button onClick={() => handleDeleteUser(user._id)} color="secondary">
                        Delete
                      </Button>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      {/* Delete All Button */}
      {userCores.length > 0 && (
        <Button variant="contained" color="error" onClick={handleDeleteAll}>
          Delete All Users
        </Button>
      )}
    </Box>
  );
};

export default UserCore;
