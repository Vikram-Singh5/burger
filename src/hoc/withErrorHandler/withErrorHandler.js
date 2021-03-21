import React, {Component} from 'react'
import Modal from "../../components/UI/Modal/Modal";
import Aux from '../Aux/Aux'

const withErrorHandler = (WrappedComponent, axios) =>{
    return class extends Component {
        state = {
            error: null
        }
        constructor() {
            super();
            this.reqInterceptor = axios.interceptors.request.use(req=>{
                this.setState({error: null});
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use(res=>res, error => {
                this.setState({error: error.message});
            })
        }

        componentWillUnmount() {
            console.log('will unmount', this.this.reqInterceptor, this.this.resInterceptor)
            axios.interceptors.request.eject(this.this.reqInterceptor);
            axios.interceptors.request.eject(this.this.resInterceptor);
        }

        errorConfirmedHandler = () =>{
           this.setState({error: null});
        }

        render() {
            return(
                <Aux>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>{this.state.error? this.state.error:null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            );
        }

    }
}

export default withErrorHandler;
