import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Candidate } from '../../models/candidate.model';
import { CandidateService } from '../../services/candidate.service';
import { EditMeta } from '../../models/edit-meta.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit, OnDestroy {
  private candidateSub: Subscription;
  private editSub: Subscription;

  candidates: Candidate[];
  columns: string[];
  editMeta: EditMeta;

  constructor(private candidateService: CandidateService) {}

  ngOnInit(): void {
    this.candidates = this.candidateService.getCandidates();
    this.columns = this.candidateService.columns;
    this.editMeta = this.candidateService.getEditMeta();

    this.candidateSub = this.candidateService.candidatesChanged.subscribe(
      (candidates) => (this.candidates = candidates)
    );
    this.editSub = this.candidateService.editMetaChanged.subscribe(
      (editMeta) => (this.editMeta = editMeta)
    );
  }
  ngOnDestroy(): void {
    this.candidateSub.unsubscribe();
    this.editSub.unsubscribe();
  }

  editCandidate(id: number) {
    this.candidateService.editCandidate(id);
  }

  removeCandidate(id: number) {
    this.candidateService.removeCandidate(id);
  }
}
