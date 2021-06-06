import { FormControl } from '@angular/forms';

export function checkPassword(control: FormControl): {passwordIsNotValid: boolean} | null {
    const passwordRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/;

    return passwordRe.test(control.value) ? null : { passwordIsNotValid: true };
}
