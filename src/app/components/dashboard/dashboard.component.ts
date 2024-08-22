import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Announcement } from '../../models/announcements.model';
import { BackendService } from '../../services/backend.service';
import { NgForm } from '@angular/forms';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})



export class DashboardComponent {
  user: User = this.userService.getCurrUser()
  annTitle: string = ''
  annBody: string = ''
  creatingAnn: boolean = false
  announcements: Announcement[] = []
  annColumns = [
    { header: 'Title', field: 'title' },
    { header: 'Message', field: 'message' },
    { header: 'Date', field: 'date' },
  ];

  constructor(public router: Router, private userService: UserService,private backendService: BackendService){
    this.loadAnnouncements()
  }

  logout(){
    this.router.navigate(['/login']);
    this.userService.setCurrUser('');
  }

  loadAnnouncements(): void {
    this.backendService.getAnn().subscribe(
      announcements => {
        this.announcements = announcements.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        console.log('Updated list of announcements:', this.announcements);
      },
      error => {
        console.error('Error fetching announcements:', error);
        alert('There was an error fetching the announcements. Please try again.');
      }
    );
  }

  submitAnn(form: NgForm): void{
    console.log(form.value)
    if (form.valid) {
      const newAnnouncement: Announcement = {
        ...form.value,
        date: new Date().toISOString() // Set the current date and time
      };
      
      this.backendService.addAnn(newAnnouncement).pipe(
        tap(() => {
          console.log('Announcement added successfully');
          form.reset(); // Reset the form after submission
          this.loadAnnouncements(); // Refresh the list of announcements
          this.creatingAnn = false
        }),
        catchError(error => {
          console.error('Error adding announcement:', error);
          alert('There was an error adding the announcement. Please try again.');
          return of(); // Return an empty observable to complete the stream
        })
      ).subscribe();
    } else {
      console.log('Form is invalid');
      alert('Please fill in all required fields');
    }
  }

  deleteAnn(ann: Announcement): void{
    this.backendService.deleteAnn(ann).pipe(
      tap(() => {
        console.log('Announcement deleted successfully');
        this.loadAnnouncements(); // Refresh the list of announcements
      }),
      catchError(error => {
        console.error('Error deleting announcement:', error);
        alert('There was an error deleting the announcement. Please try again.');
        return of(); // Return an empty observable to complete the stream
      })
    ).subscribe();
  }
}
