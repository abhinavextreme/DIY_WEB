<!DOCTYPE html>
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
    <link rel="stylesheet" href="node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css"/>
    <link rel="stylesheet" href="bower_components/angular-bootstrap/angular-bootstrap-lightbox.css">
    <link rel="stylesheet" href="node_modules/ui-select/dist/select.min.css"/>
    <link href="thirdparty/animate/animate.min.css" rel="stylesheet">
    <link rel="stylesheet" href="thirdparty/pnotify/pnotify.custom.min.css"/>

    <link rel="stylesheet" href="bower_components/select2/dist/css/select2.min.css"/>
    <link rel="stylesheet" href="bower_components/selectize/dist/css/selectize.default.css ">

    <!-- Template -->
    <link rel="stylesheet" href="AdminLTE-2.3.3/dist/css/AdminLTE.css">
    <link rel="stylesheet" href="AdminLTE-2.3.3/dist/css/skins/skin-vems-light.min.css">

    <!-- Custom JS  --->

    <!-- Custom CSS -->
    <link rel="stylesheet" href="custom/style/style.css"/>

    <script src="node_modules/moment/moment.js"></script>
    <script src="bower_components/jquery/dist/jquery.min.js"></script>
    <script src="thirdparty/slimScroll/jquery.slimscroll.min.js"></script>
    <script src="node_modules/async/dist/async.min.js"></script>
    <script src="node_modules/lodash/lodash.js"></script>
    <script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="thirdparty/pnotify/pnotify.custom.min.js"></script>

    <script src="bower_components/angular/angular.min.js"></script>
    <script src="node_modules/angular-sanitize/angular-sanitize.min.js"></script>
    <script src="node_modules/angular-moment/angular-moment.js"></script>
    <script src="node_modules/ui-select/dist/select.min.js"></script>
    <!--<script src="bower_components/angular-animate/angular-animate.min.js"></script>-->
    <script src="bower_components/angular-ui-router/release/angular-ui-router.min.js"></script>
    <!--<script src="bower_components/angular-ui-router.stateHelper/statehelper.min.js"></script>-->
    <script src="node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js"></script>
    <script src="node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js"></script>
    <script src="bower_components/angular-bootstrap/angular-bootstrap-lightbox.js"></script>
    <script src="bower_components/jsPDF/dist/jspdf.min.js"></script>

    <script src="bower_components/select2/dist/js/select2.min.js"></script>

    <script type="text/javascript" src="bower_components/selectize/dist/js/standalone/selectize.min.js"></script>

    <script type="text/javascript" src="bower_components/angular-selectize2/dist/angular-selectize.js"></script>


    <!-- Template -->
    <script src="AdminLTE-2.3.3/dist/js/app.js"></script>
    <script src="AdminLTE-2.3.3/dist/js/demo.js"></script>

    <!-- Custom Scripts -->

    <script src="custom/js/script.js"></script>

    <%-- Common Module --%>
    <script src="modules/common/common.app.js"></script>
    <script src="modules/common/common.route.js"></script>
    <script src="modules/common/services/notify.service.js"></script>
    <script src="modules/common/services/http.service.js"></script>
    <script src="modules/common/services/cache.service.js"></script>
    <script src="modules/common/services/localStorage.service.js"></script>
    <script src="modules/common/services/store.service.js"></script>
    <script src="modules/common/services/lookup.store.service.js"></script>
    <script src="modules/common/services/modal.service.js"></script>

    <script src="modules/common/directives/form/vform.service.js"></script>

    <script src="modules/common/directives/tab/tab.directive.js"></script>
    <script src="modules/common/directives/form/vform.directive.js"></script>
    <script src="modules/common/directives/form/input/filetype.directive.js"></script>
    <script src="modules/common/directives/form/fileUpload/fileUpload.directive.js"></script>
    <script src="modules/common/directives/form/input/vinput.directive.js"></script>
    <script src="modules/common/directives/form/textarea/vtextarea.directive.js"></script>
    <script src="modules/common/directives/form/select/vselect.directive.js"></script>
    <script src="modules/common/directives/menu/menuDrct.js"></script>
    <script src="modules/common/directives/aside/right/asideRightDrct.js"></script>
    <!-- <script src="modules/common/directives/breadcrumb/breadcrumbDrct.js"></script> -->
    <script src="modules/common/directives/footer/footerDrct.js"></script>
    <script src="modules/common/directives/header/headerDrct.js"></script>
    <script src="modules/common/filters/startFrom.js"></script>
    <script src="modules/common/filters/mapOrderBy.filter.js"></script>

    <!-- Authentication Module -->

    <script src="modules/auth/auth.module.js"></script>
    <script src="modules/auth/auth.service.js"></script>
    <script src="modules/auth/login.controller.js"></script>
    <script src="modules/auth/logout.controller.js"></script>

    <!-- Registration Module -->

    <!-- Admin Tasks Module -->

    <script src="modules/admintasks/admintasks.app.js"></script>
    <script src="modules/admintasks/admintasks.route.js"></script>
    <script src="modules/admintasks/admintasks.service.js"></script>
    <script src="modules/admintasks/admintasks.model.js"></script>
    <script src="modules/admintasks/admintasks.controller.js"></script>

    <script src="modules/admintasks/category/category.controller.js"></script>
    <script src="modules/admintasks/gst/gst.controller.js"></script>
    <script src="modules/admintasks/items/items.controller.js"></script>
    <script src="modules/admintasks/updatelicense/updatelicense.controller.js"></script>

    <%--Stock Module--%>

    <script src="modules/stock/stock.app.js"></script>
    <script src="modules/stock/stock.route.js"></script>
    <script src="modules/stock/stock.service.js"></script>
    <script src="modules/stock/stock.model.js"></script>
    <script src="modules/stock/stock.controller.js"></script>

    <%--Sell Module--%>

    <script src="modules/sell/sell.app.js"></script>
    <script src="modules/sell/sell.route.js"></script>
    <script src="modules/sell/sell.service.js"></script>
    <script src="modules/sell/sell.model.js"></script>
    <script src="modules/sell/sell.controller.js"></script>

    <%-- report Starts--%>
    <script src="modules/report/report.app.js"></script>
    <script src="modules/report/report.route.js"></script>
    <script src="modules/report/report.service.js"></script>
    <script src="modules/report/report.model.js"></script>
    <script src="modules/report/report.controller.js"></script>

    <script src="modules/report/gstReport/gstReport.controller.js"></script>

    <%-- report Ends--%>

    <%-- Shop Creation --%>
    <script src="modules/shop/shop.app.js"></script>
    <script src="modules/shop/shop.route.js"></script>
    <script src="modules/shop/shop.service.js"></script>
    <script src="modules/shop/shop.model.js"></script>
    <script src="modules/shop/shop.controller.js"></script>

    <script src="modules/shop/addshop/addshop.addmodal.controller.js"></script>
    <script src="modules/shop/updateshop/updateshop.updatemodal.controller.js"></script>

    <%-- Shop Ends--%>

    <!-- Modules Scripts -->
    
    <script src="modules/app.js"></script>
    <script src="modules/route.js"></script>

    <!-- Home -->
    
    <script src="modules/home/home.service.js"></script>
    <script src="modules/home/home.controller.js"></script>

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>
<body class="hold-transition skin-vems-light sidebar-mini fixed layout-boxed" ng-controller="bodyCtrl">

<div class="main-page-load modal-backdrop fade in text-center" style="display: block;">
    <div class="loader"></div>
    Loading...
</div>

<header-drct></header-drct>
<menu-drct></menu-drct>
<div class="wrapper">


    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>
                {{pageHeader}}
                <small>{{pageDescription}}</small>
            </h1>
            <breadcrumb-drct></breadcrumb-drct>
        </section>

        <!-- Main content -->
        <section class="content">
            <!--<div ui-view ng-animate="'view'"></div>-->
            <div ui-view=""></div>
        </section>
        <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->

</div>

<footer-drct></footer-drct>
<aside-right-drct></aside-right-drct>
<div class="control-sidebar-bg"></div>

<script src="modules/bootstrap.js"></script>


</body>
</html>