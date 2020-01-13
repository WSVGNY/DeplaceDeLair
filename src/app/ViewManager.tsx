// import 'core-js/stable'
// import 'regenerator-runtime/runtime'
// import * as React from 'react'
// import { render } from 'react-dom'
// import {App, App2} from './App'
// import { BrowserRouter as Router, Route } from 'react-router-dom'

// class ViewManager extends React.Component {

//     static Views() {
//         return {
//             viewA: <App />,
//             viewB: <App2 />
//         }
//     }

//     static View(props) {
//         let name = props.location.search.substr(1);
//         let view = ViewManager.Views()[name];
//         if (view == null) {
//             throw new Error('View' + name + ' is undefined');
//         }
//         return view;
//     }

//     render() {
//         return (
//             <Router>
//                 <div>
//                     <Route path='/' component={ViewManager.View}/>
//                 </div>
//             </Router>
//         );
//     }
// }

// export default ViewManager