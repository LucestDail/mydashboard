import React, { useEffect, useState } from "react";
import Walk from "../components/Walk";
import { dbService } from "../fbase";
import WalkFactory from "../components/WalkFactory";
const Home = ({userObj}) => {
    const [walks, setWalks] = useState([]);
    // const getWalks = async() =>{
    //     const dbWalks = await dbService.collection("walks").get();
    //     dbWalks.forEach((document) => {
    //         const walkObject = {
    //             ...document.data(),
    //             id: document.id,
    //         };
    //         setWalks((prev) => [walkObject, ...prev]);
    //     });
    // };
    useEffect(() => {
        // getWalks();
        dbService.collection("walks").onSnapshot((snapshot) => {
            const walkArray = snapshot.docs.map(doc =>({
                id:doc.id,
            ...doc.data(),
        }));
        setWalks(walkArray);
        });
    },[]);
    return(
        <div>
            <WalkFactory userObj={userObj}/>
            <div>
                {walks.map((walk) => (
                    <Walk
                    key = {walk.id}
                    walkObj = {walk}
                    isOwner = {walk.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    );
};
export default Home;

