/**
 * Created by magiclizi on 2016/12/24.
 */
import React from 'react';

import ReactNative from 'react-native';

var {View, StyleSheet} = ReactNative;

var {Component} = React;

export default class RepayNewPage extends Component {

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);

        this['state'] = {}
    }

    componentWillMount() {

    }

    render() {
        return (
            <View>
              还球
            </View>
        )
    }


    componentDidMount() {

    }

    componentWillUnmount() {

    }
}

const styles = StyleSheet.create({});
