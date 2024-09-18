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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { getChapters, createChapter, updateChapter, deleteChapter } from '../services/chapterServices';
import { Chapter, MeetingDay } from '../types/types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function ChapterPage() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [chapterData, setChapterData] = useState({ chapter: '', meetingDay: '' as MeetingDay });

  useEffect(() => {
    fetchChapters();
  }, [page, rowsPerPage]);

  const fetchChapters = async () => {
    try {
      const response = await getChapters(page, rowsPerPage);
      setChapters(response.data);
    } catch (error) {
      console.error('Error fetching chapters:', error);
    }
  };

  const handleCreateOrUpdateChapter = async () => {
    try {
      if (selectedChapter) {
        await updateChapter(selectedChapter._id, chapterData);
      } else {
        await createChapter(chapterData);
      }
      fetchChapters();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving chapter:', error);
    }
  };

  const handleDeleteChapter = async (_id: string) => {
    try {
      await deleteChapter(_id);
      fetchChapters();
    } catch (error) {
      console.error('Error deleting chapter:', error);
    }
  };

  const handleOpenDialog = (chapter: Chapter | null = null) => {
    setSelectedChapter(chapter);
    setChapterData(chapter ? { chapter: chapter.chapter, meetingDay: chapter.meetingDay } : { chapter: '', meetingDay: '' as MeetingDay });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedChapter(null);
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
    <Container > 
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2} marginTop={5}>
        <h1 >Chapters</h1>
        <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
          Create New Chapter
        </Button>
      </Box>

      {/* Chapter Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Chapter Name</TableCell>
              <TableCell>Meeting Day</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chapters.map((chapter) => (
              <TableRow key={chapter._id}>
                <TableCell>{chapter.chapter}</TableCell>
                <TableCell>{chapter.meetingDay}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog(chapter)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteChapter(chapter._id)} color="secondary">
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

      {/* Create/Edit Chapter Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{selectedChapter ? 'Edit Chapter' : 'Create New Chapter'}</DialogTitle>
        <DialogContent>
          {/* Chapter Name Input */}
          <TextField
            margin="dense"
            label="Chapter Name"
            fullWidth
            value={chapterData.chapter}
            onChange={(e) => setChapterData({ ...chapterData, chapter: e.target.value })}
          />

          {/* Meeting Day Dropdown */}
          <FormControl fullWidth margin="dense">
            <InputLabel>Meeting Day</InputLabel>
            <Select
              value={chapterData.meetingDay}
              onChange={(e) => setChapterData({ ...chapterData, meetingDay: e.target.value as MeetingDay })}
              label="Meeting Day"
            >
              {Object.values(MeetingDay).map((day) => (
                <MenuItem key={day} value={day}>
                  {day}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCreateOrUpdateChapter} color="primary">
            {selectedChapter ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ChapterPage;
