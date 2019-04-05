import React, { Component } from "react";

class LoginForm extends Component {
  render() {
    return (
      <div id="login_form" className="form_input">
        <div className="signup-form">	
					<form onSubmit={this.onSubmit}>
						<h2>Login to Your Account</h2>
						<div className="form-group">
							<div className="input-group">
								<span className="input-group-addon">
									<i className="fa fa-user"/>
								</span>
								<input 
									type="text" 
									className="form-control" 
									name="username" 
									placeholder="Username" 
									required="required"
								/>
							</div>
						</div>
						<div className="form-group">
							<div className="input-group">
								<span className="input-group-addon">
									<i className="fa fa-lock"/>
								</span>
								<input 
									type="password" 
									className="form-control" 
									name="password" 
									placeholder="Password" 
									required="required"
								/>
							</div>
						</div>     
						<div className="form-group">
							<button 
								type="submit" 
								className="btn btn-primary btn-block btn-lg">
									Login
							</button>
						</div>
					</form>
					<div className="text-center">
						Don't have an account? <a href="/register">Register now</a>.
					</div>
				</div>
			</div>	
    );
  }
}

export default LoginForm;


