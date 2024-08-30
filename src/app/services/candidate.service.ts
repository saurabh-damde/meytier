import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { environment } from '../environments/environment';
import { Candidate } from '../models/candidate.model';
import { EditMeta } from '../models/edit-meta.model';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  private apiUrl = environment.apiUrl;

  private candidates: Candidate[];

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

  constructor(private http: HttpClient) {}

  get columns() {
    return this.displayColumns.slice();
  }

  getCandidates() {
    this.http.get<Candidate[]>(this.apiUrl).subscribe((candidates) => {
      this.candidates = this.sortCandidates(candidates);
      this.candidatesChanged.next(this.candidates?.slice());
    });
    return this.candidates?.slice();
  }

  getCandidate(id: number) {
    return this.http.get<Candidate>(`${this.apiUrl}/${id}`);
  }

  addCandidate(candidate: Candidate) {
    this.http
      .post<{ message: string; candidate: Candidate }>(this.apiUrl, candidate)
      .subscribe((data) => {
        this.getCandidates();
      });
  }

  editCandidate(id: number) {
    this.editMeta = { id: id, editing: true };
    this.editMetaChanged.next(this.editMeta);
    this.candidateChanged.next({
      ...this.candidates?.find((candidate) => candidate.id === id),
    });
  }

  updateCandidate(candidate: Candidate) {
    this.http
      .put<{ message: string; candidate: Candidate }>(
        `${this.apiUrl}/${candidate.id}`,
        candidate
      )
      .subscribe((data) => {
        const inx = this.candidates?.findIndex(
          (can) => can.id === candidate.id
        );
        this.candidates[inx] = candidate;
        if (this.editMeta.id === candidate.id) {
          this.clearMeta();
        }
        this.candidatesChanged.next(this.candidates?.slice());
      });
  }

  removeCandidate(id: number) {
    this.http
      .delete<{ message: string; candidate: Candidate }>(`${this.apiUrl}/${id}`)
      .subscribe((data) => {
        this.candidates = this.candidates?.filter(
          (candidate) => candidate.id !== id
        );
        if (this.editMeta?.id === id) {
          this.clearMeta();
        }
        this.candidatesChanged.next(this.candidates?.slice());
      });
  }

  getEditMeta() {
    return this.editMeta;
  }

  clearMeta() {
    this.candidateChanged.next(null);
    this.editMetaChanged.next(null);
  }

  private sortCandidates(candidates: Candidate[]) {
    return candidates.sort((can1, can2) => {
      if (can1.id < can2.id) {
        return -1;
      } else if (can1.id > can2.id) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
