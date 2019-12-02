import React from 'react';
import { Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from '../../components/login.component';
import SignUpTeacher from '../../components/signup.teacher.component';
import SignUpStudent from '../../components/signup.student.component';

const App = () => (
    <div>
        <main>
            <Route exact path="/login" component={Login} />
            <Route exact path="/sign-up-teacher" component={SignUpTeacher} />
            <Route exact path="/sign-up-student" component={SignUpStudent} />
        </main>
    </div>
);

export default App;