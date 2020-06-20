import React from 'react';
import './App.css';
import StateTable from './components/StateTable'
import Charts from './components/Charts'
import Maps from './components/Maps'
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends React.Component {
  state = {  
    status: {},
    states: [],
    withtime: [],
    tests: []
  }
  
  componentDidMount() {

    Axios.get(`https://api.covid19india.org/data.json`).then(res => { 
      let curr_status = {
        deaths: res.data.statewise[0].deaths,
        confirmed: res.data.statewise[0].confirmed,
        recovered: res.data.statewise[0].recovered,
        time: res.data.statewise[0].lastupdatedtime,
        
      };  
      this.setState({ status:curr_status });

      this.setState({states:res.data.statewise});
      this.setState({tests:res.data.tested});
      this.setState({withtime:res.data.cases_time_series});
      
      
    }).catch(err => {
      console.log("error");
    })
  }
  
  render() {
    return (
      
      <div className="App">
        <Maps states = {this.state.states}/>
        <Charts data = {this.state.withtime} data1 = {this.state.tests} />
        <StateTable states={this.state.states}/>
      </div>
    );
  }
}
export default App;






        
         