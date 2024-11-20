import '../componet/css/Register.css'
function Register() {
  return (
    <div className='App-register'>
        <div class="register-container">
        <h1>Registered Account</h1>
        <form>
        <div class="form-group">
            <div class="form-control">
            <label for="fullname">Full Name</label>
            <input type="text" id="fullname" placeholder="Enter your name" required/>
            </div>
            <div class="form-control">
            <label for="password">Password</label>
            <input type="password" id="password" placeholder="Country Name" required/>
            </div>
        </div>

        <div class="form-group">
            <div class="form-control">
            <label for="email">Email</label>
            <input type="email" id="email" placeholder="name@gmail.com" required/>
            </div>
            <div class="form-control">
            <label for="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" placeholder="6+ characters" required/>
            </div>
        </div>

        <button type="submit" class="register-button">Registered</button>
        </form>
        <a href="/">Login</a>
    </div>
  </div>
  );
}

export default Register;
