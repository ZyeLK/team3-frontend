import React from "react";
import { Switch, Route } from "react-router-dom";

import { Email, My, Password, Withdrawal, Auth } from "./";
const UserInfo = () => {
  return (
    <Switch>
      <Route exact path="/my" component={My}></Route>
      <Route path="/my/auth" component={Auth}></Route>
      <Route path="/my/email" component={Email}></Route>
      <Route path="/my/password" component={Password}></Route>
      <Route path="/my/withdrawal" component={Withdrawal}></Route>
    </Switch>
  );
};

export default UserInfo;
