import React, { Component } from 'react';
import { Table } from "semantic-ui-react";
import { paymentListURL } from "../../constants";
import { authAxios } from "../../utils";
import { connect } from "react-redux";


class PaymentHistory extends Component {
    state = {
        payments: []
    };

    componentDidMount() {
        this.handleFetchPayments();
    }

    handleFetchPayments = () => {
        this.setState({ loading: true });
        authAxios(this.props.token)
            .get(paymentListURL)
            .then(res => {
                this.setState({
                    loading: false,
                    payments: res.data
                });
            })
            .catch(err => {
                this.setState({ error: err, loading: false });
            });
    };

    render() {
        const { payments } = this.state;
        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Amount</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {payments.map(payment => {
                        return (
                            <Table.Row key={payment.id}>
                                <Table.Cell>{payment.id}</Table.Cell>
                                <Table.Cell>{payment.amount}&euro;</Table.Cell>
                                <Table.Cell>{new Date(payment.timestamp).toUTCString()}</Table.Cell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        isAuth: state.auth.isAuth,
    };
};

export default connect(mapStateToProps)(PaymentHistory);