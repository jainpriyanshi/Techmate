import React, { Component } from 'react'
import List from "./list"
import Carousel from"./carousel"
export default class Homepage extends Component {
    render() {
        return (
            <div>
            <div >
               <Carousel />
               </div>
                <List />
            </div>
        )
    }
}
