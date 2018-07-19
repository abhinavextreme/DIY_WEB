<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>DIY</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">

    <!-- Icons -->
    <!-- Third Party CSS -->
    <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="startbootstrap-sb-admin-master/vendor/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="startbootstrap-sb-admin-master/vendor/font-awesome/css/font-awesome.min.css"/>
    <link rel="stylesheet" href="startbootstrap-sb-admin-master/css/sb-admin.min.css"/>

    <!-- Custom CSS -->
    <script src="node_modules/moment/moment.js"></script>
    <script src="bower_components/jquery/dist/jquery.min.js"></script>
    <script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="bower_components/angular/angular.min.js"></script>
    <script src="node_modules/bootbox/bootbox.min.js"></script>


    <!-- Custom Scripts -->

    <script src="custom/js/script.js"></script>

    <!-- Modules Scripts -->
    <script src="modules/auth/auth.module.js"></script>
    <script src="modules/auth/auth.model.js"></script>
    <script src="modules/auth/auth.service.js"></script>
    <script src="modules/auth/signup.controller.js"></script>

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body class="bg-light" cz-shortcut-listen="true">
<div class="main-page-load modal-backdrop fade in text-center" style="display: block;">
    <div class="loader"></div>
    Loading...
</div>
<div class="sr-only"></div>
<div class="container">
    <div class="card card-register mx-auto mt-5">
        <div class="card-header">Register an Account</div>
        <div class="card-body">
            <form>
                <div class="form-group">
                    <div class="form-row">
                        <div class="col-md-6">
                            <label for="exampleInputName">First name</label>
                            <input class="form-control" id="exampleInputName" type="text" aria-describedby="nameHelp" placeholder="Enter first name">
                        </div>
                        <div class="col-md-6">
                            <label for="exampleInputLastName">Last name</label>
                            <input class="form-control" id="exampleInputLastName" type="text" aria-describedby="nameHelp" placeholder="Enter last name">
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input class="form-control" id="exampleInputEmail1" type="email" aria-describedby="emailHelp" placeholder="Enter email">
                </div>
                <div class="form-group">
                    <div class="form-row">
                        <div class="col-md-6">
                            <label for="exampleInputPassword1">Password</label>
                            <input class="form-control" id="exampleInputPassword1" type="password" placeholder="Password">
                        </div>
                        <div class="col-md-6">
                            <label for="exampleConfirmPassword">Confirm password</label>
                            <input class="form-control" id="exampleConfirmPassword" type="password" placeholder="Confirm password">
                        </div>
                    </div>
                </div>
                <a class="btn btn-primary btn-block" href="login.html">Register</a>
            </form>
            <div class="text-center">
                <a class="d-block small mt-3" href="{{signUp.login}}">Login Page</a>
                <a class="d-block small" href="forgot-password.html">Forgot Password?</a>
            </div>
        </div>
    </div>
</div>
<!-- Bootstrap core JavaScript-->
<script src="modules/auth/auth.bootstrap.js"></script>
</body>



</html>