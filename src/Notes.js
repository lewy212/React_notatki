import React, {Component} from 'react';
import {Button, Table} from 'react-bootstrap'
import Note from "./Note";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';


class Notes extends Component{
    constructor(props) {
        super(props);
        this.state={
            noteList :[
                {
                    title:"Meeting",
                    category: "Work",
                    content: "Meet with John in restaurant Bistro",
                    date: '',
                    status: undefined,
                    time: ''
                },
                {
                    title:"Test score",
                    category: "Study",
                    content: "25/30 points on practical part",
                    date: '',
                    status: undefined,
                    time: ''
                },
                {
                    title: "Go to the gym",
                    category:"Hobby",
                    content:"Leg day",
                    date: '',
                    status: false,
                    time: ''
                },
                {
                    title: "Go to the gym",
                    category:"Hobby",
                    content:"Chest day",
                    date: new Date("2020-07-07")
                }
            ],
            title: '',
            category: '',
            content: '',
            date: undefined,
            time: undefined,
        }
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
    addNote(){
        this.setState(state=>{
            var notes = state.noteList;
            var date = state.date === undefined ? "": new Date(state.date);
            var time = state.time === undefined ? "": state.time;
            if(state.category ==="To do"){
                notes.push({
                    title: state.title,
                    category: state.category,
                    content: state.content,
                    date: date,
                    time: time,
                    status: false
                })
            } else {
                notes.push({
                    title: state.title,
                    category: state.category,
                    content: state.content,
                    date: date,
                    time: time,
                    status: undefined
                })
            }
            return{noteList : notes}
        })
    }
    filter(content) {
        return content.length > 25 ? content.substring(0,25) +"..." : content;
    }
    render() {
        return (
            <div>
                <h3>List of  notes</h3>;
                <Table striped bordered>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Content</th>
                        <th>Action</th>
                    </tr>
                    <Note
                        title="Go shopping"
                        category="To do"
                        content = "Buy some vegetables"
                        date={new Date("2020-12-12")}
                    />
                    {this.state.noteList.map((note,key)=>{
                        return(
                            <Note
                                key={key}
                                title={note.title}
                                category={note.category}
                                content={this.filter(note.content)}
                                status={note.status}
                            />
                        )
                    })}
                    <Note />
                    </thead>
                    <tbody>
                    </tbody>
                </Table>
                <Table striped bordered>
                    <tbody>
                    <tr>
                        <td colSpan="5" style={{textAlign: "center"}}><i><b>Add new note</b></i></td>
                    </tr>
                    <tr>
                        <td><input type="text" placeholder="Title of note" id="title" onChange={(e)=> this.onChange(e)} /> </td>
                        <td><input type="text" list="categoryList" id="category" placeholder="Category of note" onChange={(e)=> this.onChange(e)} />
                        <datalist id="categoryList">
                            <option>To do</option>
                            <option>Hobby</option>
                            <option>Work</option>
                            <option>Study</option>
                            <option>Gym</option>
                            <option>Favorites</option>
                        </datalist>
                        </td>
                        <td>
                            {
                                this.state.content!==''?
                                    <Button variant="primary" onClick={()=>this.onClick()}>Edit content</Button>:
                                    <Button variant="success" onClick={()=>this.onClick()}>Add content</Button>
                            }
                        </td>
                        <td><input type="date" id="date" onChange={(e)=>this.onChange(e)} /><input type="time" id="time" onChange={(e)=>this.onChange(e)}/></td>
                        <td><Button variant="secondary" onClick={()=>this.addNote()}>Add note</Button> </td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        );
    }


}
export default Notes;