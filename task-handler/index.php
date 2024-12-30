<?php
include('./config.php');
include('./helpers.php');
?>



<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tools</title>

    <?php include('layouts/links.php'); ?>
</head>

<body style="background-color:#d7d7d7;">
    <?php include('layouts/navbar.php'); ?>

    <div class="container mt-3">
        <div class="row">
            <div class="col-sm-3">
                <div class="card statics-card">
                    <div class="card-body">
                        <h5 class="card-title text-muted">Total Task</h5>
                        <h2 class="card-text text-secondary" id="total-task">-</h2>
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="card statics-card">
                    <div class="card-body">
                        <h5 class="card-title text-muted">Pending</h5>
                        <h2 class="card-text text-danger" id="pending-task">-</h2>
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="card statics-card">
                    <div class="card-body">
                        <h5 class="card-title text-muted">Completed</h5>
                        <h2 class="card-text text-primary" id="completed-task">-</h2>
                    </div>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="card statics-card">
                    <div class="card-body">
                        <h5 class="card-title text-muted">Tested</h5>
                        <h2 class="card-text text-success" id="tested-task">-</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="container mt-3 bg-ligh" style="background-color:white;border-radius:10px;">
        <div class="row p-3">
            <table id="user-list" class="table table-striped">
                <thead class="table-dark">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Mobile</th>
                        <th scope="col">Role</th>
                        <th scope="col">Status</th>
                        <th scope="col">Added On</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    </div>

    <?php include('layouts/js.php'); ?>
    <script src="<?= urlTo('assets/js/index.js') ?>"></script>
</body>

</html>