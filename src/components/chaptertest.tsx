import React, { useState } from 'react';
import {
  TextField,
  Button,
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

interface Chapter {
  id: string;
  chapter: string;
  meetingDay: string;
}

// Dummy data
const initialChapters: Chapter[] = [
  { id: '1', chapter: 'Chapter 1', meetingDay: 'Monday' },
  { id: '2', chapter: 'Chapter 2', meetingDay: 'Tuesday' },
  { id: '3', chapter: 'Chapter 3', meetingDay: 'Wednesday' },
  { id: '4', chapter: 'Chapter 4', meetingDay: 'Thursday' },
  { id: '5', chapter: 'Chapter 5', meetingDay: 'Friday' },
  { id: '6', chapter: 'Chapter 6', meetingDay: 'Saturday' },
  { id: '7', chapter: 'Chapter 7', meetingDay: 'Sunday' },
  // Add more if needed
];

const ChapterTest: React.FC = () => {
  const [chapters, setChapters] = useState<Chapter[]>(initialChapters);
  const [newChapter, setNewChapter] = useState({ chapter: '', meetingDay: '' });
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3; // Display 3 chapters per page

  // Pagination logic
  const pageCount = Math.ceil(chapters.length / itemsPerPage);
  const paginatedChapters = chapters.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleCreateChapter = () => {
    if (newChapter.chapter && newChapter.meetingDay) {
      const newId = (chapters.length + 1).toString();
      const createdChapter: Chapter = { id: newId, ...newChapter };
      setChapters([...chapters, createdChapter]);
      setNewChapter({ chapter: '', meetingDay: '' });
    }
  };

  const handleDeleteChapter = (id: string) => {
    setChapters(chapters.filter((chapter) => chapter.id !== id));
  };

  const handleEditChapter = (id: string) => {
    if (editingChapter) {
      const updatedChapters = chapters.map((ch) =>
        ch.id === id ? editingChapter : ch
      );
      setChapters(updatedChapters);
      setEditingChapter(null);
    }
  };

  const handleDeleteAll = () => {
    setChapters([]);
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Chapter Management
      </Typography>

      {/* Create a new chapter */}
      <Card sx={{ marginBottom: 2 }}>
        <CardContent>
          <Typography variant="h5">Create Chapter</Typography>
          <TextField
            label="Chapter Name"
            value={newChapter.chapter}
            onChange={(e) => setNewChapter({ ...newChapter, chapter: e.target.value })}
            sx={{ marginRight: 2 }}
          />
          <TextField
            label="Meeting Day"
            value={newChapter.meetingDay}
            onChange={(e) => setNewChapter({ ...newChapter, meetingDay: e.target.value })}
            sx={{ marginRight: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleCreateChapter}>
            Create Chapter
          </Button>
        </CardContent>
      </Card>

      {/* Chapter list */}
      <Typography variant="h5" gutterBottom>
        Chapter List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Chapter Name</TableCell>
              <TableCell>Meeting Day</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedChapters.map((chapter) => (
              <TableRow key={chapter.id}>
                {editingChapter?.id === chapter.id ? (
                  <>
                    <TableCell>
                      <TextField
                        value={editingChapter.chapter}
                        onChange={(e) =>
                          setEditingChapter({ ...editingChapter, chapter: e.target.value })
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={editingChapter.meetingDay}
                        onChange={(e) =>
                          setEditingChapter({ ...editingChapter, meetingDay: e.target.value })
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleEditChapter(chapter.id)} color="primary">
                        Save
                      </Button>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{chapter.chapter}</TableCell>
                    <TableCell>{chapter.meetingDay}</TableCell>
                    <TableCell>
                      <Button onClick={() => setEditingChapter(chapter)} color="primary">
                        Edit
                      </Button>
                      <Button onClick={() => handleDeleteChapter(chapter.id)} color="secondary">
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
      {chapters.length > 0 && (
        <Button variant="contained" color="error" onClick={handleDeleteAll}>
          Delete All Chapters
        </Button>
      )}
    </Box>
  );
};

export default ChapterTest;
