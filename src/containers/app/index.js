import React from 'react';
import { Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/homepage.css';
import '../../css/app.css';

import Login from '../../components/login.component';
import Logout from '../../components/logout.component';
import SignUpTeacher from '../../components/signup.teacher.component';
import SignUpStudent from '../../components/signup.student.component';
import SignUpSocial from '../../components/signup.social.component';

const App = () => (
    <div>
        <main>
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/sign-up-teacher" component={SignUpTeacher} />
            <Route exact path="/sign-up-student" component={SignUpStudent} />
            <Route exact path="/sign-up-social" component={SignUpSocial} />
        </main>
    </div>
);

export default App;