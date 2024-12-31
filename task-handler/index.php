<?php
include('./config.php');
include('./helpers.php');
?>



<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Users</title>

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
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    </div>


    <div class="modal fade" id="edit-user-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="edit-user-modal-label" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id="edit-user-form" method="POST" action="<?= API_URL ?>user/edit" user-id="">
                    <div class="modal-header">
                        <h5 class="modal-title" id="edit-user-modal-label">Edit User</h5>
                        <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
                    </div>
                    <div class="modal-body">
                        <div class="row mb-3">
                            <div class="col">
                                <input type="text" class="form-control" name="first_name" id="edit-user-form-first-name" placeholder="First Name">
                            </div>
                            <div class="col">
                                <input type="text" class="form-control" name="last_name" id="edit-user-form-last-name" placeholder="Last Name">
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col">
                                <input type="text" class="form-control" name="designation" id="edit-user-form-designation" placeholder="Designation">
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col">
                                <input type="email" class="form-control" name="email" id="edit-user-form-email" placeholder="Email">
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col">
                                <input type="text" class="form-control" name="mobile" id="edit-user-form-mobile" placeholder="Mobile">
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col">
                                <select name="status" id="edit-user-form-status" class="form-select" style="display: none;">
                                    <option value="">Select Status</option>
                                </select>
                            </div>
                            <div class="col">
                                <select name="manager" id="edit-user-form-manager" class="form-select">
                                    <option value="">Select Manager</option>
                                </select>
                            </div>
                        </div>

                        <div class="mb-3" id="edit-user-form-roles" style="display: none;"></div>
                        <div class="mb-3" id="edit-user-form-departments" style="display: none;"></div>


                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" id="edit-user-form-submit" class="btn btn-warning">Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <?php include('layouts/js.php'); ?>
    <script src="<?= urlTo('assets/js/index.js') ?>"></script>
</body>

</html>