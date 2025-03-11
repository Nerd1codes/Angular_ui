import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  selectedFiles: File[] = [];

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files.length > 4) {
      alert('You can upload up to 4 files only.');
      return;
    }

    const formData = new FormData();
    const fileArray: File[] = Array.from(files); // Explicitly cast to File[]
    fileArray.forEach((file: File) => {
      formData.append('files', file);
    });

    fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData
    })
      .then(response => response.text())
      .then(data => {
        console.log(data);
        alert('Files uploaded successfully');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error uploading files');
      });
  }
}
