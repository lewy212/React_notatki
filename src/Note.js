import React from "react";
import PropTypes from "prop-types";
import * as Icon from "react-bootstrap-icons"

const Note = (props)=>{
    return(
        <tr>
            <td style={{verticalAlign: "middle"}}>{props.title}</td>
            <td className="justifyView" style={{borderBottom: "none"}}>{props.category}
                {
                    props.category ==="To do" ?(
                        <Icon.ListCheck size={66}/>
                    ) : (
                        <Icon.FileText size={66} />
                    )}
            </td>
            <td style={{verticalAlign: "middle"}}>{props.content}</td>
            {
                props.status === undefined ? (
                    <td>
                        <div className="justifyRow">
                            <div className="justifyColumn">
                                <div>
                                    <Icon.Bell size={32} color ="green" className="item"/>
                                    <i>Detail</i>
                                </div>
                                <div style={{display: "block"}}>
                                    <Icon.Bell size={32} color ="#999900" className="item"/>
                                    <i>Remind</i>
                                </div>
                            </div>
                            <div className="justifyColumn">
                                <div>
                                    <Icon.Pencil size={30} color ="blue" className="item"/>
                                    <i>Edit</i>
                                </div>
                                <div>
                                    <Icon.Trash size={30} color ="black" className="item"/>
                                    <i>Delete</i>
                                </div>
                            </div>
                        </div>
                    </td>
                ) : (
                    <td>
                        {
                            props.status ? (
                                <div className="justifyRow">
                                    <div className ="justifyColumn">
                                        <div style ={{display: "block", verticalAlign: "middle"}}>
                                            <Icon.XCircle size={32} color="red" className="item" />
                                            <i>Undone</i>
                                        </div>
                                        <div>
                                            <Icon.Bell size={30} color ="green" className="item"/>
                                            <i>Detail</i>
                                        </div>
                                    </div>
                                    <div className="justifyColumn">
                                        <div style={{display: "block"}}>
                                            <Icon.Bell size={32} color ="#999900" className="item"/>
                                            <i>Remind</i>
                                        </div>
                                        <div style={{display: "block"}}>
                                            <Icon.Pencil size={32} color ="blue" className="item"/>
                                            <i>Edit</i>
                                        </div>
                                    </div>
                                    <div className="justifyColumn">
                                        <div>
                                            <Icon.Trash size={30} color ="black" className="item"/>
                                            <i>Delete</i>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="justifyRow">
                                    <div className="justifyColumn">
                                        <div style={{display: "block"}}>
                                            <Icon.CheckCircle size={32} color ="green" className="item"/>
                                            <i>Done</i>
                                        </div>
                                        <div>
                                            <Icon.List size={30} color ="green" className="item"/>
                                            <i>Detail</i>
                                        </div>
                                    </div>
                                    <div className="justifyColumn">
                                        <div style={{display: "block"}}>
                                            <Icon.Bell size={32} color ="#999900" className="item"/>
                                            <i>Remind</i>
                                        </div>
                                        <div>
                                            <Icon.Pencil size={30} color ="blue" className="item"/>
                                            <i>Edit</i>
                                        </div>
                                    </div>
                                    <div>
                                        <Icon.Trash size={30} color ="black" className="item"/>
                                        <i>Delete</i>
                                    </div>
                                </div>
                            )
                        }
                    </td>
                )
            }
        </tr>
    );
};
Note.propTypes={
    title(props,propName){
        if(props[propName].length<3){
            return new Error(propName +" was to short")
        }
    },
    category: PropTypes.string,
    content: PropTypes.string

};

export default Note;