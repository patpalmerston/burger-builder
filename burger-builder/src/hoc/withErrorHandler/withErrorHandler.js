import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxillary';

const WithErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null,
        };
        componentWillMount() {
            // this key work creating reference to these variable for storage in the class component
            this.reqInterceptor = axios.interceptors.request.use((req) => {
                this.setState({ error: null });
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(
                (res) => res,
                (error) => {
                    this.setState({ error: error });
                }
            );
        }

        componentWillUnmount() {
            // now we can use the references to remove them after the component has mounted
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.request.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        };
        render() {
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    };
};

export default WithErrorHandler;
