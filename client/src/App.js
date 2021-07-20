import React, { Component } from 'react';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: "auto" 
  },
  table: {
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing(2)
  }
})

// 이제는 서버에 접속하여 데이터를 가져온다.
/* const customers = [{
  'id': 1,
  'image': 'https://placeimg.com/64/64/1',
  'name': '이형근',
  'birthday': '960710',
  'gender': '남자',
  'job': '대학생'
},
{
  'id': 2,
  'image': 'https://placeimg.com/64/64/2',
  'name': '김예지',
  'birthday': '950805',
  'gender': '여자',
  'job': '뇌과학자'
},
{
  'id': 3,
  'image': 'https://placeimg.com/64/64/3',
  'name': '이순신',
  'birthday': '280703',
  'gender': '남자',
  'job': '디자이너'
}
]*/

class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      customers: '',
      completed: 0
    }
  }

  stateRefresh = () =>{
    this.setState({
      customers: '',
      completed: 0
    });

    this.callApi()
    .then(res => this.setState({customers: res}))
    .catch(err => console.log(err));
  } //이를 CustomerAdd.js에서 호출하면 부모컴포넌트인 App.js 컴포넌트의 state를 호출할 수 있다. --> 이렇게 된다면 전체 새로고침 없이 고객 목록만 바꿔서 바로 나타낼 수 있다. 하지만 상용에서는 전체 고객을 새로고침한다면 그것도 소스를 많이 잡아먹기 때문에 10개만 나타내는 형식으로 해서 이후 고객 정보는 scroll을 이용한다.

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1});
  }
  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  render(){
    const { classes } = this.props;
    return(
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {/* this.state.customers 값은 초기에는 ""이므로 err가 난다. 따라서 값이 존재할 때만 map을 할 수 있도록 this.state.customers ?를 붙혀준다.*/}
              {this.state.customers ? this.state.customers.map(c => {
                return(
                  <Customer
                    key={c.id} //map을 사용하기 위해서는 key 값이 필요
                    id={c.id}
                    image={c.image}
                    name={c.name}
                    birthday={c.birthday}
                    gender={c.gender}
                    job={c.job}
                  />
                );
              }) : 
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
                </TableCell>
              </TableRow>
              } 
            </TableBody>
          </Table>
        </Paper>
        <CustomerAdd stateRefresh={this.stateRefresh} />
      </div>

    );
  }
}

export default withStyles(styles)(App);
