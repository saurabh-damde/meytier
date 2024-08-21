import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Candidate } from '../models/candidate.model';
import { EditMeta } from '../models/edit-meta.model';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  private candidates: Candidate[] = [
    { id: 1, name: 'Saurabh', address: 'Panvel', age: 25, phone: 9876543210 },
    { id: 2, name: 'Rohit', address: 'Panvel', age: 23, phone: 9876543210 },
    { id: 3, name: 'Sid', address: 'Panvel', age: 28, phone: 9876543210 },
  ];

  private displayColumns: string[] = [
    'ID',
    'Name',
    'Address',
    'Age',
    'Phone',
    'Action',
  ];

  private editMeta: EditMeta;

  candidatesChanged: Subject<Candidate[]> = new Subject<Candidate[]>();
  candidateChanged: Subject<Candidate> = new Subject<Candidate>();
  editMetaChanged: Subject<EditMeta> = new Subject<EditMeta>();

  constructor() {}

  private get uniqueId() {
    let id: number;
    let flag: boolean = false;
    while (!flag) {
      id = Math.ceil(Math.random() * 100);
      flag = !this.candidates.find((candidate) => candidate.id === id);
    }
    return id;
  }

  get columns() {
    return this.displayColumns.slice();
  }

  getCandidates() {
    this.candidatesChanged.next(this.candidates.slice());
    return this.candidates.slice();
  }

  getCandidate(id: number) {
    this.candidateChanged.next({
      ...this.candidates.find((candidate) => candidate.id === id),
    });
    return this.candidates.find((candidate) => candidate.id === id);
  }

  addCandidate(candidate: Candidate) {
    this.candidates.push({ ...candidate, id: this.uniqueId });
    this.candidatesChanged.next(this.candidates.slice());
  }

  editCandidate(id: number) {
    this.editMeta = { id: id, editing: true };
    this.editMetaChanged.next(this.editMeta);
    this.candidateChanged.next({
      ...this.candidates.find((candidate) => candidate.id === id),
    });
  }

  updateCandidate(candidate: Candidate) {
    const inx = this.candidates.findIndex((can) => can.id === candidate.id);
    this.candidates[inx] = candidate;
    if (this.editMeta.id === candidate.id) {
      this.clearMeta();
    }
    this.candidatesChanged.next(this.candidates.slice());
  }

  removeCandidate(id: number) {
    this.candidates = this.candidates.filter(
      (candidate) => candidate.id !== id
    );
    if (this.editMeta.id === id) {
      this.clearMeta();
    }
    this.candidatesChanged.next(this.candidates.slice());
  }

  getEditMeta() {
    return this.editMeta;
  }

  clearMeta() {
    this.candidateChanged.next(null);
    this.editMetaChanged.next(null);
  }
}
