import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Blog } from './blog.model';
import { BlogPopupService } from './blog-popup.service';
import { BlogService } from './blog.service';

@Component({
    selector: 'jhi-blog-dialog',
    templateUrl: './blog-dialog.component.html'
})
export class BlogDialogComponent implements OnInit {

    blog: Blog;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private blogService: BlogService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.blog.id !== undefined) {
            this.subscribeToSaveResponse(
                this.blogService.update(this.blog));
        } else {
            this.subscribeToSaveResponse(
                this.blogService.create(this.blog));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Blog>>) {
        result.subscribe((res: HttpResponse<Blog>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Blog) {
        this.eventManager.broadcast({ name: 'blogListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-blog-popup',
    template: ''
})
export class BlogPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private blogPopupService: BlogPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.blogPopupService
                    .open(BlogDialogComponent as Component, params['id']);
            } else {
                this.blogPopupService
                    .open(BlogDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
