import { FormControl } from '@angular/forms';

export function checkEmail(control: FormControl): {emailIsNotValid: boolean} | null {
    const emailRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return emailRe.test(control.value) ? null : { emailIsNotValid: true };
}
