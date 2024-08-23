import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Candidate } from '../../models/candidate.model';
import { CandidateService } from '../../services/candidate.service';
import { EditMeta } from '../../models/edit-meta.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit, OnDestroy {
  private editSub: Subscription;
  private candidateSub: Subscription;

  candidate: Candidate;
  editMeta: EditMeta;

  constructor(private candidateService: CandidateService) {}

  ngOnInit(): void {
    this.editMeta = this.candidateService.getEditMeta();
    this.editSub = this.candidateService.editMetaChanged.subscribe(
      (editMeta) => {
        this.editMeta = editMeta;
        if (this.editMeta?.editing) {
          this.candidateService
            .getCandidate(this.editMeta.id)
            .subscribe((candidate) => (this.candidate = candidate));
        } else {
          this.candidate = null;
        }
      }
    );
    this.candidateSub = this.candidateService.candidateChanged.subscribe(
      (candidate) => {
        if (this.editMeta?.editing) {
          this.candidate = candidate;
        } else {
          this.candidate = null;
        }
      }
    );
  }
  ngOnDestroy(): void {
    this.editSub.unsubscribe();
    this.candidateSub.unsubscribe();
  }

  onClear(form: NgForm) {
    form.resetForm();
    this.candidateService.clearMeta();
  }

  onSubmit(form: NgForm) {
    const { name, address, age, phone } = form.value;
    this.candidate = {
      id: this.candidate?.id || null,
      name: name || this.candidate.name,
      address: address || this.candidate.address,
      age: age || this.candidate.age,
      phone: phone || this.candidate.phone,
    };
    if (this.editMeta?.editing) {
      this.candidateService.updateCandidate(this.candidate);
    } else {
      this.candidateService.addCandidate(this.candidate);
    }
    form.resetForm();
  }
}
