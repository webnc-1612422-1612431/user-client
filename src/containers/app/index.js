import React from 'react';
import { Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../../css/chat.css';
import '../../css/homepage.css';
import '../../css/app.css';

import Login from '../../components/login.component';
import Logout from '../../components/logout.component';
import SignUpTeacher from '../../components/signup.teacher.component';
import SignUpStudent from '../../components/signup.student.component';
import SignUpSocial from '../../components/signup.social.component';
import ForgotPass from '../../components/forgot.pass.component';
import InfoTeacher from '../../components/info.teacher.component';
import ManageTags from '../../components/manage.tags.component';
import DetailTeacher from '../../components/detail.teacher.component';
import ListTeacher from '../../components/list.teacher.component';
import ChangePass from '../../components/changepass.component';
import InfoStudent from '../../components/info.student.component';
import ListContract from '../../components/list.contract.component';

const App = () => (
    <div>
        <main>
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/sign-up-teacher" component={SignUpTeacher} />
            <Route exact path="/sign-up-student" component={SignUpStudent} />
            <Route exact path="/sign-up-social" component={SignUpSocial} />
            <Route exact path="/forgot-pass" component={ForgotPass} />
            <Route exact path="/info-teacher" component={InfoTeacher} />
            <Route exact path="/info-student" component={InfoStudent} />
            <Route exact path="/manage-tags" component={ManageTags} />
            <Route exact path="/detail-teacher" component={DetailTeacher} />
            <Route exact path="/list-teacher" component={ListTeacher} />
            <Route exact path="/change-pass" component={ChangePass} />
            <Route exact path="/list-contract" component={ListContract} />
        </main>
    </div>
);

export default App;