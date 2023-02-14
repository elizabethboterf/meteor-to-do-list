import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';

export const FormInputText = ({ text, setText }) => {
    return (
        <TextField fullWidth id="task-text" label="Task" variant="outlined" value={text} onChange={(e) => setText(e.target.value)} />
    )
}