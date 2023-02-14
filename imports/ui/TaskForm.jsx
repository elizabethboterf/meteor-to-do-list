import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { FormInputText } from './FormInputTextComponent';

export const TaskForm = ()=>{
    const [text, setText] = useState("");

    const handleClick = async () => {
        const user = await Meteor.user();

        Meteor.call("user.addTask", user._id, text, (err,res) => {
            if(!err){
                setText("")
                return res
            }
            else {
                console.log(err)
            }
        })
    }

    return(
        <Grid container spacing={1}>
            <Grid item xs={10}>
                <FormInputText text={text} setText={setText} />
            </Grid>

            <Grid item xs={2}>
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleClick}>
                    Add Task
                </Button>
            </Grid>
            
        </Grid>
    );
};