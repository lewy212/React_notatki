import * as Icon from "react-bootstrap-icons";
import React, {Component} from 'react';
import {Button} from "react-bootstrap";
class EditForm extends Component{

    constructor(props) {
        super(props);
        this.state={
            editTitle: props.noteList[props.index].title,
            editCategory:props.noteList[props.index].category,
            editContent: props.noteList[props.index].content
        };
    }
    onChange(e){
        var name = e.target.id;
        this.setState({
            [name]: e.target.value
        })
    }
    render(){
        const{index,noteList,editNote,onClose} = this.props;
        return(
            <div className="alertForm">
                <span className="closeButton">
                    <Icon.XCircleFill color="dimgray" size="18" onClick={()=>onClose()} />
                </span>
                <div className="noteTitleEdit">
                    <label className="noteEditLabel">Title</label>
                    <input type="text"  id="editTitle" defaultValue={noteList[index].title} style={{border:'none'}} onChange={(e)=> this.onChange(e)} />
                </div>
                <div className="noteCategoryEdit">
                    <label className="noteEditLabel">Category</label>
                    <input type="text" list="categoryList" id="editCategory" defaultValue={noteList[index].category} style={{border:'none'}} onChange={(e)=> this.onChange(e)} />
                    <datalist id="categoryList">
                        <option>To do</option>
                        <option>Hobby</option>
                        <option>Work</option>
                        <option>Study</option>
                        <option>Gym</option>
                        <option>Favorites</option>
                    </datalist>
                </div>
                <div className = "noteContentEdit">
                    <label className="noteEditLabel">Content</label>
                    <textarea id="editContent" defaultValue={noteList[index].content}  style={{border:'none'}}  cols="50" rows="10" onChange={(e)=> this.onChange(e)} />
                </div>
                <div className="noteEditButton">
                    <Button variant="primary" onClick={() => editNote(index, this.state)}>Save</Button>
                </div>
            </div>

        )
    }
}
export default EditForm;