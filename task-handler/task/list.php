<?php
    include('./../config.php');
    include('./../helpers.php');
?>



<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tasks List</title>

    <?php include('./../layouts/links.php'); ?>
    <link rel="stylesheet" href="<?= urlTo('assets/quill-editor/quill.css') ?>">
    <link rel="stylesheet" href="<?= urlTo('assets/css/task/list.css ?>') ?>">

</head>

<body style="background-color:#d7d7d7;">
    <?php include('./../layouts/navbar.php'); ?>


    <div class="container mt-3">
        <div class="row rounded border p-2" style="background-color:rgb(255, 255, 255);">
            <div class="col-12">
                <button type="button" class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#new-task-modal">
                    + New
                </button>
            </div>
        </div>
    </div>

    <div class="container mt-3">
        <div class="row">
            <div class="col-3 text-center bg-white border rounded" style="min-height: 26em;">
                <h5 class="mt-3">Pending</h5>
                <hr>
                <div class="pending-task-container">
                </div>
            </div>
            <div class="col-3 text-center bg-white border rounded" style="min-height: 26em;">
                <h5 class="mt-3">In Progress</h5>
                <hr>
                <div class="in-progress-task-container">
                </div>
            </div>
            <div class="col-3 text-center bg-white border rounded" style="min-height: 26em;">
                <h5 class="mt-3">Completed</h5>
                <hr>
                <div class="completed-task-container">
                </div>
            </div>
            <div class="col-3 text-center bg-white border rounded" style="min-height: 26em;">
                <h5 class="mt-3">Tested</h5>
                <hr>
                <div class="tested-task-container">
                    <!-- <div class="tested-task-item alert alert-success">
                        sdflksdlfjsl
                    </div> -->
                </div>
            </div>
        </div>
    </div>


    <div class="modal fade" id="new-task-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="new-task-modal-label" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="new-task-modal-label">New Task</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form id="new-task-form" method="POST">
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="new-task-form-title" class="form-label">Title</label>
                            <input type="text" class="form-control" id="new-task-form-title">
                        </div>
                        <div class="mb-3">
                            <div class="row">
                                <div class="col-md-6">
                                    <label for="new-task-form-priority" class="form-label">Priority</label>
                                    <select class="form-select" id="new-task-form-priority">
                                        <option value="1">Low</option>
                                        <option value="2">Medium</option>
                                        <option value="3">High</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label for="new-task-form-expires" class="form-label">Expires At</label>
                                    <input type="date" class="form-control" id="new-task-form-expires">
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <div class="row">
                                <div class="col-md-8">
                                    <label for="new-task-form-assigned-to" class="form-label">Assigned To</label>
                                    <select class="form-select" id="new-task-form-assigned-to">
                                        <option value="">Select</option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <label for="new-task-form-status" class="form-label">Status</label>
                                    <select class="form-select" id="new-task-form-status">
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="new-task-form-content" class="form-label">Description</label>
                            <div class="form-control" id="new-task-form-content" rows="3"></div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" id="new-task-form-submit" class="btn btn-success">Add</button>
                    </div>
                </form>
            </div>
        </div>
    </div>


    <!-- Edit -->
    <div class="modal fade" id="edit-task-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="edit-task-modal-label" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="edit-task-modal-label">Edit Task</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form id="edit-task-form" method="POST">
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="edit-task-form-title" class="form-label">Title</label>
                            <input type="text" class="form-control" id="edit-task-form-title">
                        </div>
                        <div class="mb-3">
                            <div class="row">
                                <div class="col-md-6">
                                    <label for="edit-task-form-priority" class="form-label">Priority</label>
                                    <select class="form-select" id="edit-task-form-priority">
                                        <option value="1">Low</option>
                                        <option value="2">Medium</option>
                                        <option value="3">High</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label for="edit-task-form-expires" class="form-label">Expires At</label>
                                    <input type="date" class="form-control" id="edit-task-form-expires">
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <div class="row">
                                <div class="col-md-8">
                                    <label for="edit-task-form-assigned-to" class="form-label">Assigned To</label>
                                    <select class="form-select" id="edit-task-form-assigned-to">
                                        <option value="">Select</option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <label for="edit-task-form-status" class="form-label">Status</label>
                                    <select class="form-select" id="edit-task-form-status">
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="edit-task-form-content" class="form-label">Description</label>
                            <div class="form-control" id="edit-task-form-content" rows="3"></div>
                        </div>

                        <input type="hidden" id="edit-task-form-id" value="">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" id="edit-task-form-submit" class="btn btn-warning">Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>



    <?php include('./../layouts/js.php'); ?>
    <script src="<?= urlTo('assets/quill-editor/quill.js') ?>"></script>
    <script src="<?= urlTo('assets/js/task/list.js') ?>"></script>
</body>

</html>