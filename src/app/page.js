'use client'
import { useState } from "react";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";

export default function Home() {
  const [query, setQuery] = useState("");
  const [responses, setResponses] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: query }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponses([...responses, { query, response: data.output }]);
      } else {
        setResponses([...responses, { query, response: data.error }]);
      }
    } catch (error) {
      console.error("Error submitting query:", error);
      setResponses([...responses, { query, response: "Error submitting query" }]);
    }

    setQuery("");
  };

  return (
    <Box 
      sx={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center", 
        width: "100%", 
        padding: "2rem", 
        boxSizing: "border-box"
      }}>
      <Typography 
        variant="h3" 
        component="h1" 
        gutterBottom 
        color="primary" 
        sx={{ fontWeight: "bold" }}>
        ChatBot
      </Typography>
      <Paper 
        elevation={3} 
        sx={{ 
          padding: "1rem", 
          width: "100%", 
          maxWidth: "600px", 
          backgroundColor: "rgba(255, 255, 255, 0.8)", 
          marginBottom: "20px"
        }}>
        {responses.map((res, index) => (
          <Box key={index} sx={{ marginBottom: "10px" }}>
            <Typography variant="body1" component="p" sx={{ fontWeight: "bold" }}>
              You:
            </Typography>
            <TextField
              fullWidth
              multiline
              value={res.response}
              readOnly
              variant="outlined"
              sx={{ marginTop: "0.5rem" }}
            />
          </Box>
        ))}
      </Paper>
      <Box 
        component="form" 
        onSubmit={handleSubmit} 
        sx={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          width: "100%", 
          maxWidth: "600px" 
        }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Ask something..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ marginRight: "10px" }}
        />
        <Button 
          variant="contained" 
          color="primary" 
          type="submit">
          Send
        </Button>
      </Box>
    </Box>
  );
}
