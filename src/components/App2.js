import React from 'react';

class App2 extends React.Component {
    render () {
        return (
            <div>
                <Heading />
                <List todos={todo}/>
            </div>
        )
    }
}

function Heading () {
    return <h1>Jack's Todos</h1>
}
function List () {

}