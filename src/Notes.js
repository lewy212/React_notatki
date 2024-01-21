import React, {Component} from 'react';
import {Button, Table} from 'react-bootstrap'
import Note from "./Note";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';
import NoteClass from "./class/NoteClass";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import AddNote from "./AddNote";
import EditForm from "./forms/EditForm";
import DeleteForm from "./forms/DeleteForm";
import DetailForm from "./forms/DetailForm";
import ChangeNoteStatusForm from "./forms/ChangeNoteStatusForm";
import RemindForm from "./forms/RemindForm";
class Notes extends Component{
    constructor(props) {
        super(props);
        this.state = {
            noteList: [
                new NoteClass(1, "Meeting", "Work", "Meet with John in restaurant Bistro", "", null, ""),
                new NoteClass(2, "Test score", "Study", "25/30 points on practical part", "", null, ""),
                new NoteClass(3, "Go to the gym", "To do", "Leg day", true, "2020-11-11", "11:30")
            ]
        };

        this.showDetailForm=this.showDetailForm.bind(this);
        this.showEditForm = this.showEditForm.bind(this);
        this.showDeleteForm = this.showDeleteForm.bind(this);
        this.showChangeNoteStatusForm = this.showChangeNoteStatusForm.bind(this);
        this.showRemindForm = this.showRemindForm.bind(this);
        this.addNote = this.addNote.bind(this);
        this.editNote = this.editNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        this.changeNoteStatus = this.changeNoteStatus.bind(this);
        this.remindNote = this.remindNote.bind(this);
    }

// ... reszta komponentu Notes ...


    createNotification(message){
        NotificationManager.success('Success',message);
    }
    showDetailForm(id){
        const{noteList}=this.state;
        var index = noteList.findIndex(function(value){
            return value.id===id;
        });
        confirmAlert({
            customUI: ({onClose})=>{
                return(
                   <DetailForm noteList = {noteList} index={index} onClose={onClose} />
                );
            }
        });
    }

    showEditForm(id){
        const{noteList}=this.state;
        var index = noteList.findIndex(function(value){
            return value.id===id;
        });
        confirmAlert({
            customUI: ({onClose})=>{
                return(
                    <div>
                        <EditForm noteList = {noteList} index={index} onClose={onClose} editNote={this.editNote} />
                        <NotificationContainer />
                    </div>
                );
            }
        });
    }

    showDeleteForm(id){
        const{noteList}=this.state;
        var index = noteList.findIndex(function(value){
            return value.id===id;
        });
        confirmAlert({
            customUI: ({onClose})=>{
                return(
                    <DeleteForm index={index} onClose={onClose} deleteNote={this.deleteNote} />
                );
            }
        });
    }
    showChangeNoteStatusForm(id){


        const{noteList}=this.state;
        var index = noteList.findIndex(function(value){
            return value.id===id;
        });
        confirmAlert({
            customUI: ({onClose})=>{
                return(
                        <ChangeNoteStatusForm status = {noteList[index].status} index={index} onClose={onClose} changeNoteStatus={this.changeNoteStatus}  showChangeNoteStatusForm={() => {}} />
                );
            }
        });

    }

    showRemindForm(id){
        const{noteList}=this.state;
        var index = noteList.findIndex(function(value){
            return value.id===id;
        });
        confirmAlert({
            customUI: ({onClose})=>{
                return(
                    <div>
                        <RemindForm onClose={onClose} index={index}  remindNote={this.remindNote} />
                        <NotificationContainer />
                    </div>
                );
            }
        });
    }

    onChange(e){
        var name = e.target.id;
        this.setState({
            [name]: e.target.value
        })
    }
    onClick(){
        confirmAlert({
            customUI: ({onClose})=>{
                return(
                    <div>
                        <h1>Add content to note</h1>
                        <p><textarea cols="50" rows="10" id="content" defaultValue={this.state.content} onChange={(e)=> this.onChange(e)}></textarea> </p>
                        <Button style={{float:"right"}} variant="danger" onClick={onClose}>Close window</Button>
                    </div>
                );
            }
        });
    }
    addNote(s){
        this.setState(state=>{
            var notes = state.noteList;
            var id = state.noteList.length + 1;
            var date = s.date === undefined ? "": s.date;
            var time = s.time === undefined ? "": s.time;
            var status ="";
            if(state.category ==="To do"){
                status = false;
            } else {
               status=undefined;
            }
            let newNote = new NoteClass(id,s.title,s.category,s.content,status,date,time);
            notes.push(newNote);
            return{noteList : notes}
        });
    }

    editNote(index,s){
        this.setState(state=>{
            var notes = state.noteList;

            notes[index].title = s.editTitle;
            notes[index].category = s.editCategory;
            notes[index].content = s.editContent;

            return{noteList : notes}
        });
        this.createNotification('Note was edited successfully');
    }

    deleteNote(index){
        this.setState(state=>{
            var notes = state.noteList;
            notes.splice(index,1);
            return{noteList : notes}
        });
    }

    remindNote(index,date,time){
        this.setState(state=>{
            var notes = state.noteList;

            notes[index].date = date;
            notes[index].time = time;

            return{noteList : notes}
        });
        this.createNotification('Notification was added succesfully');
    }
    changeNoteStatus(index){
        this.setState(state=>{
            var notes = state.noteList;
            var prevStatus = notes[index].status;
            notes[index].status=!prevStatus;
            return{noteList : notes}
        });
    }

    filter(content) {
        return content.length > 25 ? content.substring(0,25) +"..." : content;
    }
    render() {
        console.log(typeof this.showChangeNoteStatusForm);
        return (
            <div>
                <h3>List of  notes</h3>
                <Table striped bordered>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Content</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.noteList.map((note,key)=>{
                        return(
                            <Note
                                key={key}
                                id={note.id}
                                title={note.title}
                                category={note.category}
                                content={note.content}
                                date={note.date}
                                time={note.time}
                                status={note.status}
                                showDetailForm={this.showDetailForm}
                                showDeleteForm={this.showDeleteForm}
                                showChangeNoteStatusForm={this.showChangeNoteStatusForm}
                                showRemindForm={this.showRemindForm}
                            />
                        )
                    })}
                    </tbody>
                </Table>
               <AddNote addNote={this.addNote}/>
            </div>
        );
    }


}
export default Notes;
