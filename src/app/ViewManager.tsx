import 'core-js/stable'
import 'regenerator-runtime/runtime'
import * as React from 'react'
import { render } from 'react-dom'
import App from './App'
import App2 from './App2'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class ViewManager extends React.Component {

    static Views(): any {
        return {
            viewA: <App />,
            viewB: <App2 />
        }
    }

    static View(props: any) {
        let name = props.location.search.substr(1);
        let view = ViewManager.Views()[name];
        if (view == null) {
            throw new Error('View' + name + ' is undefined');
        }
        return view;
    }

    render() {
        return (
            <Router>
                <div>
                    <Route path='/' component={ViewManager.View}/>
                </div>
            </Router>
        );
    }
}

export default ViewManager