import React, {useState } from "react";
import { useHistory } from "react-router-dom";
import { authService} from "../fbase";


export default({refreshUser, userObj})=>{
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () =>{
        authService.signOut();
        history.push("/");
    };
    const onChange =(event) => {
        const{target:{value},} = event;
        setNewDisplayName(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            await userObj.updateProfile({
                displayName: newDisplayName,
            })
            refreshUser();
        }
    };

    // const getMyWalks = async () => {
    //     const walks = await dbService
    //     .collection("walks")
    //     .where("creatorId", "==",userObj.uid)
    //     .orderBy("createdAt","asc")
    //     .get();
    //     console.log(walks.docs.map((doc) => doc.data()));
    // };
    // useEffect(() => {
    //     getMyWalks();
    // },[]);
    
    return(
        <>
        <form onSubmit={onSubmit}>
            <input
            onChange={onChange}
            type="text"
            placeholder="Display Name"
            value={newDisplayName}
            />
            <input
            type="submit"
            value="Update profile"
            />
        </form>
        <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};