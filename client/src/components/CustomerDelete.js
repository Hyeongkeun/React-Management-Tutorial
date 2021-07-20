import React from 'react';

class CustomerDelete extends React.Component{

    deleteCustomer(id){
        const url = '/api/customers/' + id;
        fetch(url, {
            method: 'DELETE' //url에 접속하여 delete method로 삭제를 한다.
        });
        this.props.stateRefresh();
    }
    render(){
        return(
            <button onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</button>
        )
    }
}

export default CustomerDelete;