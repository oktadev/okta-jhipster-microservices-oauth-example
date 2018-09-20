import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from 'app/shared/model/post.model';
import { PostService } from './post.service';
import { PostComponent } from './post.component';
import { PostDetailComponent } from './post-detail.component';
import { PostUpdateComponent } from './post-update.component';
import { PostDeletePopupComponent } from './post-delete-dialog.component';
import { IPost } from 'app/shared/model/post.model';

@Injectable({ providedIn: 'root' })
export class PostResolve implements Resolve<IPost> {
    constructor(private service: PostService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((post: HttpResponse<Post>) => post.body));
        }
        return of(new Post());
    }
}

export const postRoute: Routes = [
    {
        path: 'post',
        component: PostComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.post.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'post/:id/view',
        component: PostDetailComponent,
        resolve: {
            post: PostResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.post.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'post/new',
        component: PostUpdateComponent,
        resolve: {
            post: PostResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.post.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'post/:id/edit',
        component: PostUpdateComponent,
        resolve: {
            post: PostResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.post.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const postPopupRoute: Routes = [
    {
        path: 'post/:id/delete',
        component: PostDeletePopupComponent,
        resolve: {
            post: PostResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.post.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
