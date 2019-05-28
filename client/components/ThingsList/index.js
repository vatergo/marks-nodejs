import React from 'react';
import './index.css';

import api from '../../api'
import * as cookie from '../../cookie'

export default class ThingsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
        };
        this.copy = this.copy.bind(this);
    }

    deleteProduct(itemId) {
        api.deleteProduct(cookie.get('userId'), itemId)
            .then(data => {
                this.setState({
                    list: this.state.list
                });
            });
    }

    componentWillMount() {
        api.getAllThings(cookie.get('userId'))
            .then(data => {
                this.setState({
                    list: data
                });
            });
    }

    componentWillUpdate() {
        api.getAllThings(cookie.get('userId'))
            .then(data => {
                this.setState({
                    list: data
                });
            });
    }

    copy() {
        navigator.clipboard.writeText(`localhost:8090/${cookie.get('userId')}`);
        document.querySelector('.button-copy').innerHTML = 'Ссылка скопирована';
        setTimeout(() => document.querySelector('.button-copy').innerHTML = 'Поделиться', 500);
    }

    render() {
        const context = this;
        //const sort = this.state.sort;
        const list = this.state.list./*sort(function (a, b) {
            if (sort === 1) return a.id - b.id;
            return b.id - a.id;
        }).*/map(function (item, i) {
            return <div className="list-item" key={i}>
                <button className="delete-item" onClick={context.deleteProduct.bind(context, item._id.itemId)}>✖</button>
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
                        <h1>Список желаний</h1>
                        <span className='button-copy' onClick={this.copy}>Поделиться</span> 
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