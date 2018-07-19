<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>DIY</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">

    <!-- Icons -->
    <link rel="icon" href="AdminLTE-2.3.3/dist/img/favicon.png">
    <link rel="stylesheet" href="bower_components/font-awesome/css/font-awesome.min.css"/>
    <!--<link rel="stylesheet" href="bower_components/material-design-icons/iconfont/material-icons.css" />-->

    <!-- Third Party CSS -->
    <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css"/>
    <link href="http://daneden.github.io/animate.css/animate.min.css" rel="stylesheet"/>

    <!-- Template -->
    <link rel="stylesheet" href="AdminLTE-2.3.3/dist/css/AdminLTE.css"/>
    <link rel="stylesheet" href="AdminLTE-2.3.3/dist/css/skins/skin-blue.css"/>
    <!-- Custom CSS -->
    <link rel="stylesheet" href="custom/style/style.css"/>

    <script src="bower_components/jquery/dist/jquery.min.js"></script>
    <script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>

    <script src="bower_components/angular/angular.min.js"></script>

    <!-- Custom Scripts -->

    <script src="custom/js/script.js"></script>

    <!-- Modules Scripts -->
    <script src="modules/auth/auth.module.js"></script>
    <script src="modules/auth/auth.model.js"></script>
    <script src="modules/auth/auth.service.js"></script>
    <script src="modules/auth/forgetPassword.controller.js"></script>

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>
<body class="hold-transition login-page" cz-shortcut-listen="true" ng-controller="forgetPasswordCtrl as forgetPassword">

<div class="main-page-load modal-backdrop fade in text-center" style="display: block;">
    <div class="loader"></div>
    Loading...
</div>

<div class="login-box">
    <div class="login-logo">
        <a href="javascript:void(0);"><b>V</b>GST</a>
    </div>
    <!-- /.login-logo -->
    <div class="login-box-body">
        <p class="login-box-msg">Forgot Password?</p>

        <form name="forgetPasswordForm" ng-submit="forgetPassword.submit($event,forgetPasswordForm)">
            <div class="form-group has-feedback">
                <input type="text" class="form-control" required ng-model="forgetPassword.usrName" name="usrName"
                       id="usrName" placeholder="Email or Phone Number">
                <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
            </div>

            <div class="row">
                <!-- /.col -->
                <%--<div class="col-xs-12">--%>

                <%--<a href="javascript:void(0);">I forgot my password</a><br>--%>
                <%--<a href="javascript:void(0);" class="text-center">Register Yourself</a>--%>

                <%--</div>--%>
                <div class="col-md-6 col-md-offset-3">

                    <button type="submit" class="btn btn-primary btn-block btn-flat">
                        Reset Password
                    </button>

                </div>
                <!-- /.col -->
            </div>
        </form>

    </div>
    <!-- /.login-box-body -->
</div>

<script src="modules/auth/auth.bootstrap.js"></script>


</body>
</html>