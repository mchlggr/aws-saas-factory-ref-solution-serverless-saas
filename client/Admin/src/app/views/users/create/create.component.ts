/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT-0
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  userForm: FormGroup;
  error: boolean = false;
  success: boolean = false;
  submitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userSvc: UsersService,
    private _snackBar: MatSnackBar
  ) {
    this.userForm = this.fb.group({
      userName: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      userRole: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  openErrorMessageSnackBar(errorMessage: string) {
    this._snackBar.open(errorMessage, 'Dismiss', {
      duration: 4 * 1000, // seconds
    });
  }

  onSubmit() {
    const user = this.userForm.value;
    this.submitting = true;
    this.userSvc.create(user).subscribe({
      next: () => {
        this.success = true;
        this.openErrorMessageSnackBar('Successfully created new user!');
      },
      error: (err) => {
        this.error = true;
        this.openErrorMessageSnackBar('An unexpected error occurred!');
      },
      complete: () => (this.submitting = false)
    });
  }
}
