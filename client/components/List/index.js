import React from 'react';
import './index.css';

import api from '../../api'

export default class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            userName: ''
        };
    }

    componentWillMount() {
        api.getAllThings(window.location.href.split('/')[3])
            .then(data => {
                this.setState({
                    list: data
                });
            });
        api.getName(window.location.href.split('/')[3])
            .then(data => {
                this.setState({
                    userName: data.userName
                });
            });
    }

    render() {
        const list = this.state.list
            .map(function (item, i) {
                return <div className="list-item" key={i}>
                    <a target="_blank" href={item.link}>
                        <img src={item.pictureUrl} alt={item._id.itemId} title={item.title} />
                    </a>
                    {item.price}
                </div>;
            })
        return (
            <div className={"content content-" + this.props.theme}>
                <div className="container">
                    <div className="headline clearfix">
                        <h1>{'Список желаний ' + this.state.userName}</h1>
                    </div>
                    <div>
                        <div className="list">
                            {list}
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}