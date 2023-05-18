import React, { useEffect, useState } from "react";
import LogIn from "./LogIn";
import Input from "../../UI/Input";
import Form from "../../UI/Form";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated } from "../../Redux/slices/uiSlice";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Authentification = ({ firebaseAuth }) => {
  // I want to mimic setting up a user when the application runs, then when you click the login button everything is set and you can enjoy the app
  // Base on that user, you should have access to the DB with your specific weather data 🙂
  // In this case, the user is going to be always the same one
  const isAuth = useSelector((state) => state.rootUi.isAuthenticate);

  const [mail, setMail] = useState("example@mail.com");
  const [password, setPassword] = useState("password123@");

  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  const dispatch = useDispatch();

  const createUser = async () => {
    await createUserWithEmailAndPassword(firebaseAuth, mail, password)
      .then((userCredential) => {
        setUser(userCredential);
      })
      .catch((err) => console.warn(err));
  };

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        const { accessToken } = currentUser;
        setUserToken(accessToken);
        setUser(currentUser);
      } else {
        setUserToken(null);
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        await createUser();
      } catch (err) {
        console.warn(err);
      }
    };

    if (user && userToken !== user.accessToken) {
      checkCurrentUser();
    }
  }, [userToken, user]);

  const logInHandler = async (e) => {
    e.preventDefault();

    localStorage.setItem("isAuth", true);
    dispatch(isAuthenticated(true));

    if (user !== null) {
      await signInWithEmailAndPassword(firebaseAuth, mail, password)
        .then((data) => {
          const { accessToken, email, uid } = data.user;

          setUserData({
            currentUserToken: accessToken,
            currentUserMail: email,
            currentUserId: uid,
          });
        })
        .catch((err) => console.warn(err));
    }
  };

  return (
    <Form onSubmit={logInHandler} className="flex items-center red-300 items">
      {/*In this case, I don't need a debouncer for my inputs, the data should be receive on click*/}
      <Input
        className="hidden"
        placeholder="mail"
        type="email"
        value={mail}
        /*I should listen for e.target.value on the onChange, I know this is not the correct approach but it work for what I am trying to do, same for the password input - for more, check the comments at the top of the component*/
        onChange={() => mail}
      />

      <Input
        className="hidden"
        placeholder="password"
        type="password"
        value={password}
        onChange={() => password}
      />

      {!isAuth && <LogIn />}
    </Form>
  );
};

export default Authentification;
