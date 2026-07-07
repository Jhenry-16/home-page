import { FormGroup } from '@angular/forms';

export function resetFormControls(
  form: FormGroup,
  controls: string[],
  options?: {
    valueMap?: { [key: string]: any }; // valores por control
    emitEvent?: boolean;
    markPristine?: boolean;
    markUntouched?: boolean;
  },
): void {
  const {
    valueMap = {},
    emitEvent = false,
    markPristine = true,
    markUntouched = true,
  } = options || {};

  controls.forEach((controlName) => {
    const control = form.get(controlName);
    if (!control) return;

    const value = valueMap[controlName] ?? null;
    control.reset(value, { emitEvent });

    control.setErrors(null);

    if (markPristine) control.markAsPristine();
    if (markUntouched) control.markAsUntouched();
  });
}
