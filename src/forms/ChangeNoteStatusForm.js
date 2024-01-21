import React, {Component} from 'react';
import * as Icon from "react-bootstrap-icons";
import {Button} from "react-bootstrap";

const ChangeNoteStatusForm = (props) => {
    const{status,index,onClose,changeNoteStatus} = props;
    return(
        <div className="alertForm">
            <span className="closeButton">
                <Icon.XCircleFill color = "dimgray" size={18} onClick={()=> onClose()} />
            </span>
            <div>
                {
                    status ? (
                        <div>
                            <div className = "importantInfoInAlert">
                                <Icon.Info size={60} color="#F58069" />
                                Are you sure you want to change this status to <span style={{color: "red"}}>undone</span>
                            </div>
                            <div className="noteDeleteButtons">
                                <Button variant="primary" onClick={()=> onClose()}>No</Button>
                                <Button variant="danger" style = {{marginLeft: "10px"}}
                                        onClick={() => {
                                            changeNoteStatus(index);
                                            onClose();
                                        }}>Yes</Button>
                            </div>
                        </div>
                    ) :
                        (
                            <div>
                                <div className = "importantInfoInAlert">
                                    <Icon.Info size={60} color="#F58069" />
                                    Are you sure you want to change this status to <span style={{color: "green"}}>done</span>
                                </div>
                                <div className="noteDeleteButtons">
                                    <Button variant="primary" onClick={()=> onClose()}>No</Button>
                                    <Button variant="danger" style = {{marginLeft: "10px"}}
                                            onClick={() => {
                                                changeNoteStatus(index);
                                                onClose();
                                            }}>Yes</Button>
                                </div>
                            </div>
                        )

                }
            </div>
        </div>
    );
}
export default ChangeNoteStatusForm;