import '../componet/css/Register.css'
function Register() {
  return (
    <>
    <div class="container">
        <div class="card">
            <h2 class="card-title">Registered Account</h2>
            <form class="registration-form">
                <div class="form-group">
                    <label for="fullName">Full Name</label>
                    <input type="text" id="fullName" placeholder="Enter your name" required/>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" required/>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" placeholder="••••••" required/>
                </div>
                <div class="form-group">
                    <label for="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" placeholder="6+ characters" required/>
                </div>
                <button type="submit" class="submit-btn">Registered</button>
            </form>
            <div class="login-link">
                <a href="#">Login</a>
            </div>
        </div>
    </div>
    </>
  );
}

export default Register;
