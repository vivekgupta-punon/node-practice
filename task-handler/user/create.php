<?php
include('./../config.php');
include('./../helpers.php');
?>



<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New User</title>

    <?php include('./../layouts/links.php'); ?>
</head>

<body style="background-color:#d7d7d7;">
    <?php include('./../layouts/navbar.php'); ?>

    <div class="container">
        <div class="row">
            <form id="new-user-form" method="POST" action="<?= API_URL ?>user/create" class="col-md-6  offset-md-3 offset-md-4 mt-5 p-4 bg-light rounded" style="box-shadow: 0 0 15px 5px #00000030;">
                <div class="row mb-3 text-center">
                    <h3>Create New User</h3>
                </div>
                <div class="row mb-3">
                    <div class="col">
                        <input type="text" class="form-control" name="first_name" id="new-user-form-first-name" placeholder="First Name">
                    </div>
                    <div class="col">
                        <input type="text" class="form-control" name="last_name" id="new-user-form-last-name" placeholder="Last Name">
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col">
                        <input type="email" class="form-control" name="email" id="new-user-form-email" placeholder="Email">
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col">
                        <input type="text" class="form-control" name="mobile" id="new-user-form-mobile" placeholder="Mobile">
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col">
                        <input type="password" class="form-control" name="password1" id="new-user-form-password" placeholder="Password">
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col">
                        <input type="password" class="form-control" name="password2" id="new-user-form-confirm-password" placeholder="Confirm Password">
                    </div>
                </div>

                <div class="mb-3" id="new-user-form-roles" style="display: none;"></div>
                <div class="mb-3" id="new-user-form-departments" style="display: none;"></div>



                <button type="submit" id="new-user-form-submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>

    <?php include('./../layouts/js.php'); ?>
    <script src="<?= urlTo('assets/js/user/create.js') ?>"></script>
</body>

</html>