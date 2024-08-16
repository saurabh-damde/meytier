import { Component } from '@angular/core';
import { Candidate } from '../../models/candidate.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  candidates: Candidate[] = [
    { id: 1, name: 'Saurabh', address: 'Panvel', age: 25, phone: 9876543210 },
    { id: 2, name: 'Rohit', address: 'Panvel', age: 23, phone: 9876543210 },
    { id: 3, name: 'Sid', address: 'Panvel', age: 28, phone: 9876543210 },
  ];
  displayedColumns: string[] = [
    'ID',
    'Name',
    'Address',
    'Age',
    'Phone',
    'Action',
  ];
}
