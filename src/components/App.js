import React, {useEffect, useState} from 'react';
import AppRouter from 'components/Router';
// eslint-disable-next-line
import { authService } from "fbase";


function App() {
  // eslint-disable-next-line
  const[init, setInit] = useState(false);
  // eslint-disable-next-line
  const [userObj, setUserObj] = useState(null);
  useEffect(()=>{
    authService.onAuthStateChanged((user)=> {
      if(user){
        // setUserObj(user);

        setUserObj({
          displayName:user.displayName,
          uid:user.uid,
          updateProfile:(args) => user.updateProfile(args)
        });
      }else{
        setUserObj(null);
      }
      setInit(true);
    })
  }, []);

  const refreshUser =() =>{
    const user = authService.currentUser;
    // setUserObj(Object.assign({}.user));
    setUserObj({
      displayName:user.displayName,
      uid:user.uid,
      updateProfile:(args) => user.updateProfile(args)
    });
  };

  return (
  <>
   {init ? (
    <AppRouter
    refreshUser={refreshUser}
    isLoggedIn={Boolean(userObj)}
    userObj={userObj}/>
    ) : (
      "Initializing..."
    )}
  <footer>
    &copy; WalkDown {new Date().getFullYear()}.{new Date().getMonth()+1}.{new Date().getDate()}
  </footer>
  </>
  );
}

export default App;
