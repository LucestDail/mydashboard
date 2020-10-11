import React, { useState } from "react";
import { dbService, storageService } from "../fbase";

const Walk = ({walkObj, isOwner}) => {
    const [turning,setTurning] = useState(false);
    const [newWalk, setNewWalk] = useState(walkObj.text);
    const onDeleteClick = async () =>{
        const ok = window.confirm("Are you sure you want to delete this step?");
        console.log(ok);
        if(ok){
            await dbService.doc(`walks/${walkObj.id}`).delete();
            await storageService.refFromURL(walkObj.attachmentUrl).delete();
        }
    };
    const toggleTurning =() => setTurning(prev => !prev);
    const onSubmit = async (event) =>{
        event.preventDefault();
        console.log(walkObj, newWalk);
        await dbService.doc(`walks/${walkObj.id}`).update({
            text:newWalk
        });
        setTurning(false);
    };
    const onChange = (event) =>{
        const{
            target:{value},
        } = event;
        setNewWalk(value);
    };
    return (
    <div>
        {turning ? (
            <>
            {isOwner && (
            <>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Turning your step" value = {newWalk} required onChange={onChange}/>
                <input type="submit" value="Update Walk"/>
            </form>
            <button onClick={toggleTurning}>Cancel</button>
            </>
            )
            }
            </>
            ) : (
            <>
            <h4>{walkObj.text}</h4>
            {walkObj.attachmentUrl &&
            <img src={walkObj.attachmentUrl}
            width="100px"
            height="100px"
            alt="attachFile"
            />}
            {isOwner && (
            <>
                <button onClick={onDeleteClick}> Delete step</button>
                <button onClick={toggleTurning}> Turn step</button>
            </>
            )}
          </>
            )}
    </div>
    )  
};

export default Walk;