// src/components/Chapter.tsx
import React, { useState, useEffect } from 'react';
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
import { getAllChapters, createChapter, updateChapter, deleteChapter, deleteAllChapters } from '../services/chapterServices';

interface Chapter {
  id: string;
  chapter: string;
  meetingDay: string;
}

const ChapterPage: React.FC = () => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [newChapter, setNewChapter] = useState({ chapter: '', meetingDay: '' });
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3; // Display 3 chapters per page

  // Fetch chapters from API
  useEffect(() => {
    const fetchChapters = async () => {
      setLoading(true);
      try {
        const data = await getAllChapters();
        setChapters(data);
      } catch (err) {
        setError('Failed to fetch chapters');
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, []);

  // Pagination logic
  const pageCount = Math.ceil(chapters.length / itemsPerPage);
  const paginatedChapters = chapters.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleCreateChapter = async () => {
    try {
      const createdChapter = await createChapter(newChapter);
      setChapters([...chapters, createdChapter]);
      setNewChapter({ chapter: '', meetingDay: '' });
    } catch (err) {
      setError('Failed to create chapter');
    }
  };

  const handleDeleteChapter = async (id: string) => {
    try {
      await deleteChapter(id);
      setChapters(chapters.filter((chapter) => chapter.id !== id));
    } catch (err) {
      setError('Failed to delete chapter');
    }
  };

  const handleEditChapter = async (id: string) => {
    if (editingChapter) {
      try {
        const updated = await updateChapter(id, editingChapter);
        setChapters(chapters.map((ch) => (ch.id === id ? updated : ch)));
        setEditingChapter(null);
      } catch (err) {
        setError('Failed to edit chapter');
      }
    }
  };

  const handleDeleteAll = async () => {
    try {
      await deleteAllChapters();
      setChapters([]);
    } catch (err) {
      setError('Failed to delete all chapters');
    }
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Chapter Management
      </Typography>

      {/* Create a New Chapter */}
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

      {/* Chapter List */}
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

export default ChapterPage;
