import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import KeyboardCard from "./components/KeyboardCard";

import keyboardService from "./services/keyboard";
import KeyboardForm from "./components/KeyboardForm";
import { Typography } from "@mui/material";

import useStyles from "./components/style";

export default function App() {
  const classes = useStyles();
  const [keyboards, setKeyboards] = useState([]);

  const hook = () => {
    keyboardService.getAll().then((response) => {
      setKeyboards(response);
    });
  };
  useEffect(hook, []);

  const deleteHandler = (id) => {
    return async () => {
      await keyboardService.deleteKeyboard(id);
      const keyboardResp = await keyboardService.getAll();
      setKeyboards(keyboardResp);
    };
  };

  const postHandler = async (newKeyboard) => {
    await keyboardService.postNewKeyboard(newKeyboard);
    const keyboardResp = await keyboardService.getAll();
    setKeyboards(keyboardResp);
  };

  return (
    <>

    <Container maxWidth="sm">
    <Typography variant="h3" style={classes.header}>Keyboard List</Typography>
      <Box sx={{ my: 4 }}>
        {keyboards.map((keyboard) => {
          return (
            <KeyboardCard
              key={keyboard.id}
              keyboard={keyboard}
              handleDelete={deleteHandler(keyboard.id)}
            />
          );
        })}
        <KeyboardForm handlePost={postHandler} />
      </Box>
    </Container>
    </>

  );
}
