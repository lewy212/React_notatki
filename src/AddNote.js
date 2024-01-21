import * as Icon from "react-bootstrap-icons";
import React, {Component} from 'react';
import {Button, Table} from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert';
class AddNote extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
    render() {
        return (
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
        );
    }
}
export default AddNote;