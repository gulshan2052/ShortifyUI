import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { UrlData } from '../../interfaces/urlData.interface';
import { UrlshortenerService } from '../../services/urlshortener.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  reservedValues = ['home', 'login', 'register'];

  longUrlForm: FormGroup;
  shortUrl: string | null = null;

  constructor(private fb: FormBuilder, private urlshortenerService: UrlshortenerService) {
    this.longUrlForm = this.fb.group({
      longUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
      ttlMinutes: ['300'],
      alias: ['', [this.valueNotReserved(this.reservedValues)]]
    });
  }

  onSubmit() {
    if (this.longUrlForm.valid) {
      console.log('Form Submitted', this.longUrlForm.value);
      const urlData: UrlData = this.longUrlForm.value;
      this.urlshortenerService.shorten(urlData).subscribe(
        (response) => {
          if (response.status == 1) {
            this.shortUrl = window.location.origin + "/" + response.alias;
            alert(response.message);
          }
          else {
            alert(response.message);
          }
        },
        (error) => {
          alert(error.message);
        }
      );
    }
    else {
      alert("Invalid details entered");
    }
  }

  valueNotReserved(reservedValues: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      return !(reservedValues.includes(control.value)) ? null : { valueNotAllowed: true };
    };
  }

}
