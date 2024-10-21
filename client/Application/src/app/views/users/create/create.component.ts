/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT-0
 */
import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {UsersService} from '../users.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from "@angular/router";

/**
 * Custom email validator function using regex.
 * The Angular built-in email validator does not check for a tld, etc
 * @returns A validator function that checks the email format.
 */
const EmailValidator = () => {
  return (control: AbstractControl): ValidationErrors | null => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const valid = emailRegex.test(control.value);
    return valid ? null : {invalidEmail: true};
  };
}

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
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      userName: [null, [Validators.required]],
      userEmail: [null, [Validators.required, EmailValidator()]],
      userRole: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  openErrorMessageSnackBar(errorMessage: string) {
    this._snackBar.open(errorMessage, 'Dismiss', {
      duration: 4 * 1000, // seconds
    });
  }

  cancel() {
    this.router.navigate(['products']);
  }

  onSubmit() {
    const user = this.userForm.value;
    this.submitting = true;
    this.userSvc.create(user).subscribe({
      next: () => {
        this.success = true;
        this.router.navigate(['users']);
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
