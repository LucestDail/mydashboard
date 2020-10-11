import React, { useState } from "react";
import { dbService, storageService } from "../fbase";
import {v4 as uuidv4} from "uuid";

const WalkFactory = ({userObj}) => {
    const [walk, setWalk] = useState("");
    const [attachment, setAttachment] = useState("");
    const onSubmit = async (event) => {
        event.preventDefault();
        if (walk === "") {
            return;
          }
        let attachmentUrl = "";
        if(attachment !== ""){
            const attachmentRef = storageService
            .ref()
            .child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment,"data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }
        const walkObj = {
            text:walk,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl
        };
        
        await dbService.collection("walks").add(walkObj);
        setWalk("");
        setAttachment("");
    };
    const onChange=(event) => {
        const{target:{value},
    } = event;
    setWalk(value);
    };

    const onFileChange=async(event) => {
        const{target:{files},
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) =>{
        const {
            currentTarget: {result},
        } = finishedEvent;
        setAttachment(result)
    }
    reader.readAsDataURL(theFile);
    };

    const onClearAttachmentclick =() =>setAttachment("");


    return(
        <form onSubmit={onSubmit}>
                <input
                value={walk}
                onChange={onChange}
                type="text"
                placeholder="What is on your mind?"
                maxLength={120}
                />
                <input
                type="file"
                accept="image/*"
                onChange={onFileChange}
                />
                <input
                type="submit"
                value="Walk" />
                {attachment && <div>
                <img
                src={attachment}
                width="100px"
                height="100px"
                alt="img"
                />
                <button onClick={onClearAttachmentclick}>Clear</button>
                </div>
                }
            </form>
    )
};
export default WalkFactory;