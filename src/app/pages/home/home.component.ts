import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UrlData } from '../../interfaces/urlData.interface';
import { UrlshortenerService } from '../../services/urlshortener.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  longUrlForm: FormGroup;
  shortUrl: string | null = null;

  constructor(private fb: FormBuilder, private urlshortenerService: UrlshortenerService) {
    this.longUrlForm = this.fb.group({
      longUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
      ttlMinutes: ['5'],
      alias: ['']
    });
  }

  onSubmit() {
    if (this.longUrlForm.valid) {
      console.log('Form Submitted', this.longUrlForm.value);
      const urlData: UrlData = this.longUrlForm.value;
      this.urlshortenerService.shorten(urlData).subscribe(
        (response) => {
          this.shortUrl = response.shortUrl;
          alert(response.message);
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
}
