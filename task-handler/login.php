<?php
include('./config.php');
include('./helpers.php');
?>



<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>

    <?php include('layouts/links.php'); ?>
</head>

<body style="background-color:#d7d7d7;">
    <?php include('layouts/navbar.php'); ?>

    <div class="container">
        <div class="row">
            <form id="login-form" class="col-md-6 col-lg-4 offset-md-3 offset-md-4 mt-5 p-4 bg-light rounded" style="box-shadow: 0 0 15px 5px #00000030;">
                <div class="mb-3">
                    <label for="login-form-email" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="login-form-email" aria-describedby="emailHelp">
                </div>
                <div class="mb-3">
                    <label for="login-form-password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="login-form-password">
                </div>
                <!-- <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div> -->
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>

    <?php include('layouts/js.php'); ?>
</body>

</html>