import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'app/shared/model/store/product.model';
import { ProductService } from './product.service';
import { ProductComponent } from './product.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductUpdateComponent } from './product-update.component';
import { ProductDeletePopupComponent } from './product-delete-dialog.component';
import { IProduct } from 'app/shared/model/store/product.model';

@Injectable({ providedIn: 'root' })
export class ProductResolve implements Resolve<IProduct> {
    constructor(private service: ProductService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((product: HttpResponse<Product>) => product.body));
        }
        return of(new Product());
    }
}

export const productRoute: Routes = [
    {
        path: 'product',
        component: ProductComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'gatewayApp.storeProduct.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'product/:id/view',
        component: ProductDetailComponent,
        resolve: {
            product: ProductResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.storeProduct.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'product/new',
        component: ProductUpdateComponent,
        resolve: {
            product: ProductResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.storeProduct.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'product/:id/edit',
        component: ProductUpdateComponent,
        resolve: {
            product: ProductResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.storeProduct.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productPopupRoute: Routes = [
    {
        path: 'product/:id/delete',
        component: ProductDeletePopupComponent,
        resolve: {
            product: ProductResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.storeProduct.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
